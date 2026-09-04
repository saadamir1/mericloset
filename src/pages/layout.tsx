import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Box, Flex } from "@chakra-ui/react";
import Footer from "../components/Footer";
import Chatbot from "../components/chatbot";
import NotificationBar from "../components/NotificationBar";

const Layout = () => {
  return (
    <Flex direction="column" minHeight="100vh">
      <NotificationBar />
      <NavBar />
      <Box flex="1" px={{ base: 3, md: 5 }} pt={{ base: 3, md: 4 }} pb={8} maxW="1600px" w="100%" mx="auto">
        <Outlet />
      </Box>
      <Footer />
      <Chatbot />
    </Flex>
  );
};

export default Layout;
