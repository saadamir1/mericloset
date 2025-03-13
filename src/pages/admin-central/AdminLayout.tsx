import { Outlet } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import AdminSidebar from "../../components/admin-central/AdminSidebar";

const BrandLayout = () => {
  return (
    <Flex direction="row" minHeight="100vh">
      <AdminSidebar />
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