import React, { useState, useEffect } from "react";
import {
  Box,
  GridItem,
  Heading,
  Image,
  SimpleGrid,
  Spinner,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { FaRulerCombined } from "react-icons/fa";
import useProduct from "../hooks/useProduct";
import ProductAttributes from "../components/ProductAttributes";

// Import the size chart image if it's in the src/assets/ folder
import sizeChartImg from "../assets/shalwarkameezsize.jpg";

const ProductDetailPage = () => {
  const { slug } = useParams();
  const { data: product, isLoading, error } = useProduct(slug!);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({});
  const { isOpen, onOpen, onClose } = useDisclosure(); // Modal control for Size Chart
  const [selectedThumbnailIndex, setSelectedThumbnailIndex] = useState<number>(0); // Track selected thumbnail

  // 🌿 Green-Themed Styling Based on Theme Mode
  const buttonBg = useColorModeValue("green.500", "green.400");
  const buttonTextColor = useColorModeValue("white", "gray.900");
  const buttonHoverBg = useColorModeValue("green.600", "green.300");
  const buttonBorderColor = useColorModeValue("green.600", "green.500");

  useEffect(() => {
    if (product && product.images.length > 0) {
      setMainImage(product.images[0]);
    }
  }, [product]);

  const handleThumbnailClick = (image: string, index: number) => {
    setMainImage(image);
    setSelectedThumbnailIndex(index); // Update selected thumbnail index
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

        {/* Sizes & Other Attributes */}
        <Box>
          <ProductAttributes product={product} />

          {/* 🆕 Fix: Properly Align the Size Chart Button Under "Sizes" */}
          <Box mt={2}>
            <Button
              onClick={onOpen}
              bg={buttonBg}
              color={buttonTextColor}
              border="2px solid"
              borderColor={buttonBorderColor}
              leftIcon={<Icon as={FaRulerCombined} />}
              fontSize="md"
              fontWeight="bold"
              borderRadius="md"
              _hover={{ bg: buttonHoverBg }}
            >
              SIZE CHART
            </Button>
          </Box>
        </Box>
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
              width="300px"
              height="300px"
              position="absolute"
              top="50px"
              left="50px"
              zIndex="10"
            />
          )}
        </Box>
        <Box display="flex" overflowX="auto" paddingY={4} gap={4} justifyContent="center">
          {product.images.map((image, index) => (
            <Box
              key={index}
              position="relative"
              cursor="pointer"
              onClick={() => handleThumbnailClick(image, index)}
            >
              <Image
                src={image}
                alt={`${product.title} - Thumbnail ${index + 1}`}
                width="80px"
                height="80px"
                objectFit="cover"
                borderRadius="md"
                transition="transform 0.3s ease"
                _hover={{ transform: "scale(1.1)" }}
              />
              {/* Thin Line Indicator */}
              {selectedThumbnailIndex === index && (
                <Box
                  position="absolute"
                  bottom="-8px"
                  left="0"
                  right="0"
                  height="2px"
                  bg="green.500"
                  borderRadius="full"
                />
              )}
            </Box>
          ))}
        </Box>
      </GridItem>

      {/* 🆕 Size Chart Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody p={4} display="flex" justifyContent="center">
            {/* Load image based on correct path */}
            <Image
              src={sizeChartImg}
              alt="Size Chart"
              maxWidth="100%"
              borderRadius="md"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </SimpleGrid>
  );
};

export default ProductDetailPage;