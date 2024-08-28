import React from "react";
import logo from "../assets/logo.webp"; // Fix the import path
import { HStack, Image, Text } from "@chakra-ui/react";

const NavBar = () => {
  return (
    <HStack>
      <Image src={logo} alt="Logo" boxSize="50px" />
      <Text>GameHub</Text>
    </HStack>
  );
};

export default NavBar;
