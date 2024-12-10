import { forwardRef } from "react";
import { HStack, IconButton, useColorMode } from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";

const ColorModeSwitch = forwardRef<HTMLButtonElement, any>((props, ref) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <HStack>
      <IconButton
        ref={ref}
        aria-label="Toggle color mode"
        icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
        onClick={toggleColorMode}
        colorScheme="yellow"
        variant="ghost"
        size="md"
        isRound
        //{...props} // Pass additional props
      />
    </HStack>
  );
});

export default ColorModeSwitch;
