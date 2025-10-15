import { Product } from '@/lib/types';
import { create } from 'zustand';
interface ProductStore {
  DataPerfilProduct:  Product | null;
  Products: Product[];
  DetailsProduct: Product | null;
  TotalProductsPages: number;
  CurrentProductsPage: number;
  SelectedTab: string;
  ProductById: Record<string, Product>;
  ConsumerProducts: string;
  Carrito: Record<string, string | number | Product>[];

  setProducts: (values: Product[]) => void;
  setDataPerfilProduct: (values: Product) => void;
  setDetailsProduct: (values: Product) => void;
  setProductById: (values: Record<string, Product>) => void;
  setTotalProductsPages: (totalPages: number) => void;
  setCurrentProductsPage: (page: number) => void;
  setSelectedTab: (tab: string) => void;
  setConsumerProducts: (consumer: string) => void;
  setCarrito: (consumer: Record<string, string | number | Product>[]) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  DataPerfilProduct: null,
  Products: [],
  DetailsProduct: null,
  TotalProductsPages: 0,
  CurrentProductsPage: 1,
  SelectedTab: '',
  ProductById: {},
  ConsumerProducts: 'Minorista',
  Carrito: [],

  setProducts: (values: Product[]) => set({ Products: values }),
  setDataPerfilProduct: (values: Product) => set({ DataPerfilProduct: values }),
  setDetailsProduct: (values) => set({ DetailsProduct: values }),
  setProductById: (values) => set({ ProductById: values }),
  setTotalProductsPages: (totalPages) =>
    set((prevState: ProductStore) => ({ ...prevState, TotalProductsPages: totalPages })),
  setCurrentProductsPage: (page) =>
    set((prevState: ProductStore) => ({ ...prevState, CurrentProductsPage: page })),
  setSelectedTab: (tab) =>
    set((prevState: ProductStore) => ({ ...prevState, SelectedTab: tab })),
  setConsumerProducts: (consumer) =>
    set((prevState: ProductStore) => ({ ...prevState, ConsumerProducts: consumer })),
  setCarrito: (values) => set({ Carrito: values }),
}));