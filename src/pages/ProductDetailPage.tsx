import { GridItem, Heading, SimpleGrid, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import useProduct from "../hooks/useProduct";
import ProductAttributes from "../components/ProductAttributes";

const ProductDetailPage = () => {
  const { slug } = useParams();
  const { data: product, isLoading, error } = useProduct(slug!);

  if (isLoading) return <Spinner />;
  if (error || !product) throw error;

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
      <GridItem>
        <Heading marginBottom={4}>{product.title}</Heading>
        <text>{product.description}</text>
        <ProductAttributes product={product} />
      </GridItem>

    </SimpleGrid>
  );
};

export default ProductDetailPage;
