import {
  Box,
  Heading,
  HStack,
  Image,
  Button,
  useBreakpointValue,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import logo from "../assets/logo.webp";
import gamingBackground from "../assets/navbar-bg.jpg"; // Your gaming background image
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import useGameQueryStore from "../store";
import GenreList from "./GenreList";

const NavBar = () => {
  const resetFilters = useGameQueryStore((state) => state.resetFilters);
  const setSortOrder = useGameQueryStore((state) => state.setSortOrder);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobileView = useBreakpointValue({ base: true, md: false });

  const buttons = [
    { label: "Home", action: resetFilters, to: "/" },
    { label: "Trending", action: () => setSortOrder("-rating"), to: "/" },
    { label: "New Arrival", action: () => setSortOrder("-released"), to: "/" },
    { label: "Contact", to: "/contact-us" },
  ];

  return (
    <>
      {isMobileView ? (
        <>
          <Box textAlign="center" py={0} m={0}>
            <Box
              backgroundImage={`linear-gradient(
                to bottom, 
                rgba(0, 0, 0, 0.2),  
                rgba(0, 0, 0, 0.6),  
                rgba(0, 0, 0, 0.9)   
              ), url(${gamingBackground})`}
              width="100%"
              borderRadius="0"
              p={3}
            >
              <Heading
                fontWeight="bold"
                color="teal.400"
                textShadow="2px 2px #718096"
                fontSize="2xl"
                mb={1}
              >
                <RouterLink onClick={resetFilters} to={"/"}>
                  GameHub
                </RouterLink>
              </Heading>
            </Box>
          </Box>

          <HStack p="10px" justifyContent="space-between">
            <RouterLink to="/">
              <Image src={logo} alt="Logo" boxSize="70px" objectFit="contain" />
            </RouterLink>
            <SearchInput />
            <IconButton
              icon={<HamburgerIcon />}
              variant="outline"
              onClick={onOpen}
              aria-label="Open menu"
            />
          </HStack>

          <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Menu</DrawerHeader>
              <DrawerBody>
                <VStack spacing={4} align="start" width="100%">
                  {buttons.map(({ label, action, to }) => (
                    <Button
                      key={label}
                      variant="ghost"
                      colorScheme="teal"
                      onClick={() => {
                        action?.();
                        onClose();
                      }}
                      as={RouterLink}
                      to={to}
                      width="100%"
                      textAlign="left"
                    >
                      {label}
                    </Button>
                  ))}
                  <Box py={4} width="100%">
                    <RouterLink to="/" onClick={onClose}>
                      <GenreList />
                    </RouterLink>
                  </Box>
                  <ColorModeSwitch />
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      ) : (
        <>
          <Box
            backgroundImage={`linear-gradient(
              to bottom, 
              rgba(0, 0, 0, 0.2),  
              rgba(0, 0, 0, 0.6),  
              rgba(0, 0, 0, 0.9)   
            ), url(${gamingBackground})`}
            backgroundSize="cover"
            backgroundPosition="center"
          >
            <HStack spacing={4} justifyContent="center">
              {buttons.map(({ label, action, to }) => (
                <Button
                  key={label}
                  variant="ghost"
                  colorScheme="teal"
                  onClick={() => {
                    action?.();
                    onClose();
                  }}
                  as={RouterLink}
                  to={to}
                >
                  {label}
                </Button>
              ))}
            </HStack>
          </Box>

          <HStack
            spacing={10}
            p="10px"
            justifyContent="center"
            alignItems="center"
          >
            <RouterLink to="/">
              <Image
                src={logo}
                ml={2}
                alt="Logo"
                boxSize="60px"
                objectFit="contain"
              />
            </RouterLink>
            <Heading
              fontWeight="bold"
              color="teal.400"
              textShadow="2px 2px #718096"
              fontSize={{ base: "xl", md: "2xl" }}
            >
              <RouterLink onClick={resetFilters} to={"/"}>
                GameHub
              </RouterLink>
            </Heading>
            <SearchInput />
            <ColorModeSwitch />
          </HStack>
        </>
      )}
    </>
  );
};

export default NavBar;
