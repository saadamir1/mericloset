import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  VStack,
  useToast,
  Text,
  HStack,
} from "@chakra-ui/react";
import axios from "axios"; 
import useUserStore from "../userStore";
import { useNavigate } from "react-router-dom";
const baseURL = import.meta.env.VITE_API_BASE_URL;

const SignupPage = () => {
  const { setIsLoggedIn,setUser, setToken } = useUserStore();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const toast = useToast();
    const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error.",
        description: "Passwords do not match.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const { confirmPassword, ...userData } = formData;

    try {
      console.log("Submitting data:", userData);
      const { data } = await axios.post( `${baseURL}/users/register`, userData);
      setToken(data.token);
      setUser(data.user);

      toast({
        title: "Signup Successful.",
        description: "You have successfully signed up.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      console.log("Signup successful:", data);
      setToken(data.token);
      setUser(data.user);
      setIsLoggedIn(true);

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      const errorMsg = axios.isAxiosError(error) && error.response
        ? error.response.data.message || "Signup failed. Please try again."
        : "An unexpected error occurred.";
      toast({
        title: "Error.",
        description: errorMsg,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
      <Box
        p={8}
        borderRadius="md"
        boxShadow="lg"
        backgroundColor="white"
        width={{ base: "90%", sm: "400px" }}
        border="1px solid #e2e8f0"
      >
        <Heading as="h2" size="lg" textAlign="center" mb={6} color="teal.600">
          Register
        </Heading>
        <Text fontSize="sm" color="gray.600" textAlign="center" mb={4}>
          Please fill in the details to create your account.
        </Text>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <HStack spacing={4} width="full">
              <FormControl isRequired>
                <FormLabel htmlFor="firstName" color="teal.600">First Name:</FormLabel>
                <Input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Zain"
                  variant="filled"
                  backgroundColor="gray.100"
                  focusBorderColor="teal.400"
                  _placeholder={{ color: "gray.500", fontStyle: "italic" }}
                  />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="lastName" color="teal.600">Last Name:</FormLabel>
                <Input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Ali"
                  variant="filled"
                  backgroundColor="gray.100"
                  focusBorderColor="teal.400"
                  _placeholder={{ color: "gray.500", fontStyle: "italic" }}
                  />
              </FormControl>
            </HStack>

            <FormControl isRequired>
              <FormLabel htmlFor="email" color="teal.600">Email:</FormLabel>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="zain321@gmail.com"
                variant="filled"
                backgroundColor="gray.100"
                focusBorderColor="teal.400"
                _placeholder={{ color: "gray.500", fontStyle: "italic" }}
                />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="password" color="teal.600">Password:</FormLabel>
              <Input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="xxxxxx"
                variant="filled"
                backgroundColor="gray.100"
                focusBorderColor="teal.400"
                _placeholder={{ color: "gray.500", fontStyle: "italic" }}
                />
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="confirmPassword" color="teal.600">Confirm Password:</FormLabel>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="xxxxxxx"
                variant="filled"
                backgroundColor="gray.100"
                focusBorderColor="teal.400"
                _placeholder={{ color: "gray.500", fontStyle: "italic" }}
                />
            </FormControl>

            <Button type="submit" colorScheme="teal" width="full" mt={4}>
              Signup
            </Button>
            <Text>Or</Text>

          {/* Added button to sign up as a seller */}
          <Button
            variant="outline"
            colorScheme="teal"
            width="full"
            onClick={() => navigate("/register-brand")}
          >
            Sign up as Seller
          </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default SignupPage;
