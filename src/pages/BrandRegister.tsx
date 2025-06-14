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
} from "@chakra-ui/react";
import axios from "axios"; 
import { useNavigate } from "react-router-dom";
import useUserStore from "../userStore";
const baseURL = import.meta.env.VITE_API_BASE_URL;

const RegisterBrandPage = () => {
    const { setIsLoggedIn,setUser, setToken } = useUserStore();
  const [formData, setFormData] = useState({
    brandName: "",
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
        title: "Error",
        description: "Passwords do not match.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const { confirmPassword, ...brandData } = formData;

    try {
      console.log("Submitting brand data:", brandData);
      const { data }  = await axios.post(`${baseURL}/users/register-brand`, brandData);
      
      toast({
        title: "Registration Successful",
        description: "Brand registered successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setToken(data.token);
      setUser(data.user);
      setIsLoggedIn(true);
      
      setTimeout(() => {
        navigate("/brand");
      }, 1500);
    } catch (error) {
      const errorMsg = axios.isAxiosError(error) && error.response
        ? error.response.data.message || "Registration failed. Try again."
        : "An unexpected error occurred.";
      toast({
        title: "Error",
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
          Register Brand
        </Heading>
        <Text fontSize="sm" color="gray.600" textAlign="center" mb={4}>
          Fill in the details to register your brand.
        </Text>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel htmlFor="brandName" color="teal.600">Brand Name:</FormLabel>
              <Input
                type="text"
                id="brandName"
                name="brandName"
                value={formData.brandName}
                onChange={handleChange}
                placeholder="Enter brand name"
                variant="filled"
                backgroundColor="gray.100"
                focusBorderColor="teal.400"
                _placeholder={{ color: "gray.500" }}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="email" color="teal.600">Email:</FormLabel>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                variant="filled"
                backgroundColor="gray.100"
                focusBorderColor="teal.400"
                _placeholder={{ color: "gray.500" }}
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
                placeholder="Enter password"
                variant="filled"
                backgroundColor="gray.100"
                focusBorderColor="teal.400"
                _placeholder={{ color: "gray.500" }}
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
                placeholder="Confirm password"
                variant="filled"
                backgroundColor="gray.100"
                focusBorderColor="teal.400"
                _placeholder={{ color: "gray.500" }}
              />
            </FormControl>
            
            <Button type="submit" colorScheme="teal" width="full" mt={4}>Register</Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default RegisterBrandPage;
