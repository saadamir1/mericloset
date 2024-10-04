import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  VStack,
  Text,
  IconButton,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const toast = useToast(); // Initialize toast hook
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    setErrorMessage(""); // Reset error message

    try {
      const { data } = await axios.post("http://localhost:5170/api/v1/users/login", {
        email,
        password,
      });

      // Store token in localStorage for tokenization
      localStorage.setItem("token", data.token);

      // Show success toast immediately
      toast({
        title: "Login Successful",
        description: "You are now logged in.",
        status: "success",
        duration: 1500, // Display for 1.5 seconds
        isClosable: true,
      });

      // Simulate a delay of 1.5 seconds before redirecting
      setTimeout(() => {
        setIsLoading(false);
        navigate("/"); // Redirect to home page
      }, 1500);
    } catch (error) {
      const errorMsg =
        axios.isAxiosError(error) && error.response
          ? error.response.data.message || "Login failed. Please try again."
          : "An unexpected error occurred.";
      setErrorMessage(errorMsg);
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
      <Box p={8} borderRadius="md" boxShadow="lg" backgroundColor="white" width={{ base: "90%", sm: "400px" }} border="1px solid #e2e8f0">
        <Heading as="h2" size="lg" textAlign="center" mb={6} color="teal.600">
          Login
        </Heading>
        <Text fontSize="sm" color="gray.600" textAlign="center" mb={4}>
          Welcome to MeriCloset. Please enter your credentials.
        </Text>

        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel htmlFor="email" color="teal.600">
                Email:
              </FormLabel>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                variant="filled"
                backgroundColor="gray.100"
                focusBorderColor="teal.400"
                _placeholder={{ color: "gray.500" }}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="password" color="teal.600">
                Password:
              </FormLabel>
              <Box position="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  variant="filled"
                  backgroundColor="gray.100"
                  focusBorderColor="teal.400"
                  _placeholder={{ color: "gray.500" }}
                />
                <IconButton
                  position="absolute"
                  right="3"
                  top="50%"
                  transform="translateY(-50%)"
                  variant="link"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((prev) => !prev)}
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                />
              </Box>
            </FormControl>

            {/* Display error message if login fails */}
            {errorMessage && (
              <Text color="red.500" fontSize="sm" textAlign="center">
                {errorMessage}
              </Text>
            )}

            <Button type="submit" colorScheme="teal" width="full" mt={4} disabled={isLoading}>
              {isLoading ? <Spinner size="sm" /> : "Login"}
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default LoginPage;
