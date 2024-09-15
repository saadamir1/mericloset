import logo from "../assets/logo.webp"; // Fix the import path
import { Box, Heading, HStack, Image } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import { Link } from "react-router-dom";
import useGameQueryStore from "../store";

const NavBar = () => {
  const resetFilters = useGameQueryStore((state) => state.resetFilters);
  return (
    <>
      <Box textAlign="center" paddingY={3}>
        <Heading
          fontWeight="bold"
          color="teal.400"
          textShadow="2px 2px #718096"
        >
          <Link onClick={resetFilters} to={"/"}>
            GAME-HUB{" "}
          </Link>
        </Heading>
      </Box>

      {/* //hstack => horizontal stack; meaning components will be aligned side by side, in a row. */}
      <HStack marginBottom={5} padding="10px">
        <Link to="/">
          <Image src={logo} alt="Logo" boxSize="70px" objectFit="contain" />
        </Link>
        <SearchInput />
        <ColorModeSwitch />
      </HStack>
    </>
  );
};

export default NavBar;
