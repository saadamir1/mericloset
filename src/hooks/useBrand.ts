import useBrands from "./useBrands";

const useBrand = (id?: string) => {
  const { data: brands } = useBrands();

  return brands?.results?.find((brand) => brand.id === id);
};

export default useBrand;
