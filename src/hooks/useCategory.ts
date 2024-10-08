import useCategories from "./useCategories";

const useCategory = (id?: string) => {
  const { data: categories } = useCategories();
  return categories?.results.find((g) => g.id === id);
};

export default useCategory;
