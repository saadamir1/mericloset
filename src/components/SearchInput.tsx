import { Input, InputGroup, InputLeftElement, useColorModeValue } from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import useProductQueryStore from "../store";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const ref = useRef<HTMLInputElement>(null);
  const setSearchText = useProductQueryStore((s) => s.setSearchText);
  const navigate = useNavigate();

  // Dynamic colors for input border
  const inputFocusBorderColor = useColorModeValue("green.500", "green.300");
  const inputHoverBorderColor = useColorModeValue("green.600", "green.400");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (ref.current?.value) {
          setSearchText(ref.current.value);
          navigate("/");
        }
      }}
    >
      <InputGroup>
        <InputLeftElement>
          <BsSearch color="gray.500" />
        </InputLeftElement>
        <Input
          ref={ref}
          borderRadius="full"
          placeholder="Search products..."
          variant="filled"
          focusBorderColor={inputFocusBorderColor}
          _hover={{ borderColor: inputHoverBorderColor }}
          _focus={{ borderColor: inputFocusBorderColor }}
        />
      </InputGroup>
    </form>
  );
};

export default SearchInput;
