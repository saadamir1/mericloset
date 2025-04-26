import { useEffect, useState } from "react";
import { 
  Box, 
  Heading, 
  Text, 
  Button, 
  VStack, 
  HStack,
  Container,
  Icon,
  keyframes
} from "@chakra-ui/react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { FiAlertTriangle, FiHome, FiRefreshCw } from "react-icons/fi";
import NavBar from "../components/NavBar";

const ErrorPage = () => {
  const error = useRouteError();
  const [countdown, setCountdown] = useState(10);

  // Determine error message based on the type of error
  const errorMessage = isRouteErrorResponse(error)
    ? "The page you're looking for doesn't exist."
    : "An unexpected error occurred. Our team has been notified.";

  // Animation keyframes
  const bounceAnimation = keyframes`
    0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
    40% {transform: translateY(-30px);}
    60% {transform: translateY(-15px);}
  `;

  const fadeIn = keyframes`
    from {opacity: 0;}
    to {opacity: 1;}
  `;

  // Auto-redirect countdown
  useEffect(() => {
    // Set up countdown for auto-redirect
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = "/";
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <NavBar />
      <Container maxW="4xl" py={20}>
        <VStack spacing={8} align="center" textAlign="center">
          {/* Animated error icon */}
          <Box
            animation={`${bounceAnimation} 2s ease infinite`}
            boxSize="100px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={FiAlertTriangle} w={20} h={20} color="red.500" />
          </Box>

          {/* Title with fade-in animation */}
          <Heading
            size="2xl"
            bgGradient="linear(to-r, red.500, purple.500)"
            bgClip="text"
            fontWeight="extrabold"
            animation={`${fadeIn} 1s ease-in`}
          >
            Oops! We hit a roadblock.
          </Heading>

          {/* Error details */}
          <Text fontSize="xl" color="gray.600" maxW="lg">
            {errorMessage}
          </Text>

          {/* Code display if available */}
          {isRouteErrorResponse(error) && error.status !== 404 && (
            <Box
              p={4}
              bg="gray.100"
              rounded="md"
              fontSize="md"
              fontFamily="mono"
              animation={`${fadeIn} 1.5s ease-in`}
            >
              <Text fontWeight="bold">Error {error.status}</Text>
              {error.statusText && <Text>{error.statusText}</Text>}
            </Box>
          )}

          {/* Countdown and action buttons */}
          <Box mt={8} animation={`${fadeIn} 2s ease-in`}>
            <Text mb={4} fontSize="sm">
              Redirecting to homepage in {countdown} seconds...
            </Text>
            <HStack spacing={4} justify="center">
              <Button
                leftIcon={<FiHome />}
                colorScheme="blue"
                size="lg"
                onClick={() => window.location.href = "/"}
                boxShadow="md"
                _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
                transition="all 0.2s"
              >
                Go to Homepage
              </Button>
              <Button
                leftIcon={<FiRefreshCw />}
                colorScheme="purple"
                variant="outline"
                size="lg"
                onClick={() => window.location.reload()}
                _hover={{ transform: "translateY(-2px)" }}
                transition="all 0.2s"
              >
                Try Again
              </Button>
            </HStack>
          </Box>
        </VStack>
      </Container>
    </>
  );
};

export default ErrorPage;