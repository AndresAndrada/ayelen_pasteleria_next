export type Product = {
    id: number;
    titulo: string;
    descripcion: string;
    precio: number;
    imagen: string;
    fav?: boolean;
    rating: number;
    categoria: string;
};


export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  getDistinctCount: () => number;
  getTotal: () => number;
}

export interface UiStore {
  Favorites: Product[];
  FavoritesId: number[];
  isFavorite: (productId: number) => boolean;
  theme: 'light' | 'dark';
  hasVisited: true | false;

  ToggleFavorite: (productId: number, product: Product) => void;
  setFavorites: (values: Product[]) => void;
  setFavoritesId: (values: number[]) => void;
  toggleTheme: () => void;
  setHasVisited: (values: boolean) => void;
}