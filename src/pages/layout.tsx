import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Box, Heading } from "@chakra-ui/react";

const layout = () => {
  return (
    <>
      <Box textAlign="center" paddingY={4}>
        <Heading
          fontWeight="bold"
          color="teal.500"
          textShadow="2px 2px #000000"
        >
          GAME-HUB
        </Heading>
      </Box>
      <NavBar />
      <Outlet />
    </>
  );
};

export default layout;
