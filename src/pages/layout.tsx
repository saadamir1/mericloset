// src/pages/layout.tsx
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Box, Flex } from "@chakra-ui/react";
import Footer from "../components/Footer";
import Chatbot from "../components/chatbot"; 

const Layout = () => {
  return (
    <>
      <Flex direction="column" minHeight="100vh">
        <NavBar />
        <Box flex="1" padding={5}>
          <Outlet /> {/* Renders the active route component */}
        </Box>
        <Footer />
        <Chatbot /> {/* Chatbot is now accessible across all pages */}
      </Flex>
    </>
  );
};

export default Layout;