import { create } from "zustand";

// Updated ProductQuery interface to match e-commerce filters
export interface ProductQuery {
  categoryID?: string; // For filtering by category
  brandID?: string;    // For filtering by brand
  sortOrder?: string;  // For sorting (e.g., price, popularity)
  searchText?: string; // For search functionality
}

interface ProductQueryStore {
  productQuery: ProductQuery;
  setCategoryID: (categoryID: string) => void;
  setBrandID: (brandID: string) => void;
  setSortOrder: (sortOrder: string) => void;
  setSearchText: (searchText: string) => void;
  resetFilters: () => void;
}

const useProductQueryStore = create<ProductQueryStore>((set) => ({
  productQuery: {},

  setCategoryID: (categoryID) =>
    set((store) => ({
      productQuery: { ...store.productQuery, categoryID },
    })),

  setBrandID: (brandID) =>
    set((store) => ({
      productQuery: { ...store.productQuery, brandID },
    })),

  setSortOrder: (sortOrder) =>
    set((store) => ({
      productQuery: { ...store.productQuery, sortOrder },
    })),

  setSearchText: (searchText) =>
    set((store) => ({
      productQuery: { ...store.productQuery, searchText },
    })),

  resetFilters: () =>
    set(() => ({
      productQuery: {}, // Reset to empty object to clear all filters
    })),
}));

export default useProductQueryStore;
