import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Box, Flex } from "@chakra-ui/react";
import Footer from "../components/Footer";
import Chatbot from "../components/chatbot";
import NotificationBar from "../components/NotificationBar";
import { useState } from "react";

const Layout = () => {
  const [showNotification, setShowNotification] = useState(true);

  const closeNotification = () => {
    setShowNotification(false);
  };

  return (
    <Flex direction="column" minHeight="100vh">
      {showNotification && (
        <NotificationBar
          message="Discover Top Brands and Exclusive Collections in One Place!"
          onClose={closeNotification}
        />
      )}

      {/* Navbar with dynamic margin-top */}
      <NavBar style={{ marginTop: showNotification ? "50px" : "0px" }} />

      <Box flex="1" padding={5}>
        <Outlet /> {/* Renders the active route component */}
      </Box>
      <Footer />
      <Chatbot />
    </Flex>
  );
};

export default Layout;
