import React, { useState, ChangeEvent, useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Grid,
  Divider,
  Stack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'; // To redirect the user
import useUserStore from '../userStore'; // Import your user store

const ProfilePage: React.FC = () => {
  const { user, setUser, token } = useUserStore(); // Access user data, token, and setUser function
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(user);
  const toast = useToast();
  const navigate = useNavigate(); // For redirecting

  // Redirect to login page if no token is found
  useEffect(() => {
    if (!token) {
      toast({
        title: "Unauthorized",
        description: "Please log in to access your profile.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      navigate('/login'); // Redirect to the login page
    }
  }, [token, navigate, toast]);

  // Handle form changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUser(formData);
    setEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box p={5} maxWidth="600px" mx="auto">
      <Heading as="h2" size="lg" mb={4} textAlign="center">
        Profile Page
      </Heading>

      {token && ( // Ensure the profile data is only shown if a token is present
        <>
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            <Text fontWeight="bold">First Name:</Text>
            <Text>{user.firstName}</Text>

            <Text fontWeight="bold">Last Name:</Text>
            <Text>{user.lastName}</Text>

            <Text fontWeight="bold">Email:</Text>
            <Text>{user.email}</Text>

            <Text fontWeight="bold">Username:</Text>
            <Text>{user.username}</Text>
          </Grid>

          {!editing ? (
            <Button mt={4} onClick={() => setEditing(true)} colorScheme="teal" width="full">
              Edit Profile
            </Button>
          ) : (
            <>
              <Divider my={6} borderColor="gray.300" />

              <form onSubmit={handleSubmit}>
                <FormControl mb={4}>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Username</FormLabel>
                  <Input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </FormControl>

                {/* Use Stack to space out Save and Cancel buttons */}
                <Stack direction="row" spacing={4} mt={4}>
                  <Button type="submit" colorScheme="teal" width="full">
                    Save
                  </Button>
                  <Button onClick={() => setEditing(false)} colorScheme="red" width="full">
                    Cancel
                  </Button>
                </Stack>
              </form>
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default ProfilePage;
