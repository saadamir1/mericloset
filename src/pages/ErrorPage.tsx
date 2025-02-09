import { useEffect } from "react";
import { Heading, Text, Box, Button, VStack, useToast, Flex } from "@chakra-ui/react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import NavBar from "../components/NavBar";
import errorVideo from "../assets/PageError.mp4"; 

const ErrorPage = () => {
  const error = useRouteError();
  const toast = useToast();

  const errorMessage = isRouteErrorResponse(error)
    ? "This page does not exist."
    : "An unexpected error occurred.";

  useEffect(() => {
    toast({
      title: "Oops!",
      description: errorMessage,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }, [toast, errorMessage]);

  return (
    <>
      <NavBar />
      <Flex
        direction="column"
        align="center"
        justify="center"
        minH="100vh"
        padding={5}
        textAlign="center"
      >
        <Heading size="xl" mb={4}>
          Oops! Something went wrong.
        </Heading>
        <Text fontSize="lg" mb={6}>
          {errorMessage}
        </Text>

        {/* Video Container */}
        <Box
          maxW="400px" // Adjust the size of the video
          mb={6}
          borderRadius="lg"
          overflow="hidden"
          boxShadow="lg"
        >
          <video autoPlay loop muted style={{ width: "100%" }}>
            <source src={errorVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Box>

        {/* Buttons */}
        <VStack spacing={4}>
          <Button colorScheme="teal" onClick={() => (window.location.href = "/")}>
            Go to Homepage
          </Button>
          <Button colorScheme="red" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </VStack>
      </Flex>
    </>
  );
};

export default ErrorPage;