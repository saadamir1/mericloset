import { Heading } from "@chakra-ui/react";
import useCategory from "../hooks/useCategory";
import useProductQueryStore from "../store";

const ProductHeading = () => {
  const categoryID = useProductQueryStore((s) => s.productQuery.categoryID);
  const category = useCategory(categoryID);

  const brand = useProductQueryStore((s) => s.productQuery.brandID);  // Since brand is a string

  // Build the heading dynamically based on brand and category
  let heading = "Products"; // Default heading

  if (brand && category) {
    heading = `${brand} ${category.name} Products`;
  } else if (brand) {
    heading = `${brand} Products`;
  } else if (category) {
    heading = `${category.name} Products`;
  }

  return (
    <Heading as="h1" marginY={5} fontSize="5xl">
      {heading}
    </Heading>
  );
};

export default ProductHeading;
