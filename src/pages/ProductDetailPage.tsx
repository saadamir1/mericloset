import { useState, useEffect, useRef } from "react";
import {
  Box,
  GridItem,
  Heading,
  SimpleGrid,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  useDisclosure,
  Icon,
  useColorModeValue,
  Image,
  Flex,
  Badge,
  Divider,
  VStack,
  Skeleton,
  SkeletonText,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useToast,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { FaRulerCombined, FaHeart } from "react-icons/fa";
import useProduct from "../hooks/useProduct";
import ProductAttributes from "../components/ProductAttributes";
import ImageZoom from "../components/ImageZoom";
import sizeChartImg from "../assets/shalwarkameezsize.jpg";
import userStore from "../userStore";
import axios from "axios";

const ProductDetailPage = () => {
  const { slug } = useParams();
  const { data: product, isLoading, error } = useProduct(slug!);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedThumbnailIndex, setSelectedThumbnailIndex] = useState<number>(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);
  const toast = useToast();
  const { user } = userStore();

  // Theme-based styling
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const buttonBg = useColorModeValue("green.500", "green.400");
  const buttonTextColor = useColorModeValue("white", "gray.900");
  const buttonHoverBg = useColorModeValue("green.600", "green.300");
  const buttonBorderColor = useColorModeValue("green.600", "green.500");
  const headingColor = useColorModeValue("gray.800", "white");
  const subheadingColor = useColorModeValue("gray.600", "gray.400");
  const heartColor = isWishlisted ? "red.500" : useColorModeValue("gray.500", "gray.400");

  useEffect(() => {
    if (product && product.images.length > 0) {
      setMainImage(product.images[0]);
    }
  }, [product]);

  useEffect(() => {
    if (!user || !product || hasFetched.current) return;
    hasFetched.current = true;

    const fetchFavorites = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5170/api/v1/favorites/user/${user.id}`);
        setIsWishlisted(data.some((fav: any) => fav.product._id === product.id));
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [product, user]);

  const handleThumbnailClick = (image: string, index: number) => {
    setMainImage(image);
    setSelectedThumbnailIndex(index);
  };

  const handleWishlistToggle = async () => {
    if (!user || !user.id) {
      if (!toast.isActive("login-error")) {
        toast({
          id: "login-error", 
          title: "Please log in to manage your wishlist.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }    
      return;
    }
  
    try {
      if (!isWishlisted) {
        await axios.post("http://localhost:5170/api/v1/favorites/add", {
          userId: user.id,
          productId: product?.id,
        });
        setIsWishlisted(true);
        toast({
          title: "Added to wishlist",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } else {
        await axios.delete(
          `http://localhost:5170/api/v1/favorites/remove/${product?.id}/${user.id}`
        );
        setIsWishlisted(false);
        toast({
          title: "Removed from wishlist",
          status: "info",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
      toast({
        title: "Error updating wishlist",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <Box padding={5}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          <GridItem>
            <Skeleton height="400px" borderRadius="lg" mb={4} />
            <Flex gap={2} overflow="hidden">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} width="80px" height="80px" borderRadius="md" />
              ))}
            </Flex>
          </GridItem>
          <GridItem>
            <Skeleton height="50px" width="70%" mb={4} />
            <SkeletonText mt={2} noOfLines={4} spacing={4} />
            <Skeleton height="40px" width="40%" mt={6} mb={3} />
            <SkeletonText mt={2} noOfLines={3} spacing={4} />
            <Skeleton height="45px" width="180px" mt={6} />
          </GridItem>
        </SimpleGrid>
      </Box>
    );
  }

  // Error handling
  if (error || !product) {
    return (
      <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
        borderRadius="lg"
        margin={5}
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Product Not Available
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          {error instanceof Error ? error.message : "This product could not be found or is no longer available."}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Box p={{ base: 4, md: 6 }}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
        {/* Product Images Section */}
        <GridItem>
          <Box 
            bg={cardBg} 
            borderRadius="lg" 
            overflow="hidden" 
            boxShadow="sm"
            border="1px solid"
            borderColor={borderColor}
            position="relative"
          >
            <ImageZoom 
              src={mainImage || ""} 
              alt={product.title} 
            />
          </Box>
          
          {/* Thumbnails */}
          <Flex 
            mt={4} 
            gap={3} 
            overflow="auto" 
            css={{
              '&::-webkit-scrollbar': {
                height: '8px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: useColorModeValue('rgba(0,0,0,0.2)', 'rgba(255,255,255,0.2)'),
                borderRadius: '4px',
              },
            }}
            pb={2}
            justifyContent={{ base: "flex-start", md: "center" }}
          >
            {product.images.map((image, index) => (
              <Box
                key={index}
                position="relative"
                cursor="pointer"
                onClick={() => handleThumbnailClick(image, index)}
                transition="all 0.2s"
                opacity={selectedThumbnailIndex === index ? 1 : 0.7}
                transform={selectedThumbnailIndex === index ? "scale(1.05)" : "scale(1)"}
              >
                <Image
                  src={image}
                  alt={`${product.title} - View ${index + 1}`}
                  width="80px"
                  height="80px"
                  objectFit="cover"
                  borderRadius="md"
                  border="2px solid"
                  borderColor={selectedThumbnailIndex === index ? "green.500" : "transparent"}
                />
              </Box>
            ))}
          </Flex>
        </GridItem>

        {/* Product Details Section */}
        <GridItem>
          <Box 
            bg={cardBg} 
            p={6} 
            borderRadius="lg" 
            boxShadow="sm"
            border="1px solid"
            borderColor={borderColor}
            height="100%"
          >
            {/* Product Title and Badges */}
            <Flex justify="space-between" align="center" mb={2}>
              <Heading as="h1" size="xl" color={headingColor} fontWeight="bold">
                {product.title}
              </Heading>
              <Badge colorScheme="green" fontSize="md" px={2} py={1} borderRadius="md">
                In Stock
              </Badge>
            </Flex>

            {/* Product Description */}
            <Text fontSize="md" color={subheadingColor} mt={4} lineHeight="1.8">
              {product.description}
            </Text>

            <Divider my={6} />

            {/* Product Attributes */}
            <VStack align="stretch" spacing={5}>
              <ProductAttributes product={product} />
              
              {/* Size Chart Button */}
              <Box>
                <Button
                  onClick={onOpen}
                  leftIcon={<Icon as={FaRulerCombined} />}
                  variant="outline"
                  colorScheme="green"
                  size="md"
                  fontWeight="medium"
                  borderRadius="md"
                  width={{ base: "full", md: "auto" }}
                >
                  Size Chart
                </Button>
              </Box>

              <Divider my={2} />

              {/* Wishlist Button Only */}
              <Box mt={2}>
                <Button
                  variant="outline"
                  leftIcon={<FaHeart color={isWishlisted ? "red" : undefined} />}
                  borderColor={buttonBorderColor}
                  color={isWishlisted ? "red.500" : buttonBg}
                  _hover={{ bg: "gray.100" }}
                  size="lg"
                  width="full"
                  borderRadius="md"
                  onClick={handleWishlistToggle}
                  isLoading={loading}
                >
                  {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                </Button>
              </Box>
            </VStack>
          </Box>
        </GridItem>
      </SimpleGrid>

      {/* Size Chart Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(5px)" />
        <ModalContent borderRadius="lg">
          <ModalHeader 
            borderBottom="1px solid" 
            borderColor={borderColor}
            fontWeight="bold"
            bg={useColorModeValue("gray.50", "gray.900")}
            borderTopRadius="lg"
          >
            Size Chart
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody p={6} display="flex" justifyContent="center">
            <Image
              src={sizeChartImg}
              alt="Size Chart"
              maxWidth="100%"
              borderRadius="md"
              boxShadow="sm"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductDetailPage;