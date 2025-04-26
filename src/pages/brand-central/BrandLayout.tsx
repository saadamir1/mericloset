import { Outlet } from "react-router-dom";
import BrandSidebar from "../../components/brand-central/BrandSidebar"; 
import { Box, Flex } from "@chakra-ui/react";

const BrandLayout = () => {
  return (
    <Flex direction="row" minHeight="100vh">
      <BrandSidebar />
      <Box
        flex="1"
        padding={5}
        marginLeft="200px" // Offset for the fixed sidebar width
        overflowY="auto" // Make the main content scrollable
        height="100vh" // Full height of the viewport
      >
        <Outlet /> {/* Renders the active route component */}
      </Box>
    </Flex>
  );
};

export default BrandLayout;