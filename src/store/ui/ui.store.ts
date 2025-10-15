import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, UiStore } from '@/lib/types';



export const useUiStore = create<UiStore>()(
  persist(
    (set, get) => ({
      Favorites: [],
      theme: 'light',
      FavoritesId: [],
      hasVisited: false,

      toggleTheme: () => set((state) => ({
        theme: state.theme === 'light' ? 'dark' : 'light',
      })),
      isFavorite: (productId: number) => get().FavoritesId.includes(productId),
      ToggleFavorite: (productId: number, product: Product) => {
        const isCurrentlyFavorite = get().isFavorite(productId);
        const updatedProduct = { ...product, fav: !isCurrentlyFavorite };
        set((state) => ({
          Favorites: isCurrentlyFavorite
            ? state.Favorites.filter((p) => p.id !== productId)
            : [...state.Favorites, updatedProduct],
          FavoritesId: isCurrentlyFavorite
            ? state.FavoritesId.filter((id) => id !== productId)
            : [...state.FavoritesId, productId],
        }));
      },
      setFavorites: (values: Product[]) => set({ Favorites: values }),
      setFavoritesId: (values: number[]) => set({ FavoritesId: values }),
      setHasVisited: (values: boolean) => set({ hasVisited: values }),
    }),
    { name: 'ui-storage' }
  )
);