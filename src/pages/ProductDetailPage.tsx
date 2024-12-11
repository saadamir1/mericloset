import { Box, GridItem, Heading, Image, SimpleGrid, Spinner } from "@chakra-ui/react";
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
      <GridItem>
        {/* Scrollable Image Container */}
        <Box
          display="flex"
          overflowX="scroll"
          paddingY={4}
          gap={4}
          className="image-scroller"
        >
          {product.images.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`${product.title} - ${index + 1}`}
              borderRadius="md"
              objectFit="contain"
              maxWidth="200px"
              height="200px"
            />
          ))}
        </Box>
      </GridItem>
    </SimpleGrid>
  );
};

export default ProductDetailPage;
