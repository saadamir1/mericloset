import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  GridItem,
  Image,
  Text,
  Flex,
  Spinner,
  Alert,
  AlertIcon,
  Button,
  Heading,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { API_BASE, mediaUrl } from "../config";
import useUserStore from "../userStore";

interface Product {
  _id: string;
  title?: string;
  name?: string;
  description?: string;
  images?: string[];
  imageUrl?: string;
  slug?: string;
}

const RecommendationsPage: React.FC = () => {
  const { userId: paramUserId } = useParams();
  const storeUser = useUserStore((s) => s.user);
  const userId = paramUserId || storeUser.id || storeUser._id;

  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchRecommendations = async (pageNum: number) => {
    if (!userId) {
      setError("Sign in to see your AI picks.");
      return;
    }

    setLoading(true);
    setError(null);
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${API_BASE}/intelligence/for-you/${userId}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        },
      );
      const data = await response.json();

      if (response.ok && Array.isArray(data.products)) {
        setRecommendedProducts(data.products);
        setTotalPages(1);
        return;
      }

      const legacy = await fetch(
        `${API_BASE}/recommendations/user/${userId}?page=${pageNum}&limit=10`,
        { headers: token ? { Authorization: `Bearer ${token}` } : {} },
      );
      const legacyData = await legacy.json();
      if (legacy.ok && Array.isArray(legacyData.products)) {
        setRecommendedProducts(legacyData.products);
        setTotalPages(legacyData.totalPages || 1);
      } else {
        setError(legacyData.message || data.message || "Failed to load recommendations.");
      }
    } catch {
      setError("Could not reach the recommendation service.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations(page);
  }, [userId, page]);

  const label = (p: Product) => p.title || p.name || "Product";
  const img = (p: Product) => mediaUrl(p.imageUrl || p.images?.[0] || "");

  return (
    <Box px={{ base: 4, md: 8 }} py={8} maxW="1400px" mx="auto">
      <Heading size="lg" mb={2}>
        For you
      </Heading>
      <Text color="gray.500" mb={6}>
        AI picks based on your taste and activity.
      </Text>

      {loading && (
        <Flex justify="center" align="center" height="40vh">
          <Spinner size="xl" color="teal.400" />
        </Flex>
      )}

      {error && (
        <Alert status="warning" mb={4} borderRadius="md">
          <AlertIcon />
          {error}
        </Alert>
      )}

      {!loading && recommendedProducts.length > 0 && (
        <>
          <Grid templateColumns="repeat(auto-fill, minmax(220px, 1fr))" gap={5}>
            {recommendedProducts.map((product) => (
              <LinkBox
                key={product._id}
                as={GridItem}
                borderWidth="1px"
                borderRadius="xl"
                overflow="hidden"
                bg="whiteAlpha.50"
                _hover={{ shadow: "lg", borderColor: "teal.400" }}
                transition="all .2s"
              >
                <Image
                  src={img(product) || undefined}
                  alt={label(product)}
                  h="220px"
                  w="100%"
                  objectFit="cover"
                  fallbackSrc="https://via.placeholder.com/300x220?text=MeriCloset"
                />
                <Box p={4}>
                  <LinkOverlay
                    as={RouterLink}
                    to={product.slug ? `/products/${product.slug}` : `/products/${product._id}`}
                    fontWeight="semibold"
                    fontSize="md"
                  >
                    {label(product)}
                  </LinkOverlay>
                  {product.description && (
                    <Text fontSize="sm" color="gray.500" noOfLines={2} mt={1}>
                      {product.description}
                    </Text>
                  )}
                </Box>
              </LinkBox>
            ))}
          </Grid>

          <Flex justify="center" mt={8} gap={4} align="center">
            <Button onClick={() => setPage((p) => Math.max(p - 1, 1))} isDisabled={page === 1}>
              Previous
            </Button>
            <Text fontWeight="medium">
              Page {page} of {totalPages}
            </Text>
            <Button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              isDisabled={page === totalPages}
            >
              Next
            </Button>
          </Flex>
        </>
      )}

      {!loading && !error && recommendedProducts.length === 0 && (
        <Text>No recommendations yet. Browse a few products and Milo will learn your style.</Text>
      )}
    </Box>
  );
};

export default RecommendationsPage;
