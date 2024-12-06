import { useEffect } from "react";
import { Heading, Text, Box, Button, VStack, useToast } from "@chakra-ui/react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import NavBar from "../components/NavBar";

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
      <Box padding={5} textAlign="center">
        <Heading size="xl" mb={4}>
          Oops! Something went wrong.
        </Heading>
        <Text fontSize="lg" mb={6}>
          {errorMessage}
        </Text>
        <VStack spacing={4}>
          <Button colorScheme="teal" onClick={() => (window.location.href = "/")}>
            Go to Homepage
          </Button>
          <Button colorScheme="red" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </VStack>
      </Box>
    </>
  );
};

export default ErrorPage;