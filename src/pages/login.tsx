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
import useUserStore from "../userStore";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
  role: string; // Add the role property
}

const LoginPage = () => {
  const { setIsLoggedIn, setUser, setToken, setUserRole } = useUserStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const toast = useToast(); 
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    setErrorMessage(""); // Reset error message
    setIsLoggedIn(true);

    try {
      const { data } = await axios.post("http://localhost:5170/api/v1/users/login", {
        email,
        password,
      });

      setToken(data.token);
      setUser(data.user);

      // Decode the token to extract the user role
      const decodedToken = jwtDecode<CustomJwtPayload>(data.token); 
      const userRole = decodedToken.role; 
      setUserRole(userRole); 

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
    <Box display="flex" alignItems="center" justifyContent="center" height="90vh">
      <Box p={8} borderRadius="md" boxShadow="lg" backgroundColor="#ffffff" width={{ base: "90%", sm: "400px" }} border="1px solid #e2e8f0">
        <Heading as="h2" size="lg" textAlign="center" mb={6} color="teal.600">
          Login
        </Heading>
        <Text fontSize="sm" color="#4a5568" textAlign="center" mb={4}>
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
                backgroundColor="#f7fafc"
                focusBorderColor="teal.400"
                _placeholder={{ color: "#a0aec0" }} // fixed color in both light and dark mode
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
                  backgroundColor="#f7fafc"
                  focusBorderColor="teal.400"
                  _placeholder={{ color: "#a0aec0" }} // fixed color for placeholder
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
