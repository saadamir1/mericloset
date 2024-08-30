import logo from "../assets/logo.webp"; // Fix the import path
import { HStack, Image } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";

interface Props {
  onSearch: (searchText: string) => void;
}

const NavBar = ({ onSearch }: Props) => {
  return (
    //hstack => horizontal stack meaning components will be aligned side by side, in a row.
    <HStack marginBottom={5} padding="10px">
      <Image src={logo} alt="Logo" boxSize="50px" />
      {/* <Text fontSize="2xl" fontWeight="bold">
        Game-Hub
      </Text> */}
      <SearchInput onSearch={onSearch} />
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
