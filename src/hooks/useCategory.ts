import useCategories from "./useCategories";

const useCategory = (id?: string) => {
  const { data: categories } = useCategories();

  // Check if categories and categories.results are defined
  return categories?.results?.find((g) => g.id === id);
};

export default useCategory;
