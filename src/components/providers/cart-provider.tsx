"use client";

import { useAuth } from "@clerk/nextjs";
import { useCallback, useEffect, useRef } from "react";
import { apiClient } from "@/lib/api/client";
import { useCartStore } from "@/stores/cart-store";

const CLERK_TEMPLATE = process.env.NEXT_PUBLIC_CLERK_TEMPLATE || "aka";

interface CartProviderProps {
  children: React.ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const loadCart = useCartStore((s) => s.loadCart);
  const resetCart = useCartStore((s) => s.resetCart);

  const isSyncingRef = useRef(false);

  const syncCartFromServer = useCallback(
    async (options?: { force?: boolean }) => {
      if (isSyncingRef.current) return;
      isSyncingRef.current = true;

      try {
        const token = await getToken({ template: CLERK_TEMPLATE });
        if (!token) return;

        apiClient.setAuthToken(token);

        await loadCart(options); // 👈 pass options here
      } catch (e) {
        console.warn("Cart sync failed:", e);
      } finally {
        isSyncingRef.current = false;
      }
    },
    [getToken, loadCart]
  );

  // ✅ Initial load / auth change → FORCE
  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      resetCart();
      return;
    }

    void syncCartFromServer({ force: true });
  }, [isLoaded, isSignedIn, resetCart, syncCartFromServer]);

  // ✅ Tab visibility → DEBOUNCED (no force)
  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    const onVisible = () => {
      if (document.visibilityState === "visible") {
        void syncCartFromServer(); // 👈 no force → uses debounce
      }
    };

    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [isLoaded, isSignedIn, syncCartFromServer]);

  return <>{children}</>;
}