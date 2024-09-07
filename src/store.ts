import { create } from "zustand";

export interface GameQuery {
  genreID?: number;
  platformID?: number; // same as platformID: number | undefined;
  sortOrder?: string;
  searchText?: string;
}

interface GameQueryStore {
  gameQuery: GameQuery;
  setGenreID: (genreID: number) => void;
  setPlatformID: (platformID: number) => void;
  setSortOrder: (sortOrder: string) => void;
  setSearchText: (searchText: string) => void;
}

const useGameQueryStore = create<GameQueryStore>((set) => ({
  gameQuery: {},

  setGenreID: (genreID) =>
    set((store) => ({
      gameQuery: { ...store.gameQuery, genreID },
    })),

  setPlatformID: (platformID) =>
    set((store) => ({
      gameQuery: { ...store.gameQuery, platformID },
    })),

  setSortOrder: (sortOrder) =>
    set((store) => ({
      gameQuery: { ...store.gameQuery, sortOrder },
    })),

  setSearchText: (searchText) =>
    set((store) => ({
      gameQuery: { ...store.gameQuery, searchText },
    })),
}));

export default useGameQueryStore;
