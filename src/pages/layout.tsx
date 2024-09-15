import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Box, Flex } from "@chakra-ui/react";
import Footer from "../components/Footer";

const layout = () => {
  return (
    <>
      <Flex direction="column" minHeight="100vh">
        <NavBar />
        <Box flex="1" padding={5}>
          <Outlet />
        </Box>
        <Footer />
      </Flex>
    </>
  );
};

export default layout;
