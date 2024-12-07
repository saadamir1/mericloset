import { GridItem, Heading,Image, SimpleGrid, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import useProduct from "../hooks/useProduct";
import ProductAttributes from "../components/ProductAttributes";

const ProductDetailPage = () => {
  const { slug } = useParams();
  const { data: product, isLoading, error } = useProduct(slug!);

  if (isLoading) return <Spinner />;
  if (error || !product) throw error;

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
      <GridItem>
        <Heading marginBottom={4}>{product.title}</Heading>
        <text>{product.description}</text>
        <ProductAttributes product={product} />
      </GridItem>
      <GridItem display="flex" justifyContent="center" alignItems="center">
      <Image
        src={product.images[0]}
        alt={product.title}
        borderRadius="md"
        objectFit="contain"
        maxWidth="100%"
        height="400px"
      />

      </GridItem>

    </SimpleGrid>
  );
};

export default ProductDetailPage;
