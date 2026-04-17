"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "sonner";
import { unifiedCartService } from "@/lib/api/services/unified/cart";
import { CartStore, CartItem, CartValidationResult } from "@/types/cart";
import { Product } from "@/types";
import { AddToCartRequest, UpdateCartItemRequest } from "@/lib/api/types";

// Default cart calculation options for Vietnamese market
const DEFAULT_CALCULATION_OPTIONS = {
  shippingThreshold: 1000000, // 1 million VND
  shippingCost: 30000, // 30k VND for Hanoi
  taxRate: 0, // 10% tax rate
  freeShippingThreshold: 1000000, // 1 million VND
};

const sanitizeSelectedItemIds = (
  selectedItemIds: Record<number, boolean>,
  items: CartItem[]
) => {
  const validItemIds = new Set(items.map((item) => item.id));

  return Object.fromEntries(
    Object.entries(selectedItemIds).filter(
      ([itemId, selected]) => selected && validItemIds.has(Number(itemId))
    )
  );
};

const calculateSubtotalForItems = (items: CartItem[]) => {
  return items.reduce(
    (total, item) => total + (item.product.discountPrice || item.price) * item.quantity,
    0
  );
};

/** Monotonic id so an older in-flight loadCart cannot overwrite a newer session. */
let loadCartRequestId = 0;
let loadCartDebounceTimer: ReturnType<typeof setTimeout> | null = null;

// Cart store implementation
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => {
      const runLoadCart = async () => {
        const id = ++loadCartRequestId;

        set({ isLoading: true, error: null });

        try {
          const cart = await unifiedCartService.getCart();

          if (id !== loadCartRequestId) return;

          set((state) => ({
            items: cart.items,
            selectedItemIds: sanitizeSelectedItemIds(state.selectedItemIds, cart.items),
            lastUpdated: Date.now(),
            isLoading: false,
          }));
        } catch (error) {
          if (id !== loadCartRequestId) return;

          const errorMessage =
            error instanceof Error ? error.message : "Failed to load cart";

          set({
            error: errorMessage,
            isLoading: false,
          });

          toast.error("Failed to load cart", {
            description: errorMessage,
            duration: 4000,
          });
        }
      };

      return {
      // Initial state
      items: [],
      selectedItemIds: {},
      isOpen: false,
      isLoading: false,
      error: null,
      lastUpdated: Date.now(),
      // Individual item loading states
      itemLoadingStates: {} as Record<number, boolean>,

      // Item management actions
      addItem: async (product: Product, quantity: number = 1) => {
        // Set individual product loading state
        set((state) => ({
          itemLoadingStates: { ...state.itemLoadingStates, [product.id]: true },
          error: null,
        }));

        const addToCartRequest: AddToCartRequest = {
          productId: product.id,
          quantity,
        };

        const addToCartPromise =
          unifiedCartService.createCart(addToCartRequest);

        toast.promise(addToCartPromise, {
          success: (updatedCart) => {
            set((state) => ({
              items: updatedCart.items,
              selectedItemIds: sanitizeSelectedItemIds(
                state.selectedItemIds,
                updatedCart.items
              ),
              lastUpdated: Date.now(),
              itemLoadingStates: {
                ...state.itemLoadingStates,
                [product.id]: false,
              },
            }));
            return `${product.name} đã được thêm vào giỏ hàng của bạn`;
          },
          error: (error) => {
            const errorMessage =
              error instanceof Error
                ? error.message
                : "Thêm sản phẩm vào giỏ hàng thất bại";

            set((state) => ({
              error: errorMessage,
              itemLoadingStates: {
                ...state.itemLoadingStates,
                [product.id]: false,
              },
            }));
            return errorMessage;
          },
        });
      },

      removeItem: async (itemId: number) => {
        set((state) => ({
          itemLoadingStates: { ...state.itemLoadingStates, [itemId]: true },
          error: null,
        }));

        try {
          const updatedCart = await unifiedCartService.removeCartItem(itemId);
          set((state) => ({
            items: updatedCart.items,
            selectedItemIds: sanitizeSelectedItemIds(
              state.selectedItemIds,
              updatedCart.items
            ),
            lastUpdated: Date.now(),
            itemLoadingStates: { ...state.itemLoadingStates, [itemId]: false },
          }));
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "Xóa sản phẩm khỏi giỏ hàng thất bại";

          set((state) => ({
            error: errorMessage,
            itemLoadingStates: { ...state.itemLoadingStates, [itemId]: false },
          }));
        }
      },

      updateQuantity: async (itemId: number, quantity: number) => {
        set((state) => ({
          itemLoadingStates: { ...state.itemLoadingStates, [itemId]: true },
          error: null,
        }));

        if (quantity <= 0) {
          await get().removeItem(itemId);
          return;
        }

        try {
          const updateRequest: UpdateCartItemRequest = {
            quantity,
          };

          const updatedCart = await unifiedCartService.updateProduct(
            itemId,
            updateRequest
          );
          set((state) => ({
            items: updatedCart.items,
            selectedItemIds: sanitizeSelectedItemIds(
              state.selectedItemIds,
              updatedCart.items
            ),
            lastUpdated: Date.now(),
            itemLoadingStates: { ...state.itemLoadingStates, [itemId]: false },
          }));
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "Cập nhật số lượng thất bại";

          set((state) => ({
            error: errorMessage,
            itemLoadingStates: { ...state.itemLoadingStates, [itemId]: false },
          }));
        }
      },

      clearCart: async () => {
        set({ isLoading: true, error: null });

        const clearCartPromise = unifiedCartService.clearCart();

        toast.promise(clearCartPromise, {
          loading: "Đang xóa giỏ hàng...",
          success: (updatedCart) => {
            set({
              items: updatedCart.items,
              selectedItemIds: {},
              lastUpdated: Date.now(),
              isLoading: false,
            });
            return "Tất cả sản phẩm đã được xóa khỏi giỏ hàng";
          },
          error: (error) => {
            const errorMessage =
              error instanceof Error ? error.message : "Xóa giỏ hàng thất bại";

            set({
              error: errorMessage,
              isLoading: false,
            });
            return errorMessage;
          },
        });
      },

      resetCart: () => {
        set({
          items: [],
          selectedItemIds: {},
          lastUpdated: Date.now(),
          error: null,
        });
      },

      // Cart state management
      toggleCart: () => {
        set((state: any) => ({ isOpen: !state.isOpen }));
      },

      openCart: () => {
        set({ isOpen: true });
      },

      closeCart: () => {
        set({ isOpen: false });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setError: (error: string | null) => {
        set({ error });
      },

      setItemLoading: (itemId: number, loading: boolean) => {
        set((state) => ({
          itemLoadingStates: { ...state.itemLoadingStates, [itemId]: loading },
        }));
      },

      isItemLoading: (itemId: number) => {
        const state = get();
        return state.itemLoadingStates[itemId] || false;
      },

      toggleItemSelected: (itemId: number) => {
        set((state) => {
          const isSelected = !!state.selectedItemIds[itemId];
          if (isSelected) {
            const { [itemId]: _, ...rest } = state.selectedItemIds;
            return { selectedItemIds: rest };
          }

          return {
            selectedItemIds: {
              ...state.selectedItemIds,
              [itemId]: true,
            },
          };
        });
      },

      setItemSelected: (itemId: number, selected: boolean) => {
        set((state) => {
          if (!selected) {
            const { [itemId]: _, ...rest } = state.selectedItemIds;
            return { selectedItemIds: rest };
          }

          return {
            selectedItemIds: {
              ...state.selectedItemIds,
              [itemId]: true,
            },
          };
        });
      },

      selectAllItems: () => {
        set((state) => ({
          selectedItemIds: Object.fromEntries(
            state.items.map((item) => [item.id, true])
          ),
        }));
      },

      clearSelection: () => {
        set({ selectedItemIds: {} });
      },

      getSelectedItems: () => {
        const state = get();
        return state.items.filter((item) => !!state.selectedItemIds[item.id]);
      },

      getSelectedSubtotal: () => {
        return calculateSubtotalForItems(get().getSelectedItems());
      },

      getSelectedTotalItems: () => {
        return get()
          .getSelectedItems()
          .reduce((total, item) => total + item.quantity, 0);
      },

      getSelectedShipping: () => {
        const subtotal = get().getSelectedSubtotal();
        return subtotal >= DEFAULT_CALCULATION_OPTIONS.freeShippingThreshold
          ? 0
          : DEFAULT_CALCULATION_OPTIONS.shippingCost;
      },

      getSelectedTax: () => {
        const subtotal = get().getSelectedSubtotal();
        return subtotal * DEFAULT_CALCULATION_OPTIONS.taxRate;
      },

      getSelectedTotal: () => {
        const subtotal = get().getSelectedSubtotal();
        const shipping = get().getSelectedShipping();
        const tax = get().getSelectedTax();
        return subtotal + shipping + tax;
      },

      // Utility functions
      getItemQuantity: (productId: number) => {
        const state = get();
        const item = state.items.find((item) => item.product.id === productId);
        return item?.quantity || 0;
      },

      getTotalItems: () => {
        const state = get();
        return state?.items?.reduce((total, item) => total + item.quantity, 0) || 0;
      },

      getTotalPrice: () => {
        return calculateSubtotalForItems(get().items);
      },

      getSubtotal: () => {
        return get().getTotalPrice();
      },

      getShipping: () => {
        const state = get();
        const subtotal = state.getSubtotal();
        return subtotal >= DEFAULT_CALCULATION_OPTIONS.freeShippingThreshold
          ? 0
          : DEFAULT_CALCULATION_OPTIONS.shippingCost;
      },

      getTax: () => {
        const state = get();
        const subtotal = state.getSubtotal();
        return subtotal * DEFAULT_CALCULATION_OPTIONS.taxRate;
      },

      getTotal: () => {
        const state = get();
        const subtotal = state.getSubtotal();
        const shipping = state.getShipping();
        const tax = state.getTax();
        return subtotal + shipping + tax;
      },

      isItemInCart: (productId: number) => {
        const state = get();
        return state?.items?.some((item) => item.product.id === productId) || false;
      },

      // Persistence methods
      loadCart: async (options?: { force?: boolean }) => {
        if (!options?.force) {
          if (loadCartDebounceTimer) {
            clearTimeout(loadCartDebounceTimer);
          }
          loadCartDebounceTimer = setTimeout(() => {
            void runLoadCart();
          }, 300);

          return;
        }

        await runLoadCart();
      },

      saveCart: () => {
        set({ lastUpdated: Date.now() });
      },
      };
    },
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state?.items || [],
        lastUpdated: state?.lastUpdated || Date.now(),
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setLoading(false);
        }
      },
    }
  )
);

// Selector hooks for better performance
export const useCartItems = () => useCartStore((state) => state?.items || []);
export const useCartTotal = () => useCartStore((state) => state.getTotal());
export const useCartItemCount = () =>
  useCartStore((state) => state.getTotalItems());
export const useCartIsOpen = () => useCartStore((state) => state.isOpen);
export const useCartLoading = () => useCartStore((state) => state.isLoading);
export const useCartError = () => useCartStore((state) => state.error);
export const useCartItemLoading = (itemId: number) =>
  useCartStore((state) => state.isItemLoading(itemId));

// Cart validation utility
export const validateCart = (items: CartItem[]): CartValidationResult => {
  const errors: { itemId: string; message: string }[] = [];
  const warnings: { itemId: string; message: string }[] = [];

  items.forEach((item) => {
    // Check if item has valid quantity
    if (item.quantity <= 0) {
      errors.push({
        itemId: item.id.toString(),
        message: "Số lượng sản phẩm phải lớn hơn 0",
      });
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
};
