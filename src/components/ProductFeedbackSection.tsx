import {
  Box,
  Button,
  HStack,
  VStack,
  Text,
  Icon,
  useColorModeValue,
  Divider,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FiEdit3, FiMessageSquare, FiStar } from "react-icons/fi";

interface ProductFeedbackSectionProps {
  productId: string;
}

const ProductFeedbackSection = ({ productId }: ProductFeedbackSectionProps) => {
  const cardBg = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Box
      bg={cardBg}
      border="1px"
      borderColor={borderColor}
      borderRadius="lg"
      p={5}
      mt={6}
    >
      <VStack spacing={4} align="stretch">
        <Box textAlign="center">
          <Text fontSize="md" fontWeight="semibold" mb={1}>
            Share Your Experience
          </Text>
          <Text fontSize="sm" color={textColor}>
            Help other users and improve our platform
          </Text>
        </Box>

        <Divider />

        <HStack spacing={3} justify="center" wrap="wrap">
          {/* Product Review Button */}
          <Link to={`/product-review/${productId}`}>
            <Button
              leftIcon={<Icon as={FiStar} />}
              colorScheme="purple"
              variant="solid"
              size="md"
              borderRadius="md"
              _hover={{
                transform: "translateY(-1px)",
                boxShadow: "md",
              }}
              transition="all 0.2s"
            >
              Write Review
            </Button>
          </Link>

          {/* General Feedback Button */}
          <Link to="/feedback">
            <Button
              leftIcon={<Icon as={FiMessageSquare} />}
              colorScheme="teal"
              variant="outline"
              size="md"
              borderRadius="md"
              _hover={{
                transform: "translateY(-1px)",
                bg: "teal.50",
              }}
              transition="all 0.2s"
            >
              Platform Feedback
            </Button>
          </Link>
        </HStack>
      </VStack>
    </Box>
  );
};

export default ProductFeedbackSection;