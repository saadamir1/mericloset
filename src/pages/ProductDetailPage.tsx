import { GridItem, Heading, SimpleGrid, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ExpandableText from "../components/ExpandableText";
import useProduct from "../hooks/useProduct";
import ProductAttributes from "../components/ProductAttributes";
import ProductTrailor from "../components/ProductTrailer";
import ProductScreenshots from "../components/ProductScreenshots";

const ProductDetailPage = () => {
  const { slug } = useParams();
  const { data: product, isLoading, error } = useProduct(slug!);

  if (isLoading) return <Spinner />;
  if (error || !product) throw error;

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
      <GridItem>
        <Heading marginBottom={4}>{product.name}</Heading>
        <ExpandableText>{product.description_raw}</ExpandableText>
        <ProductAttributes product={product} />
      </GridItem>
      <GridItem>
        <ProductTrailor productId={product.id} />
        <ProductScreenshots productId={product.id} />
      </GridItem>
    </SimpleGrid>
  );
};

export default ProductDetailPage;
