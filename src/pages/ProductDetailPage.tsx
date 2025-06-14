import { useState, useEffect, useRef } from "react";
import {
  Box,
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
  useColorModeValue,
  Image,
  Flex,
  Skeleton,
  Alert,
  AlertIcon,
  AlertTitle,
  Divider,
  useToast,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  HStack,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { FaRulerCombined, FaHeart } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import useProduct from "../hooks/useProduct";
import ProductAttributes from "../components/ProductAttributes";
import ImageZoom from "../components/ImageZoom";
import sizeChartImg from "../assets/shalwarkameezsize.jpg";
import userStore from "../userStore";
import axios from "axios";
const baseURL = import.meta.env.VITE_API_BASE_URL;

interface RecommendedProduct {
  _id: string;
  title: string;
  price: number;
  images: string[];
  slug?: string;
}

const ProductDetailPage = () => {
  const { slug } = useParams();
  const { data: product, isLoading, error } = useProduct(slug!);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedThumbnailIndex, setSelectedThumbnailIndex] = useState<number>(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState<number>(1);
  const hasFetched = useRef(false);
  const toast = useToast();
  const { user } = userStore();
  const navigate = useNavigate();
  const [recommendedProducts, setRecommendedProducts] = useState<RecommendedProduct[]>([]);
  const [recommendationsLoading, setRecommendationsLoading] = useState(true);

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const themeColor = useColorModeValue("green.500", "green.300");

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
        const { data } = await axios.get(`${baseURL}/favorites/user/${user.id}`);
        setIsWishlisted(data.some((fav: any) => fav.product._id === product.id));
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };
    fetchFavorites();
  }, [product, user]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!product?.id) return;
      try {
        const { data } = await axios.get(`${baseURL}/products/${product.id}/recommendations-hybrid`);
        console.log("Recommended Products:", data);
        setRecommendedProducts(data);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        setRecommendationsLoading(false);
      }
    };
    fetchRecommendations();
  }, [product]);

  const handleThumbnailClick = (image: string, index: number) => {
    setMainImage(image);
    setSelectedThumbnailIndex(index);
  };

  const handleBuyNow = () => {
    if (!product) return;
    const order = {
      productId: product.id,
      title: product.title,
      price: product.price,
      quantity,
      image: product.images[0],
    };
    localStorage.setItem("checkout_order", JSON.stringify(order));
    navigate("/checkout");
  };

  const handleWishlistToggle = async () => {
    if (!user || !user.id || !product?.id) {
      toast({ title: "Please log in to manage your wishlist.", status: "error", duration: 2000, isClosable: true });
      return;
    }
    try {
      if (!isWishlisted) {
        await axios.post(`${baseURL}/favorites/add`, { userId: user.id, productId: product.id });
        setIsWishlisted(true);
        toast({ title: "Added to wishlist", status: "success", duration: 2000, isClosable: true });
      } else {
        await axios.delete(`${baseURL}/favorites/remove/${product.id}/${user.id}`);
        setIsWishlisted(false);
        toast({ title: "Removed from wishlist", status: "info", duration: 2000, isClosable: true });
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
      toast({ title: "Error updating wishlist", status: "error", duration: 2000, isClosable: true });
    }
  };

  const handleViewProduct = (slugOrId: string) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`/products/${slugOrId}`);
  };

  if (isLoading) {
    return (
      <Box padding={5}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          <Skeleton height="400px" borderRadius="lg" />
          <Skeleton height="400px" borderRadius="lg" />
        </SimpleGrid>
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Alert status="error" flexDirection="column" alignItems="center" justifyContent="center" height="200px" borderRadius="lg" margin={5}>
        <AlertIcon />
        <AlertTitle>Product Not Available</AlertTitle>
      </Alert>
    );
  }

  return (
    <Box p={{ base: 4, md: 6 }}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
        <Box>
          <ImageZoom src={mainImage || ""} alt={product.title} />
          <Flex mt={4} gap={2} overflowX="auto" pb={2}>
            {product.images.map((image, index) => (
              <Box key={index} cursor="pointer" onClick={() => handleThumbnailClick(image, index)}>
                <Image src={image} width="80px" height="80px" borderRadius="md" objectFit="cover" border="2px solid" borderColor={selectedThumbnailIndex === index ? "green.500" : "transparent"} />
              </Box>
            ))}
          </Flex>
        </Box>
        <Box>
          <Heading size="lg">{product.title}</Heading>
          <Text mt={2} color="gray.600">{product.description}</Text>
          <ProductAttributes product={product} />
          <Divider my={4} />

          <HStack mt={4} align="flex-end">
            <Box>
              <Text fontWeight="bold" mb={1}>Quantity</Text>
              <NumberInput size="md" maxW="100px" min={1} value={quantity} onChange={(val) => setQuantity(parseInt(val))} focusBorderColor={themeColor} borderColor={themeColor}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Box>
            <Button colorScheme="blue" onClick={handleBuyNow}>Buy Now</Button>
          </HStack>

          <Button onClick={onOpen} leftIcon={<FaRulerCombined />} variant="outline" colorScheme="green" mt={4}>Size Chart</Button>
          <Button onClick={handleWishlistToggle} leftIcon={<FaHeart color={isWishlisted ? "red" : undefined} />} variant="outline" colorScheme={isWishlisted ? "red" : "green"} mt={4}>
            {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          </Button>
        </Box>
      </SimpleGrid>

      {/* Modal for Size Chart */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent borderRadius="lg">
          <ModalHeader borderBottom="1px solid" borderColor={borderColor}>Size Chart</ModalHeader>
          <ModalCloseButton />
          <ModalBody p={6} display="flex" justifyContent="center">
            <Image src={sizeChartImg} alt="Size Chart" maxW="100%" />
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Recommended Products Section */}
      <Box mt={16} position="relative" textAlign="center">
        <Heading as="h2" size="lg" mb={6}>Recommended For You</Heading>
        {recommendationsLoading ? (
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={5}>
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} height="250px" borderRadius="lg" />
            ))}
          </SimpleGrid>
        ) : (
          <Box position="relative">
            <Swiper
              slidesPerView={2}
              spaceBetween={20}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              navigation={{ nextEl: ".swiper-button-next-custom", prevEl: ".swiper-button-prev-custom" }}
              modules={[Navigation, Autoplay]}
              breakpoints={{ 640: { slidesPerView: 2 }, 768: { slidesPerView: 3 }, 1024: { slidesPerView: 4 } }}
            >
              {recommendedProducts.map((rec) => (
                <SwiperSlide key={rec._id}>
                  <Box border="1px solid" borderColor={borderColor} borderRadius="lg" p={3} bg={cardBg} h="340px" display="flex" flexDirection="column" justifyContent="space-between" alignItems="center" transition="transform 0.3s ease" _hover={{ transform: "scale(1.05)" }}>
                    <Image src={rec.images[0]} height="200px" width="100%" objectFit="contain" borderRadius="md" />
                    <Text fontWeight="bold" noOfLines={2} textAlign="center">{rec.title}</Text>
                    <Text color="green.500" fontWeight="semibold">Rs. {rec.price}</Text>
                    <Button size="sm" colorScheme="green" mt={2} onClick={() => handleViewProduct(rec.slug ?? rec._id)}>View Product</Button>
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
            <Button className="swiper-button-prev-custom" position="absolute" top="50%" left="-5" zIndex={10} transform="translateY(-50%)" bg="green.500" color="white" borderRadius="full" _hover={{ bg: "green.600" }}>‹</Button>
            <Button className="swiper-button-next-custom" position="absolute" top="50%" right="-5" zIndex={10} transform="translateY(-50%)" bg="green.500" color="white" borderRadius="full" _hover={{ bg: "green.600" }}>›</Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProductDetailPage; 
