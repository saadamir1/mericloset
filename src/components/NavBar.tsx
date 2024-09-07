import logo from "../assets/logo.webp"; // Fix the import path
import { Box, Heading, HStack, Image } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";

const NavBar = () => {
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

      {/* //hstack => horizontal stack meaning components will be aligned side by side, in a row. */}
      <HStack marginBottom={5} padding="10px">
        <Image src={logo} alt="Logo" boxSize="50px" />
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
