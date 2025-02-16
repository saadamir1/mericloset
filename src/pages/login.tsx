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
  Switch,
  useColorModeValue,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useUserStore from "../userStore";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
  role: string;
}

const LoginPage = () => {
  const { setIsLoggedIn, setUser, setToken, setUserRole } = useUserStore();
  const [loginIdentifier, setloginIdentifier] = useState(""); //email or username
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSeller, setIsSeller] = useState(false);
  const toast = useToast(); 
  const navigate = useNavigate();

  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const headingColor = useColorModeValue("teal.600", "teal.300");
  const inputBg = useColorModeValue("gray.100", "gray.700");
  const borderColor = useColorModeValue("gray.300", "gray.600");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
  
    try {
      const { data } = await axios.post("http://localhost:5170/api/v1/users/login", {
        loginIdentifier,
        password,
        isSeller,
      });
  
      setToken(data.token);
      console.log(data.token);
      setUser(data.user);
      setIsLoggedIn(true);
  
      const decodedToken = jwtDecode<CustomJwtPayload>(data.token);
      const userRole = decodedToken.role;
      setUserRole(userRole);
  
      toast({
        title: "Login Successful",
        description: "You are now logged in.",
        status: "success",
        duration: 1500,
        isClosable: true,
      });
  
      setTimeout(() => {
        setIsLoading(false);
        navigate(isSeller ? "/brand" : "/");
      }, 1500);
      
    } catch (error) {  
      const errorMsg =
        axios.isAxiosError(error) && error.response
          ? error.response.data.message || "Login failed. Please try again."
          : "An unexpected error occurred.";
  
      setErrorMessage(errorMsg);
      setIsLoading(false);
    }
  };
  

  return (
    <Box display="flex" alignItems="center" justifyContent="center" height="90vh">
      <Box p={8} borderRadius="md" boxShadow="lg" backgroundColor={bgColor} width={{ base: "90%", sm: "400px" }} border="1px solid" borderColor={borderColor}>
        <Heading as="h2" size="lg" textAlign="center" mb={6} color={headingColor}>
          Login
        </Heading>
        <Text fontSize="sm" color={textColor} textAlign="center" mb={4}>
          Welcome to MeriCloset. Please enter your credentials.
        </Text>

        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel htmlFor="loginIdentifier" color={headingColor}>Email or Username:</FormLabel>
              <Input
                type="loginIdentifier"
                id="loginIdentifier"
                value={loginIdentifier}
                onChange={(e) => setloginIdentifier(e.target.value)}
                placeholder="zainali"
                variant="filled"
                backgroundColor={inputBg}
                focusBorderColor="teal.400"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="password" color={headingColor}>Password:</FormLabel>
              <Box position="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="xxxxxx"
                  variant="filled"
                  backgroundColor={inputBg}
                  focusBorderColor="teal.400"
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

            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="seller-toggle" mb="0">
                Login as Seller
              </FormLabel>
              <Switch id="seller-toggle" isChecked={isSeller} onChange={() => setIsSeller(!isSeller)} />
            </FormControl>

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
