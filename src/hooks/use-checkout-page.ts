"use client";

import { useState, useEffect, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useCartStore } from "@/stores/cart-store";
import { useUserAddresses } from "@/hooks/use-user-addresses";
import { Address } from "@/types";
import { storefrontOrderService } from "@/lib/api/services/storefront/orders-client";
import { useUser } from "@clerk/nextjs";
import { unifiedPaymentService } from "@/lib/api/services/unified/payment";

// Form validation schema
const checkoutSchema = z.object({
  sameAsShipping: z.boolean().optional(),
  paymentMethod: z.string().min(1, "Vui lòng chọn phương thức thanh toán"),
  orderNote: z.string().optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;

// Payment methods - updated to match new API format
export const PAYMENT_METHODS = [
  {
    id: "COD",
    name: "Thanh toán khi nhận hàng",
    description: "Thanh toán bằng tiền mặt khi nhận hàng",
  },
  {
    id: "VNPAY",
    name: "VNPay",
    description: "Thanh toán qua VNPay",
  },
];

export function useCheckoutPage() {
  const router = useRouter();
  const {
    user,
    isSignedIn: isAuthenticated,
    isLoaded: isAuthLoaded,
  } = useUser();
  const { getSelectedItems, getSelectedSubtotal, getSelectedTax } =
    useCartStore();
  const items = getSelectedItems();

  const {
    addresses,
    isLoading: addressesLoading,
    addAddress,
    updateAddress,
  } = useUserAddresses();

  // Form state
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form setup
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      sameAsShipping: true,
      paymentMethod: "",
      orderNote: "",
    },
  });

  const watchedPaymentMethod = watch("paymentMethod");

  // Get default addresses
  const defaultAddress = addresses.find((addr) => addr.isDefault);

  // Initialize selected addresses with defaults
  useEffect(() => {
    if (defaultAddress && !selectedAddress) {
      setSelectedAddress(defaultAddress);
    }
  }, [defaultAddress, selectedAddress]);

  // Redirect before paint so checkout UI does not flash (and avoid waiting on addresses).
  useLayoutEffect(() => {
    if (!isAuthLoaded) return;
    if (!isAuthenticated) {
      router.replace("/auth/sign-in?redirect_url=/checkout");
      return;
    }
    if (items.length === 0) {
      router.replace("/cart");
    }
  }, [isAuthLoaded, isAuthenticated, items, router]);

  // Calculate values
  const subtotal = getSelectedSubtotal();
  const tax = getSelectedTax();
  const total = subtotal + tax;

  // Handle address form submissions
  const handleAddressSubmit = async (data: any) => {
    try {
      if (editingAddress) {
        await updateAddress(editingAddress.id, {
          ...data,
        });
        toast.success("Cập nhật địa chỉ thành công");
      } else {
        await addAddress({ ...data, isDefault: true });
        toast.success("Thêm địa chỉ thành công");
      }
      setShowAddressForm(false);
      setEditingAddress(null);
      // Auto-select the newly created/updated address
      const updatedAddresses = addresses.filter((addr) => addr.isDefault);
      const newAddress = updatedAddresses[updatedAddresses.length - 1];
      if (newAddress) {
        setSelectedAddress(newAddress);
      }
    } catch (error) {
      toast.error("Lưu địa chỉ giao hàng thất bại");
    }
  };

  // Handle opening address forms
  const handleOpenAddressForm = (address?: Address) => {
    setEditingAddress(address || null);
    setShowAddressForm(true);
  };

  // Handle form submission
  const handleFormSubmit = async (data: CheckoutFormValues) => {
    if (!user) {
      toast.error("Vui lòng đăng nhập để tiếp tục");
      return;
    }

    if (items.length === 0) {
      toast.error("Giỏ hàng của bạn đang trống");
      return;
    }

    // Validate addresses
    if (!selectedAddress) {
      toast.error("Vui lòng chọn địa chỉ giao hàng để tiếp tục");
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare order data according to new API format
      const orderData = {
        cartItemId: items.map((item) => item.id), // Use cart item IDs
        paymentMethod: data.paymentMethod as "COD" | "VNPAY" | "MOMO" | "ZALO",
        recipientName: selectedAddress.recipientName,
        recipientPhone: selectedAddress.recipientPhone,
        shippingAddress: selectedAddress.recipientAddress,
        note: data.orderNote || undefined,
      };

      // Create order using the new API
      const createdOrder = await storefrontOrderService.createOrder(orderData);

      // Send order confirmation email
      try {
        const { sendOrderConfirmationEmail } = await import(
          "@/lib/email/helpers"
        );
        await sendOrderConfirmationEmail(createdOrder);
      } catch (emailError) {
        console.error("Failed to send order confirmation email:", emailError);
        // Don't block the order flow if email fails
      }

      if (data.paymentMethod !== "COD") {
        const paymentResponse = await unifiedPaymentService.createPayment({
          orderId: createdOrder.id,
          gateway: data.paymentMethod as "VNPAY" | "MOMO" | "ZALO",
        });

        window.open(paymentResponse.paymentUrl, "_blank");
      }

      toast.success("Đặt hàng thành công!");
      // Redirect to success page with order ID
      router.push(`/checkout/success?order_id=${createdOrder.id.toString()}`);
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Đặt hàng thất bại. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddressChange = (address?: Address) => {
    setSelectedAddress(address || null);
  };

  return {
    // Form state
    form: {
      register,
      handleSubmit: handleSubmit(handleFormSubmit),
      watch,
      setValue,
      errors,
      watchedPaymentMethod,
    },

    modals: {
      showAddressForm,
      editingAddress,
      setShowAddressForm,
      setEditingAddress,
    },

    // Address state
    addresses: {
      all: addresses,
      selected: selectedAddress,
      default: defaultAddress,
    },

    // Handlers
    handlers: {
      handleOpenAddressForm: handleOpenAddressForm,
      handleAddressSubmit: handleAddressSubmit,
      handleAddressChange: handleAddressChange,
    },

    // Cart and pricing
    cart: {
      items,
      subtotal,
      shippingCost: 0, // 0 VND
      tax,
      total,
    },

    // Loading states — only block on addresses when checkout can actually proceed
    loading: {
      auth: !isAuthLoaded,
      addresses:
        isAuthLoaded && isAuthenticated && items.length > 0 && addressesLoading,
      submitting: isSubmitting,
    },

    // Auth state
    auth: {
      user,
      isAuthenticated,
      isLoaded: isAuthLoaded,
    },

    // Constants
    constants: {
      PAYMENT_METHODS,
    },
  };
}
