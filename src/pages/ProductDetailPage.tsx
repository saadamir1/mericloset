import React, { useState, useEffect } from "react";
import { Box, GridItem, Heading, Image, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import useProduct from "../hooks/useProduct";
import ProductAttributes from "../components/ProductAttributes";

const ProductDetailPage = () => {
  const { slug } = useParams();
  const { data: product, isLoading, error } = useProduct(slug!);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    // Ensure mainImage is set after product is fetched
    if (product && product.images.length > 0) {
      setMainImage(product.images[0]);
    }
  }, [product]);

  const handleThumbnailClick = (image: string) => {
    setMainImage(image);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    if (!mainImage) return;
    const imageElement = e.currentTarget;
    const { left, top, width, height } = imageElement.getBoundingClientRect();

    const x = e.clientX - left;
    const y = e.clientY - top;

    setZoomStyle({
      backgroundImage: `url(${mainImage})`,
      backgroundSize: `${width * 2}px ${height * 2}px`,
      backgroundPosition: `${(x / width) * 100}% ${(y / height) * 100}%`,
      backgroundRepeat: "no-repeat",
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({});
  };

  // Loading and error handling
  if (isLoading) return <Spinner />;
  if (error || !product) {
    return (
      <Text>
        Error: {error instanceof Error ? error.message : "Product not found"}
      </Text>
    );
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
      <GridItem>
        <Heading marginBottom={4}>{product.title}</Heading>
        <Box marginBottom={4}>
          <Text>{product.description}</Text>
        </Box>
        <ProductAttributes product={product} />
      </GridItem>
      <GridItem>
        <Box mb={4} display="flex" justifyContent="center" position="relative">
          <Image
            src={mainImage || ""}
            alt={product.title}
            maxWidth="100%"
            maxHeight="500px"
            objectFit="contain"
            borderRadius="md"
            boxShadow="lg"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            cursor="zoom-in"
          />
          {zoomStyle.backgroundImage && (
            <Box
              style={zoomStyle}
              borderRadius="md"
              boxShadow="lg"
              display="block"
              width="300px" // Increased width
              height="300px" // Increased height
              position="absolute"
              top="50px" // Adjusted top positioning
              left="50px" // Adjusted left positioning
              zIndex="10" // Ensures it's above other elements
            />
          )}

        </Box>
        <Box display="flex" overflowX="auto" paddingY={4} gap={4} justifyContent="center">
          {product.images.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`${product.title} - Thumbnail ${index + 1}`}
              width="80px"
              height="80px"
              objectFit="cover"
              borderRadius="md"
              cursor="pointer"
              onClick={() => handleThumbnailClick(image)}
              transition="transform 0.3s ease"
              _hover={{ transform: "scale(1.1)" }}
            />
          ))}
        </Box>
      </GridItem>
    </SimpleGrid>
  );
};

export default ProductDetailPage;
