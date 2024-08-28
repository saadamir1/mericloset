import logo from "../assets/logo.webp"; // Fix the import path
import { HStack, Image } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";

const NavBar = () => {
  return (
    //hstack => horizontal stack meaning components will be aligned side by side, in a row.
    <HStack justifyContent="space-between" padding="10px">
      <Image src={logo} alt="Logo" boxSize="50px" />
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
