import { Box, HStack, VStack, Image, Button, IconButton, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, useDisclosure, useBreakpointValue, useColorModeValue, Menu, MenuButton, MenuList, MenuItem, useToast } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import logo from "../assets/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import useProductQueryStore from "../store";
import { FaUserAlt, FaShoppingCart } from "react-icons/fa";
import useUserStore from "../userStore"; 

const NavBar = () => {
  const resetFilters = useProductQueryStore((state) => state.resetFilters);
  const setSortOrder = useProductQueryStore((state) => state.setSortOrder);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobileView = useBreakpointValue({ base: true, md: false });
  const toast = useToast();
  
  const { isLoggedIn, logout, user } = useUserStore();
  const isAdmin = user && user.role == 'admin' ;

  const navbarBgColor = useColorModeValue("green.300", "green.900");
  const logoHeight = useBreakpointValue({ base: "30px", md: "60px" });

  const buttons = [
    { label: "Home", action: resetFilters, to: "/" },
    { label: "Trending", action: () => setSortOrder("-rating"), to: "/" },
    { label: "New Arrival", action: () => setSortOrder("-released"), to: "/" },
    { label: "Contact", to: "/contact-us" },
  ];

  const handleLogout = () => {
    logout(); 
    toast({
      title: "Logout Successful",
      description: "You have been logged out successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <>
      {isMobileView ? (
        <>
          <HStack p="10px" justifyContent="space-between" bg={navbarBgColor}>
            <RouterLink to="/">
              <Image src={logo} alt="Logo" height={logoHeight} objectFit="cover" display="block" />
            </RouterLink>
            <Box flex="1" maxW="300px" mx="10px">
              <SearchInput />
            </Box>
            <IconButton icon={<HamburgerIcon />} variant="outline" onClick={onOpen} aria-label="Open menu" />
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
                  {/* Show Upload Products only if the user is admin */}
                  {isAdmin && (
                    <Button
                      variant="ghost"
                      colorScheme="teal"
                      as={RouterLink}
                      to="/upload-products"
                      width="100%"
                      textAlign="left"
                    >
                      Upload Products
                    </Button>
                  )}
                  <ColorModeSwitch />
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      ) : (
        <>
          <Box bg={navbarBgColor} width="100%" p={3}>
            <VStack spacing={2} width="100%">
              <HStack justifyContent="space-between" width="100%">
                <RouterLink to="/">
                  <Image src={logo} alt="Logo" height="60px" objectFit="cover" />
                </RouterLink>

                <Box flex="1" maxW="500px" mx="20px">
                  <SearchInput />
                </Box>

                <HStack spacing={4}>
                  <Menu>
                    <MenuButton as={IconButton} icon={<FaUserAlt />} aria-label="User Profile" variant="outline" />
                    <MenuList borderRadius="md" boxShadow="lg">
                      {!isLoggedIn ? (
                        <>
                          <MenuItem as={RouterLink} to="/login" _hover={{ bg: "green.100" }}>Login</MenuItem>
                          <MenuItem as={RouterLink} to="/signup" _hover={{ bg: "green.100" }}>Register</MenuItem>
                        </>
                      ) : (
                        <>
                          <MenuItem as={RouterLink} to="/profile" fontWeight="bold">{`Hello, ${user.firstName}`}</MenuItem>
                          <MenuItem onClick={() => { handleLogout(); onClose(); }}>Logout</MenuItem>
                        </>
                      )}
                    </MenuList>
                  </Menu>
                  <IconButton icon={<FaShoppingCart />} aria-label="Cart" variant="outline" as={RouterLink} to="/cart" />
                </HStack>
              </HStack>

              <HStack spacing={4} justifyContent="space-between" width="100%">
                <HStack>
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
                  {/* Show Upload Products only if the user is admin */}
                  {isAdmin && (
                    <Button
                      variant="ghost"
                      colorScheme="teal"
                      as={RouterLink}
                      to="/upload-products"
                    >
                      Upload Products
                    </Button>
                  )}
                </HStack>
                <ColorModeSwitch />
              </HStack>
            </VStack>
          </Box>
        </>
      )}
    </>
  );
};

export default NavBar;
