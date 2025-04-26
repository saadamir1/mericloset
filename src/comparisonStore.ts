import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ComparisonStore {
  comparedProductIds: string[];
  addToComparison: (productId: string) => void;
  removeFromComparison: (productId: string) => void;
  clearComparison: () => void;
  isInComparison: (productId: string) => boolean;
}

const useComparisonStore = create<ComparisonStore>()(
  persist(
    (set, get) => ({
      comparedProductIds: [],
      
      addToComparison: (productId: string) => {
        const { comparedProductIds } = get();
        if (comparedProductIds.includes(productId)) return;
        
        // Limit to maximum 3 products for comparison
        if (comparedProductIds.length >= 3) {
          // Remove the oldest product
          const newIds = [...comparedProductIds.slice(1), productId];
          set({ comparedProductIds: newIds });
        } else {
          set({ comparedProductIds: [...comparedProductIds, productId] });
        }
      },
      
      removeFromComparison: (productId: string) => {
        const { comparedProductIds } = get();
        set({
          comparedProductIds: comparedProductIds.filter(id => id !== productId)
        });
      },
      
      clearComparison: () => {
        set({ comparedProductIds: [] });
      },
      
      isInComparison: (productId: string) => {
        return get().comparedProductIds.includes(productId);
      }
    }),
    {
      name: "product-comparison"
    }
  )
);

export default useComparisonStore;