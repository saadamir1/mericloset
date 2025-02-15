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
  Flex,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import userStore from '../userStore';
import axios from 'axios';

const ProfilePage: React.FC = () => {
  const { user, setUser , token } = userStore();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(user);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      toast({
        title: "Unauthorized",
        description: "Please log in to access your profile.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      navigate('/login');
    } else {
      setFormData(user); // Set form data when user is available
    }
  }, [token, navigate, toast, user]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        `http://localhost:5170/api/v1/users/${user?.id}`,
        { userId: user?.id, role: "user", profileData: formData },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUser (data.user);
      setEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.response?.data?.message || "Profile update failed",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={5} maxWidth="600px" mx="auto" borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading as="h2" size="lg" mb={4} textAlign="center">
        Profile Page
      </Heading>

      {token && (
        <>
          <Grid templateColumns="repeat(2, 1fr)" gap={6} mb={4}>
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
                  <Input name="firstName" value={formData.firstName} onChange={handleChange} required />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Last Name</FormLabel>
                  <Input name="lastName" value={formData.lastName} onChange={handleChange} required />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Email</FormLabel>
                  <Input name="email" type="email" value={formData.email} onChange={handleChange} required />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Username</FormLabel>
                  <Input name="username" value={formData.username} onChange={handleChange} required />
                </FormControl>

                <Stack direction="row" spacing={4} mt={4}>
                  <Button type="submit" colorScheme="teal" width="full">
                    Save Changes
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