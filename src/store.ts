import { create } from "zustand";

export interface ProductQuery {
  genreID?: number;
  platformID?: number; // same as platformID: number | undefined;
  sortOrder?: string;
  searchText?: string;
}

interface ProductQueryStore {
  productQuery: ProductQuery;
  setGenreID: (genreID: number) => void;
  setPlatformID: (platformID: number) => void;
  setSortOrder: (sortOrder: string) => void;
  setSearchText: (searchText: string) => void;
  resetFilters: () => void;
}

const useProductQueryStore = create<ProductQueryStore>((set) => ({
  productQuery: {},

  setGenreID: (genreID) =>
    set((store) => ({
      productQuery: { ...store.productQuery, genreID },
    })),

  setPlatformID: (platformID) =>
    set((store) => ({
      productQuery: { ...store.productQuery, platformID },
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
      productQuery: {}, // Reset to empty object
    })),
}));

export default useProductQueryStore;
