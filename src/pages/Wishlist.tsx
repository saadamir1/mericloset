import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  VStack,
  Button,
  Icon,
  Image,
  Grid,
  GridItem,
  useColorMode,
  Container,
  Spinner,
  Heading,
  Badge,
  Flex,
} from "@chakra-ui/react";
import { FaHeart, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import greenAnimated from "../assets/greenanimated.mp4";

// Define the full Product schema structure
interface Product {
  _id: string;
  title: string;
  brand: string;
  price: number;
  description?: string;
  images: string[];
  category?: string;
  stockStatus?: string;
}

// Define the WishlistItem structure
interface WishlistItem {
  _id: string;
  product: Product;
}

const WishlistPage: React.FC = () => {
  const { colorMode } = useColorMode();
  const textColor = colorMode === "dark" ? "gray.300" : "gray.900";
  const bgColor = colorMode === "dark" ? "gray.800" : "gray.100";
  const boxShadowColor = colorMode === "dark" ? "md" : "lg";
  const highlightColor = colorMode === "dark" ? "teal.300" : "teal.500";
  const secondaryTextColor = colorMode === "dark" ? "gray.400" : "gray.600";
  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // ✅ **Fetch Wishlist Only Once on Page Load**
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const { data } = await axios.get<WishlistItem[]>(
          "http://localhost:5170/api/v1/favorites/user"
        );
        setWishlist(data);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []); // ✅ Empty dependency array ensures this runs only once

  return (
    <Container maxW="container.xl" py={8}>
      <Box p={6} borderRadius="lg" bg={bgColor} boxShadow={boxShadowColor} textAlign="center">
        <Heading fontSize="3xl" fontWeight="bold" mb={4} color={highlightColor}>
          My Wishlist
        </Heading>

        {wishlist.length === 0 && (
  <Flex justify="center" align="center" width="100%">
    <Box mb={4} borderRadius="lg" overflow="hidden" boxShadow="lg" width="100%" maxW="450px">
      <video width="100%" autoPlay loop muted>
        <source src={greenAnimated} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </Box>
  </Flex>
)}


        {loading ? (
          <Spinner size="xl" color="teal.500" />
        ) : wishlist.length === 0 ? (
          <VStack spacing={4} p={6} bg={bgColor} borderRadius="lg" boxShadow={boxShadowColor} w="full">
            <Icon as={FaHeart} color="teal.400" boxSize={14} />
            <Text fontSize="lg" fontWeight="bold" color={textColor}>
              Your wishlist is empty.
            </Text>
            <Text fontSize="md" color={secondaryTextColor} maxW="sm">
              Save your favorite items by tapping the heart icon and build your dream collection!
            </Text>
            <Button colorScheme="teal" size="lg" borderRadius="full" px={8} onClick={() => navigate("/")}>
              Browse Products
            </Button>
          </VStack>
        ) : (
          <Grid templateColumns="repeat(auto-fill, minmax(280px, 1fr))" gap={6} mt={6}>
            {wishlist.map((item) => (
              <GridItem
                key={item.product._id}
                bg={colorMode === "dark" ? "gray.700" : "white"}
                boxShadow="lg"
                borderRadius="lg"
                p={4}
                transition="all 0.3s ease"
                _hover={{ transform: "scale(1.02)", boxShadow: "xl" }}
              >
                <Image
                  src={item.product.images.length > 0 ? item.product.images[0] : "https://via.placeholder.com/200"}
                  alt={item.product.title}
                  borderRadius="lg"
                  height="220px"
                  objectFit="cover"
                  w="full"
                />
                <Box mt={3}>
                  <Text fontSize="lg" fontWeight="bold" color={textColor}>
                    {item.product.title}
                  </Text>
                  <Badge colorScheme="purple" mt={1} fontSize="sm">
                    {item.product.brand}
                  </Badge>
                  <Box height="50px" overflow="hidden" mt={2}>
                    <Text fontSize="sm" color={secondaryTextColor}>
                      {item.product.description?.substring(0, 60)}...
                    </Text>
                  </Box>
                  <Text fontWeight="bold" fontSize="xl" color={highlightColor} mt={2}>
                    Rs. {item.product.price.toFixed(2)}
                  </Text>
                  <Button
                    leftIcon={<FaTrash />}
                    colorScheme="red"
                    size="sm"
                    mt={4}
                    w="full"
                    borderRadius="full"
                    onClick={async () => {
                      try {
                        await axios.delete(
                          `http://localhost:5170/api/v1/favorites/remove/${item.product._id}`
                        );
                        setWishlist((prev) => prev.filter((fav) => fav.product._id !== item.product._id));
                      } catch (error) {
                        console.error("Error removing favorite:", error);
                      }
                    }}
                  >
                    Remove
                  </Button>
                </Box>
              </GridItem>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default WishlistPage;
