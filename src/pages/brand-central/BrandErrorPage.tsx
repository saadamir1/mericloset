// src/pages/brand-central/BrandErrorPage.tsx
import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const BrandErrorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box textAlign="center" p={5}>
      <Heading as="h1" size="xl" mb={4}>
        Oops! Something went wrong.
      </Heading>
      <Text fontSize="lg" mb={4}>
        We couldn't find the page you were looking for.
      </Text>
      <Button colorScheme="teal" onClick={() => navigate('/brand')}>
        Go to Brand Central
      </Button>
    </Box>
  );
};

export default BrandErrorPage;