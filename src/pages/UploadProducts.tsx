// UploadProducts.tsx
import React from 'react';
import { Box, Heading, Text, Divider, VStack } from '@chakra-ui/react';
import UploadExcel from '../components/UploadExcel';

const UploadProducts: React.FC = () => {
    return (
        <Box
            as="section"
            p={8}
            color="black"
            height="100vh" // Full height to fill the viewport
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <Box
                p={8}
                borderRadius="md"
                boxShadow="lg"
                backgroundColor="white"
                width={{ base: "90%", sm: "400px" }} // Responsive width
            >
                <Heading mb={6} textAlign="center" color="teal.600">
                    Upload Products
                </Heading>
                <Text mb={6} textAlign="center" fontSize="lg" color="gray.600">
                    Use the form below to upload your product data in Excel format. Ensure that your file is properly formatted to avoid any errors during the upload process.
                </Text>

                <Divider borderColor="gray.200" mb={6} />

                <VStack spacing={5} align="start">
                    <UploadExcel />
                </VStack>
            </Box>
        </Box>
    );
};

export default UploadProducts;
