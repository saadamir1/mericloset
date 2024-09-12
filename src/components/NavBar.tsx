import logo from "../assets/logo.webp"; // Fix the import path
import { Box, Heading, HStack, Image } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <Box textAlign="center" paddingY={3}>
        <Heading
          fontWeight="bold"
          color="teal.500"
          textShadow="2px 2px #000000"
        >
          <Link to={"/"}>GAME-HUB </Link>
        </Heading>
      </Box>

      {/* //hstack => horizontal stack meaning components will be aligned side by side, in a row. */}
      <HStack marginBottom={5} padding="10px">
        <Link to="/">
          <Image src={logo} alt="Logo" boxSize="70px" objectFit="contain" />
        </Link>
        {/* <Text fontSize="2xl" fontWeight="bold">
        Game-Hub
      </Text> */}
        <SearchInput />
        <ColorModeSwitch />
      </HStack>
    </>
  );
};

export default NavBar;
