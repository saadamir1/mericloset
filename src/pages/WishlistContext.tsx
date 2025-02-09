import React from "react";
import { Box, Text, VStack, Button, Image, Flex, useColorMode, Container } from "@chakra-ui/react";
import { useWishlist } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";

const WishlistContent: React.FC = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const textColor = colorMode === "dark" ? "gray.300" : "gray.900";
  const bgColor = colorMode === "dark" ? "gray.800" : "gray.100";
  const boxShadowColor = colorMode === "dark" ? "md" : "lg";

  return (
    <Container maxW="container.md" py={8} textAlign="center">
      <Box p={6} borderRadius="lg" bg={bgColor} boxShadow={boxShadowColor}>
        <Text fontSize="4xl" fontWeight="bold" mb={4} color="teal.500">
          Your Wishlist
        </Text>

        {wishlist.length === 0 ? (
          <VStack spacing={4} p={4} bg={bgColor} borderRadius="lg" boxShadow={boxShadowColor} align="center">
            <Text fontSize="lg" fontWeight="bold" color={textColor}>Your wishlist is empty.</Text>
            <Button colorScheme="teal" size="lg" onClick={() => navigate("/")}>
              Start Adding Items
            </Button>
          </VStack>
        ) : (
          <Flex wrap="wrap" justify="center" gap={6}>
            {wishlist.map((product) => (
              <Box key={product.id} p={4} bg="white" boxShadow={boxShadowColor} borderRadius="md" maxW="sm">
                <Image src={product.images[0]} alt={product.title} borderRadius="md" />
                <Text mt={3} fontSize="lg" fontWeight="bold" color={textColor}>
                  {product.title}
                </Text>
                <Text fontSize="md" color="gray.600">{product.brand}</Text>
                <Text fontWeight="bold" fontSize="xl">Rs. {Math.floor(product.price)}</Text>
                <Button
                  mt={2}
                  colorScheme="red"
                  onClick={() => removeFromWishlist(product.id)}
                >
                  Remove
                </Button>
              </Box>
            ))}
          </Flex>
        )}
      </Box>
    </Container>
  );
};

export default WishlistContent;
