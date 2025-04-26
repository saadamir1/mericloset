// BrandProductPage.tsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Avatar,
  Text,
  HStack,
  VStack,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import userStore from "../../userStore";

interface Brand {
  _id: string;
  name: string;
}

interface Product {
  _id: string;
  title: string;
  price: number;
  description?: string;
  images: string[];
  brand: Brand;
}

const BrandProductPage: React.FC = () => {
  const { user } = userStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBrandProducts = async () => {
    try {
      console.log("Logged-in user:", user);
      const brandId = "67d345b425b725146094de0b"; // Hardcoded for demo/debugging

      console.log("Using brand ID to fetch products:", brandId);
      const res = await fetch(`http://localhost:5170/api/v1/products?brandID=${brandId}`);

      if (!res.ok) throw new Error("API request failed");

      const data = await res.json();
      console.log("Fetched product response:", data);

      const productsArray = Array.isArray(data.results) ? data.results : [];
      setProducts(productsArray);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to fetch products. Please check your server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrandProducts();
  }, [user]);

  return (
    <Box p={6} bg="gray.50" minHeight="100vh">
      <Heading mb={6}>My Products</Heading>
      {loading ? (
        <HStack>
          <Spinner />
          <Text>Loading...</Text>
        </HStack>
      ) : error ? (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      ) : products.length === 0 ? (
        <Text>No products added by your brand yet.</Text>
      ) : (
        <Box overflowX="auto">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Product</Th>
                <Th>Description</Th>
                <Th>Price</Th>
                <Th>Brand</Th>
              </Tr>
            </Thead>
            <Tbody>
              {products.map((product) => (
                <Tr key={product._id}>
                  <Td>
                    <HStack>
                      <Avatar
                        size="sm"
                        src={
                          product.images[0]?.startsWith("http")
                            ? product.images[0]
                            : `http://localhost:5170${product.images[0]}`
                        }
                        name={product.title}
                      />
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="medium">{product.title}</Text>
                        <Text fontSize="xs" color="gray.500">
                          {product._id.slice(0, 8)}...
                        </Text>
                      </VStack>
                    </HStack>
                  </Td>
                  <Td>{product.description || "—"}</Td>
                  <Td>${product.price.toFixed(2)}</Td>
                  <Td>{product.brand?.name || "—"}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </Box>
  );
};

export default BrandProductPage;
