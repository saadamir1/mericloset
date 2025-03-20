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
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

interface Product {
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

  const fetchRecommendations = async () => {
    if (!userId) {
      setError("User ID is missing in the URL.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/v1/tracking/recommendations/${userId}`);
      const data = await response.json();

      if (response.ok) {
        if (Array.isArray(data)) {
          setRecommendedProducts(data);
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
    fetchRecommendations();
  }, [userId]);

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
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          {recommendedProducts.map((product, index) => (
            <GridItem
              key={index}
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
      )}

      {!loading && !error && recommendedProducts.length === 0 && (
        <Text>No recommendations available at the moment.</Text>
      )}
    </Box>
  );
};

export default RecommendationsPage;
