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
  IconButton,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"; // Import icons for showing/hiding password

const SignupPage = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>(""); // State for phone number
  const [showPassword, setShowPassword] = useState<boolean>(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false); // State for confirm password visibility
  const toast = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: "Error.",
        description: "Passwords do not match.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Phone Number:", phoneNumber); // Log the phone number
    console.log("Email:", email);
    console.log("Password:", password);

    toast({
      title: "Signup Successful.",
      description: "You have successfully signed up.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      padding={0} // Ensure no padding around the Box
      margin={0} // Ensure no margin around the Box
    >
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
                <FormLabel htmlFor="first-name" color="teal.600">
                  First Name:
                </FormLabel>
                <Input
                  type="text"
                  id="first-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter your first name"
                  variant="filled"
                  backgroundColor="gray.100"
                  focusBorderColor="teal.400"
                  _placeholder={{ color: "gray.500" }}
                  css={{
                    color: "black", // Set text color to black
                  }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="last-name" color="teal.600">
                  Last Name:
                </FormLabel>
                <Input
                  type="text"
                  id="last-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter your last name"
                  variant="filled"
                  backgroundColor="gray.100"
                  focusBorderColor="teal.400"
                  _placeholder={{ color: "gray.500" }}
                  css={{
                    color: "black", // Set text color to black
                  }}
                />
              </FormControl>
            </HStack>
            <HStack spacing={4} width="full">
              <FormControl>
                <FormLabel htmlFor="phone-number" color="teal.600">
                  Phone Number:
                </FormLabel>
                <Input
                  type="tel"
                  id="phone-number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Optional phone number"
                  variant="filled"
                  backgroundColor="gray.100"
                  focusBorderColor="teal.400"
                  _placeholder={{ color: "gray.500" }}
                  css={{
                    color: "black", // Set text color to black
                  }}
                />
              </FormControl>
            </HStack>
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
                css={{
                  color: "black", // Set text color to black
                }}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="password" color="teal.600">
                Password:
              </FormLabel>
              <HStack>
                <Input
                  type={showPassword ? "text" : "password"} // Show password if true
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  variant="filled"
                  backgroundColor="gray.100"
                  focusBorderColor="teal.400"
                  _placeholder={{ color: "gray.500" }}
                  css={{
                    color: "black", // Set text color to black
                  }}
                />
                <IconButton
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                  variant="outline"
                  colorScheme="teal"
                />
              </HStack>
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="confirm-password" color="teal.600">
                Confirm Password:
              </FormLabel>
              <HStack>
                <Input
                  type={showConfirmPassword ? "text" : "password"} // Show password if true
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  variant="filled"
                  backgroundColor="gray.100"
                  focusBorderColor="teal.400"
                  _placeholder={{ color: "gray.500" }}
                  css={{
                    color: "black", // Set text color to black
                  }}
                />
                <IconButton
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  icon={showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle password visibility
                  variant="outline"
                  colorScheme="teal"
                />
              </HStack>
            </FormControl>
            <Button
              type="submit"
              colorScheme="teal"
              width="full"
              mt={4}
              _hover={{ bg: "teal.500" }}
            >
              Signup
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default SignupPage;
