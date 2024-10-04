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

const SignupPage = () => {
  const { setUser, setToken } = useUserStore();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const toast = useToast();

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

    // Create a new object excluding confirmPassword
    const { confirmPassword, ...userData } = formData;

    try {
        const { data } = await axios.post("http://localhost:5170/api/v1/users/register", userData);
        setToken(data.token);
        setUser(data.user);

        toast({
            title: "Signup Successful.",
            description: "You have successfully signed up.",
            status: "success",
            duration: 5000,
            isClosable: true,
        });
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
          Signup
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
                  placeholder="Enter your first name"
                  variant="filled"
                  backgroundColor="gray.100"
                  focusBorderColor="teal.400"
                  _placeholder={{ color: "gray.500" }}
                  css={{ color: "black" }}
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
                  placeholder="Enter your last name"
                  variant="filled"
                  backgroundColor="gray.100"
                  focusBorderColor="teal.400"
                  _placeholder={{ color: "gray.500" }}
                  css={{ color: "black" }}
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
                placeholder="Enter your email"
                variant="filled"
                backgroundColor="gray.100"
                focusBorderColor="teal.400"
                _placeholder={{ color: "gray.500" }}
                css={{ color: "black" }}
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
                placeholder="Enter your password"
                variant="filled"
                backgroundColor="gray.100"
                focusBorderColor="teal.400"
                _placeholder={{ color: "gray.500" }}
                css={{ color: "black" }}
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
                placeholder="Confirm your password"
                variant="filled"
                backgroundColor="gray.100"
                focusBorderColor="teal.400"
                _placeholder={{ color: "gray.500" }}
                css={{ color: "black" }}
              />
            </FormControl>

            <Button type="submit" colorScheme="teal" width="full" mt={4}>
              Signup
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default SignupPage;
