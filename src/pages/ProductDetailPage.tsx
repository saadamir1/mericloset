import React, { useState, useEffect } from "react";
import {
  Box,
  GridItem,
  Heading,
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
  useColorModeValue, Image,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { FaRulerCombined } from "react-icons/fa";
import useProduct from "../hooks/useProduct";
import ProductAttributes from "../components/ProductAttributes";
import ImageZoom from "../components/ImageZoom";
import sizeChartImg from "../assets/shalwarkameezsize.jpg";

const ProductDetailPage = () => {
  const { slug } = useParams();
  const { data: product, isLoading, error } = useProduct(slug!);
  const [mainImage, setMainImage] = useState<string | null>(null);
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

  // Loading and error handling
  if (isLoading) return <Spinner />;
  if (error || !product) {
    return (
      <Text>
        Error : {error instanceof Error ? error.message : "Product not found"}
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

          {/* Size Chart Button */}
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
        <ImageZoom src={mainImage || ""} alt={product.title} />
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

      {/* Size Chart Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody p={4} display="flex" justifyContent="center">
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