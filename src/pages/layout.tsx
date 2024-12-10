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
      <NavBar style={{ marginTop: "50px" }} />
      <Box flex="1" padding={5}>
        <Outlet /> {/* Renders the active route component */}
      </Box>
      <Footer />
      <Chatbot />
    </Flex>
  );
};

export default Layout;
