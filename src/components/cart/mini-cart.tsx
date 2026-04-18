"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, X, ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { cn, formatPrice } from "@/lib/utils";
import {
  useCartStore,
  useCartItems,
  useCartItemCount,
} from "@/stores/cart-store";
import { CartItem } from "./cart-item";

interface MiniCartProps {
  className?: string;
}

export function MiniCart({ className }: MiniCartProps) {
  const router = useRouter();
  const { isOpen, closeCart } = useCartStore();
  const items = useCartItems();
  const selectedItemIds = useCartStore((s) => s.selectedItemIds);
  const setItemSelected = useCartStore((s) => s.setItemSelected);
  const selectAllItems = useCartStore((s) => s.selectAllItems);
  const clearSelection = useCartStore((s) => s.clearSelection);
  const getSelectedSubtotal = useCartStore((s) => s.getSelectedSubtotal);
  const itemCount = useCartItemCount();

  const selectedCount = useMemo(
    () => items.filter((item) => !!selectedItemIds[item.id]).length,
    [items, selectedItemIds],
  );
  const selectedSubtotal = getSelectedSubtotal();
  const [isVisible, setIsVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle visibility with smooth transitions
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeCart();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, closeCart]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeCart();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeCart]);

  if (!isVisible) return null;

  return (
    <div
      ref={dropdownRef}
      className={cn(
        "absolute left-1/2 lg:left-[unset] lg:right-0 top-full w-80 lg:w-96 -translate-x-1/2 lg:translate-x-0 bg-background/95 backdrop-blur-md border border-border rounded-lg shadow-xl z-50",
        "transform transition-all duration-300 ease-out",
        "animate-in slide-in-from-top-2 fade-in-0 zoom-in-95",
        isOpen
          ? "opacity-100 scale-100 translate-y-0"
          : "opacity-0 scale-95 -translate-y-2 pointer-events-none",
        className,
      )}
    >
      {/* Header */}
      <div className="px-4 py-2 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            <h3 className="font-semibold text-lg">{`Giỏ hàng (${itemCount})`}</h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={closeCart}
            className="h-8 w-8 hover:bg-secondary transition-all duration-200"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      {items.length === 0 ? (
        <div className="p-8 text-center">
          <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h4 className="font-medium text-lg mb-2">
            Giỏ hàng của bạn đang trống
          </h4>
          <p className="text-muted-foreground text-sm mb-6">
            Hãy thêm một vài sản phẩm để bắt đầu
          </p>
          <Button asChild onClick={closeCart}>
            <Link href="/products">
              Bắt đầu mua sắm
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="px-3 pt-2 pb-1 border-b border-border/60">
            <p className="text-xs text-muted-foreground mb-2">
              Đã chọn {selectedCount}/{items.length} sản phẩm để thanh toán
            </p>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-7 text-xs flex-1"
                onClick={() => selectAllItems()}
              >
                Chọn tất cả
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={selectedCount === 0}
                className="h-7 text-xs flex-1"
                onClick={() => clearSelection()}
              >
                Bỏ chọn
              </Button>
            </div>
          </div>

          {/* Cart Items */}
          <div className="max-h-64 overflow-auto">
            <ScrollArea className="h-full">
              <div className="p-3 space-y-1">
                {items.map((item) => (
                  <div key={item.id}>
                    <CartItem
                      item={item}
                      variant="minimal"
                      selectable={true}
                      selected={!!selectedItemIds[item.id]}
                      onSelectedChange={(checked) =>
                        setItemSelected(item.id, checked)
                      }
                      showRemoveButton={true}
                      showQuantityControls={false}
                      className="hover:bg-muted/50 rounded-md px-2 py-1 -mx-2 -my-1 transition-all duration-200"
                    />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          <Separator />

          {/* Summary */}
          <div className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Tổng (đã chọn)</span>
              <span className="font-bold text-lg">
                {formatPrice(selectedSubtotal)}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <Button
                className="w-full"
                size="lg"
                disabled={selectedCount === 0}
                onClick={() => {
                  if (selectedCount === 0) return;
                  closeCart();
                  router.push("/checkout");
                }}
              >
                Thanh toán
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full"
                onClick={closeCart}
              >
                <Link href="/cart">Xem giỏ hàng</Link>
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
