"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  ReactNode,
  useRef,
} from "react";
import { useAppStore } from "@/stores/app-store";
import { AppContextType } from "@/types/app-context";

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const store = useAppStore();
  const initRef = useRef(false);

  // When we have persisted state (isInitialized), refresh categories on mount so we don't show stale data.
  // Skip when !isInitialized so the first init (below) fetches categories once.
  useEffect(() => {
    if (!store.isInitialized) return;

    let idleCallbackId: number | undefined;
    let timeoutId: NodeJS.Timeout | undefined;

    const refresh = () => store.refreshCategories();

    if ("requestIdleCallback" in window) {
      idleCallbackId = (window as any).requestIdleCallback(refresh, {
        timeout: 2000,
      });
    } else {
      timeoutId = setTimeout(refresh, 500);
    }

    return () => {
      if (idleCallbackId !== undefined && "cancelIdleCallback" in window) {
        (window as any).cancelIdleCallback(idleCallbackId);
      }
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, [store.isInitialized, store.refreshCategories]);

  // One-time full app init (contests, etc.); categories are refreshed above on every load
  useEffect(() => {
    if (initRef.current || store.isInitialized || store.isLoading) return;
    initRef.current = true;

    let idleCallbackId: number | undefined;
    let timeoutId: NodeJS.Timeout | undefined;

    const init = () => store.initializeApp();

    if ("requestIdleCallback" in window) {
      idleCallbackId = (window as any).requestIdleCallback(init, {
        timeout: 2000,
      });
    } else {
      timeoutId = setTimeout(init, 500);
    }

    return () => {
      if (idleCallbackId !== undefined && "cancelIdleCallback" in window) {
        (window as any).cancelIdleCallback(idleCallbackId);
      }
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, [store.isInitialized, store.isLoading, store.initializeApp]);

  const contextValue: AppContextType = {
    // Categories
    categories: store.categories,

    // Loading states
    isLoading: store.isLoading,
    isInitialized: store.isInitialized,
    error: store.error,

    // Actions
    refreshCategories: store.refreshCategories,
    initializeApp: store.initializeApp,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}

// Convenience hooks for specific data
export function useCategories() {
  const { categories } = useApp();

  return { categories };
}

export function useAppLoading() {
  const { isLoading, isInitialized, error } = useApp();
  return { isLoading, isInitialized, error };
}
