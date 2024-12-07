import { useEffect, useState } from "react";
import { Button, Icon, useColorModeValue } from "@chakra-ui/react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const Scroller = () => {
  const [showScrollButtons, setShowScrollButtons] = useState(false);

  const buttonBg = useColorModeValue("gray.800", "gray.300");
  const buttonHoverBg = useColorModeValue("gray.700", "gray.400");
  const buttonIconColor = useColorModeValue("white", "black");

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButtons(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToBottom = () =>
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });

  return (
    <>
      {showScrollButtons && (
        <>
          <Button
            position="fixed"
            bottom="80px"
            left="20px"
            onClick={scrollToTop}
            bg={buttonBg}
            _hover={{ bg: buttonHoverBg }}
            size="md"
            borderRadius="full"
            padding="8px"
            boxShadow="md"
          >
            <Icon as={FaArrowUp} w={4} h={4} color={buttonIconColor} />
          </Button>
          <Button
            position="fixed"
            bottom="20px"
            left="20px"
            onClick={scrollToBottom}
            bg={buttonBg}
            _hover={{ bg: buttonHoverBg }}
            size="md"
            borderRadius="full"
            padding="8px"
            boxShadow="md"
          >
            <Icon as={FaArrowDown} w={4} h={4} color={buttonIconColor} />
          </Button>
        </>
      )}
    </>
  );
};

export default Scroller;
