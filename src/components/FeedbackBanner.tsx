import {
  Box,
  Button,
  Center,
  HStack,
  VStack,
  Text,
  Icon,
  useColorModeValue,
  keyframes,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FiMessageCircle, FiUsers, FiTrendingUp } from "react-icons/fi";

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
`;

const FeedbackBanner = () => {
  const bgGradient = useColorModeValue(
    "linear(135deg, #667eea 0%, #764ba2 100%)",
    "linear(135deg, #2D3748 0%, #4A5568 100%)"
  );

  return (
    <Box
      position="relative"
      bgGradient={bgGradient}
      color="white"
      py={10}
      px={4}
      mt={12}
      mb={4}
      overflow="hidden"
    >
      {/* Floating decorative elements */}
      <Box
        position="absolute"
        top="20px"
        right="10%"
        width="80px"
        height="80px"
        borderRadius="full"
        bg="rgba(255,255,255,0.1)"
        animation={`${float} 6s ease-in-out infinite`}
      />
      
      <Center>
        <VStack spacing={6} textAlign="center" maxW="600px" position="relative" zIndex={1}>
          {/* Icons */}
          <HStack spacing={4}>
            <Icon as={FiUsers} boxSize={6} color="blue.200" />
            <Icon as={FiTrendingUp} boxSize={6} color="purple.200" />
            <Icon as={FiMessageCircle} boxSize={6} color="pink.200" />
          </HStack>

          {/* Main Content */}
          <VStack spacing={3}>
            <Text
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="bold"
              lineHeight="shorter"
            >
              Help Us Build Better
            </Text>
            <Text
              fontSize={{ base: "md", md: "lg" }}
              opacity={0.9}
              lineHeight="relaxed"
            >
              Share your experience exploring brands and help us improve our platform
            </Text>
          </VStack>

          {/* CTA Button */}
          <Link to="/feedback">
            <Button
              size="lg"
              px={8}
              py={6}
              fontSize="md"
              fontWeight="semibold"
              bg="white"
              color="purple.600"
              borderRadius="full"
              boxShadow="0 4px 20px rgba(0,0,0,0.2)"
              leftIcon={<FiMessageCircle />}
              _hover={{
                bg: "gray.50",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
              }}
              transition="all 0.3s ease"
            >
              Share Feedback
            </Button>
          </Link>
        </VStack>
      </Center>
    </Box>
  );
};

export default FeedbackBanner;