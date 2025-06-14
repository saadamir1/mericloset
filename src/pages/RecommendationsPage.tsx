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
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

interface Product {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
}

interface RouteParams extends Record<string, string | undefined> {
  userId?: string;
}

const RecommendationsPage: React.FC = () => {
  const { userId } = useParams<RouteParams>();
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchRecommendations = async (page: number) => {
    if (!userId) {
      setError("User ID is missing in the URL.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/v1/recommendations/user/${userId}?page=${page}&limit=10`);
      const data = await response.json();

      if (response.ok) {
        if (Array.isArray(data.products)) {
          setRecommendedProducts(data.products);
          setTotalPages(data.totalPages || 1);
        } else {
          setError("Unexpected data format received.");
        }
      } else {
        setError(data.message || "Failed to load recommendations.");
      }
    } catch (err) {
      setError("An error occurred while fetching recommendations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations(page);
  }, [userId, page]);

  // ✅ Debug log: show page and product IDs in console
  useEffect(() => {
    console.log("=== FRONTEND RECOMMENDATIONS ===");
    console.log("Page:", page);
    console.log("Products:", recommendedProducts.map(p => `${p._id} - ${p.name}`));
    console.log("=================================");
  }, [recommendedProducts]);

  return (
    <Box padding={4}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Product Recommendations
      </Text>

      {loading && (
        <Flex justify="center" align="center" height="50vh">
          <Spinner size="xl" />
        </Flex>
      )}

      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}

      {!loading && !error && recommendedProducts.length > 0 && (
        <>
          <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
            {recommendedProducts.map((product) => (
              <GridItem
                key={product._id}
                borderWidth="1px"
                borderRadius="md"
                padding={4}
                _hover={{ shadow: "md" }}
              >
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  boxSize="200px"
                  objectFit="cover"
                  mb={3}
                />
                <Text fontSize="lg" fontWeight="bold">
                  {product.name}
                </Text>
                <Text fontSize="sm">{product.description}</Text>
              </GridItem>
            ))}
          </Grid>

          <Flex justify="center" mt={6} gap={4}>
            <Button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              isDisabled={page === 1}
            >
              Previous
            </Button>
            <Text fontWeight="medium">Page {page} of {totalPages}</Text>
            <Button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              isDisabled={page === totalPages}
            >
              Next
            </Button>
          </Flex>
        </>
      )}

      {!loading && !error && recommendedProducts.length === 0 && (
        <Text>No recommendations available at the moment.</Text>
      )}
    </Box>
  );
};

export default RecommendationsPage;
