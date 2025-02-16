import React from 'react';
import { Box, VStack, Button, Image } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './../../assets/logo.webp'; // Adjust the path to your logo image
import useUserStore from './../../userStore'; // Import the user store

const BrandSidebar: React.FC = () => {
  const navigate = useNavigate();
  const logout = useUserStore((state) => state.logout); // Get the logout function from the store

  const handleLogout = () => {
    logout(); // Call the logout function
    navigate('/login'); // Redirect to the login page after logout
  };

  return (
    <Box
      width="200px"
      bg="gray.200"
      p={4}
      height="100vh" // Full height of the viewport
      position="fixed" // Make the sidebar fixed
      left={0}
      top={0}
    >
      <Image src={logo} alt="Logo" mb={4} /> {/* Add your logo here */}
      <VStack spacing={4} align="stretch">
        <Link to="/brand">
          <Button width="100%" variant="outline">Brand Central</Button>
        </Link>
        <Link to="/brand/add-product">
          <Button width="100%" variant="outline">Add Product</Button>
        </Link>
        <Link to="/brand/edit-product">
          <Button width="100%" variant="outline">Edit Product</Button>
        </Link>
        {/* Logout Button */}
        <Button
          width="100%"
          variant="outline"
          colorScheme="red"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </VStack>
    </Box>
  );
};

export default BrandSidebar;