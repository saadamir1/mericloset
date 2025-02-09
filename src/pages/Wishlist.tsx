import React from "react";
import { Box, Text, VStack, Button, Icon, Image, Flex, useColorMode, Container } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import greenAnimated from "../assets/greenanimated.mp4";
/*see this*/

const WishlistPage: React.FC = () => {
  const isWishlistEmpty = true;
  const { colorMode } = useColorMode();
  const textColor = colorMode === "dark" ? "gray.300" : "gray.900";
  const bgColor = colorMode === "dark" ? "gray.800" : "gray.100";
  const boxShadowColor = colorMode === "dark" ? "md" : "lg";
  const highlightColor = colorMode === "dark" ? "teal.300" : "teal.500";
  const secondaryTextColor = colorMode === "dark" ? "gray.400" : "gray.600";
  const navigate = useNavigate();

  return (
    <Container maxW="container.md" py={8} textAlign="center">
      <Box p={6} borderRadius="lg" bg={bgColor} boxShadow={boxShadowColor} display="flex" flexDirection="column" alignItems="center">
        <Text fontSize="4xl" fontWeight="bold" mb={4} color={highlightColor}>
          Ready to make a wish?
        </Text>
        <Box mb={4} borderRadius="lg" overflow="hidden" boxShadow="lg" width="100%" maxW="350px">
          <video width="100%" autoPlay loop muted>
            <source src={greenAnimated} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Box>
        {isWishlistEmpty ? (
          <VStack spacing={4} p={4} bg={bgColor} borderRadius="lg" boxShadow={boxShadowColor} w="full" alignItems="center">
            <Icon as={FaHeart} color="teal.400" boxSize={12} />
            <Text fontSize="lg" color={textColor} fontWeight="bold">
              Your wishlist is empty.
            </Text>
            <Text fontSize="md" color={secondaryTextColor} maxW="sm" textAlign="center">
              Save your favorite items by tapping the heart icon and build your dream collection!
            </Text>
            <Button colorScheme="teal" size="lg" borderRadius="full" px={8} onClick={() => navigate("/")}> 
              Start Adding Items
            </Button>
          </VStack>
        ) : (
          <Flex wrap="wrap" justify="center" gap={6}>
            <Box p={4} bg={colorMode === "dark" ? "gray.700" : "white"} boxShadow={boxShadowColor} borderRadius="md" w="full" maxW="sm">
              <Image src="https://via.placeholder.com/150" alt="Wishlist item" borderRadius="md" />
              <Text mt={3} fontSize="lg" fontWeight="bold" color={textColor}>
                Sample Wishlist Item
              </Text>
            </Box>
          </Flex>
        )}
      </Box>
    </Container>
  );
};

export default WishlistPage;
