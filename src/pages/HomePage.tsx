import { useState, useEffect } from "react";
import {
  Grid,
  Show,
  GridItem,
  Box,
  Flex,
  Button,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa"; 
import GameGrid from "../components/ProductGrid";
import GameHeading from "../components/ProductHeading";
import CategoryList from "../components/CategoryList";
import BrandSelector from "../components/BrandSelector";
import SortSelector from "../components/SortSelector";
import InfoSection from "../components/InfoSection";

const HomePage = () => {
  const [showScrollButtons, setShowScrollButtons] = useState(false);

  // Dynamically set button colors based on theme
  const buttonBg = useColorModeValue("gray.800", "gray.300");
  const buttonHoverBg = useColorModeValue("gray.700", "gray.400");
  const buttonIconColor = useColorModeValue("white", "black");

  // Handle scroll event to toggle visibility of buttons
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollButtons(true);
      } else {
        setShowScrollButtons(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Grid
        templateAreas={{
          base: '"main"', // for mobile view
          lg: '"aside main"', // for larger screen view e.g PC or 1080px
        }}
        templateColumns={{
          base: "320px 1fr", // for mobile view
          lg: "230px 1fr", // for larger screen view e.g PC or 1080px
        }}
        justifyContent="center" // Center content horizontally
      >
        <Show above="lg">
          <GridItem area="aside" paddingTop={10}>
            <CategoryList />
          </GridItem>
        </Show>
        <GridItem area="main">
          <Box paddingLeft={2} paddingTop={3} textAlign="left">
            <GameHeading />
          </Box>
          <Flex paddingLeft={2} marginBottom={3}>
            <Box marginRight={4}>
              <BrandSelector />
            </Box>
            <SortSelector />
          </Flex>
          <GameGrid />
        </GridItem>
      </Grid>

      <InfoSection />

      {/* Scroll Buttons */}
      {showScrollButtons && (
        <>
          {/* Scroll to Top Button */}
          <Button
            position="fixed"
            bottom="80px"
            left="20px"
            onClick={scrollToTop}
            bg={buttonBg}
            _hover={{
              bg: buttonHoverBg,
              transform: "scale(1.05)",
            }}
            _active={{
              transform: "scale(0.95)",
            }}
            transition="all 0.3s ease-in-out"
            size="md"
            borderRadius="full"
            padding="8px"
            boxShadow="md"
          >
            <Icon as={FaArrowUp} w={4} h={4} color={buttonIconColor} />
          </Button>

          {/* Scroll to Bottom Button */}
          <Button
            position="fixed"
            bottom="20px"
            left="20px"
            onClick={scrollToBottom}
            bg={buttonBg}
            _hover={{
              bg: buttonHoverBg,
              transform: "scale(1.05)",
            }}
            _active={{
              transform: "scale(0.95)",
            }}
            transition="all 0.3s ease-in-out"
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

export default HomePage;
