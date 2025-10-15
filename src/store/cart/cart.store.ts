import { CartState } from '@/lib/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create<CartState>()(
     persist(
      (set, get) => ({
      items: [],
      addItem: (product) => {
        const existingItem = get().items.find((item) => item.id === product.id);
        if (existingItem) {
          set({
            items: get().items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ items: [...get().items, { ...product, quantity: 1 }] });
        }
      },
      removeItem: (productId) =>
        set({ items: get().items.filter((item) => item.id !== productId) }),
      updateQuantity: (productId, quantity) =>
        set({
          items: get().items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        }),
      getDistinctCount: () => new Set(get().items.map((item) => item.id)).size,
      getTotal: () =>
        get().items.reduce((total, item) => total + item.precio * item.quantity, 0),
    }
  ), { name: 'cart-storage' })
);