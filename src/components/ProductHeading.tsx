import { Heading } from "@chakra-ui/react";
import useCategory from "../hooks/useCategory";
import useBrand from "../hooks/useBrand";
import useProductQueryStore from "../store";

const ProductHeading = () => {
  const categoryID = useProductQueryStore((s) => s.productQuery.categoryID);
  const category = useCategory(categoryID);

  const brandID = useProductQueryStore((s) => s.productQuery.brandID);
  const brand = useBrand(brandID);

  const heading = `${brand?.name || ""} ${category?.name || ""} Products`;

  return (
    <Heading as="h1" marginY={5} fontSize="5xl">
      {heading}
    </Heading>
  );
};

export default ProductHeading;
