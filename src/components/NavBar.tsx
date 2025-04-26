import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Flex,
  HStack,
  Image,
  Button,
  IconButton,
  useBreakpointValue,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  Text,
  Tooltip,
  Badge,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import {
  FaUserAlt,
  FaHeart,
  FaHome,
  FaPhoneAlt,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserPlus,
  FaClock,
  FaThumbsUp,
  FaBars,
  FaSearch,
  FaTimes,
  FaBalanceScale,
} from "react-icons/fa";
import useProductQueryStore from "../store";
import userStore from "./../userStore";
import useComparisonStore from "../comparisonStore";
import axios from "axios";

interface NavBarProps {
  style?: React.CSSProperties;
}

// Wishlist item interface (simplified from your WishlistPage)
interface WishlistItem {
  _id: string;
  product: {
    _id: string;
    title: string;
  };
}

const NavBar: React.FC<NavBarProps> = ({ style }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [wishlistCount, setWishlistCount] = useState(0);
  const toast = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Use the comparison store
  const { comparedProductIds } = useComparisonStore();
  
  // Dark gradient background for navbar that works well with white logo text
  const navbarBgColor = useColorModeValue(
    "linear-gradient(90deg, #1a365d 0%, #2a4365 100%)",
    "linear-gradient(90deg, #1A202C 0%, #2D3748 100%)"
  );
  const navbarTextColor = "white";
  const logoHeight = useBreakpointValue({ base: "35px", md: "45px" });
  const isMobileView = useBreakpointValue({ base: true, md: false });
  const buttonHoverBg = useColorModeValue("rgba(255,255,255,0.2)", "rgba(255,255,255,0.1)");
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoggedIn, logout, user } = userStore();
  const resetFilters = useProductQueryStore((state) => state.resetFilters);
  const setSortOrder = useProductQueryStore((state) => state.setSortOrder);
  const setSearchText = useProductQueryStore((state) => state.setSearchText);

  // Fetch wishlist count
  const fetchWishlistCount = async () => {
    if (!user || !user.id) return;
    
    try {
      const { data } = await axios.get<WishlistItem[]>(
        `http://localhost:5170/api/v1/favorites/user/${user.id}`
      );
      setWishlistCount(data.length);
    } catch (error) {
      console.error("Error fetching wishlist count:", error);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserId(parsedUser._id || null);
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
      }
    }
  }, []);

  // Fetch wishlist count on component mount and when location changes
  useEffect(() => {
    if (isLoggedIn && user) {
      fetchWishlistCount();
    } else {
      setWishlistCount(0);
    }
  }, [isLoggedIn, user, location.pathname]);
  
  // Search handling
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchText(searchValue);
    if (window.location.pathname !== "/") {
      window.location.href = "/";
    }
    setSearchOpen(false);
  };

  // Handle comparison button click
  const handleCompareClick = () => {
    if (comparedProductIds.length < 2) {
      toast({
        title: "Select more products",
        description: "Please select at least 2 products to compare",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    
    navigate(`/compare?ids=${comparedProductIds.join(',')}`);
  };

  const buttons = [
    { 
      label: "Home", 
      icon: <FaHome />, 
      to: "/",
      isActive: location.pathname === "/" && !location.search.includes("sortOrder=-added")
    },
    {
      label: "For You",
      icon: <FaThumbsUp />,
      to: userId ? `/recommendations/${userId}` : "#",
      isActive: location.pathname.includes("/recommendations")
    },
    { 
      label: "New Arrivals", 
      icon: <FaClock />, 
      to: "/",
      isActive: location.search.includes("sortOrder=-added"),
      onClick: () => {
        setSortOrder("-added");
        if (window.location.pathname !== "/") {
          window.location.href = "/";
        }
      }
    },
    { 
      label: "Compare", 
      icon: <FaBalanceScale />, 
      onClick: handleCompareClick,
      isActive: location.pathname === "/compare",
      badge: comparedProductIds.length > 0 ? comparedProductIds.length : undefined
    },
    { 
      label: "Contact", 
      icon: <FaPhoneAlt />, 
      to: "/contact-us",
      isActive: location.pathname === "/contact-us"
    },
  ];

  const handleLogoClick = () => {
    resetFilters();
  };

  const handleLogout = () => {
    logout();
    setWishlistCount(0);
    toast({
      title: "Logged out successfully",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  };

  return (
    <Box
      as="nav"
      bgImage={navbarBgColor}
      width="100%"
      px={{ base: 4, md: 6 }}
      py={3}
      position="sticky"
      top="0"
      zIndex="999"
      color={navbarTextColor}
      boxShadow="0 4px 20px rgba(0,0,0,0.15)"
      style={style}
    >
      <Flex width="100%" alignItems="center" justifyContent="space-between">
        {/* Logo and Desktop Navigation */}
        <HStack spacing={6}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <RouterLink to="/" onClick={handleLogoClick}>
              <Image
                src={logo}
                alt="Logo"
                height={logoHeight}
                objectFit="cover"
              />
            </RouterLink>
          </motion.div>

          {!isMobileView && (
            <HStack spacing={1}>
              {buttons.map((button) => (
                <Button
                  key={button.label}
                  as={button.to ? RouterLink : undefined}
                  to={button.to}
                  onClick={button.onClick}
                  leftIcon={button.icon}
                  variant="ghost"
                  size="md"
                  fontWeight="medium"
                  position="relative"
                  color="white"
                  _hover={{ bg: buttonHoverBg }}
                  _after={
                    button.isActive
                      ? {
                          content: '""',
                          position: "absolute",
                          bottom: "0",
                          left: "10%",
                          width: "80%",
                          height: "2px",
                          bg: "yellow.400",
                          borderRadius: "full",
                        }
                      : {}
                  }
                >
                  {button.label}
                  {button.badge && (
                    <Badge ml={1} colorScheme="yellow" fontSize="0.6em" variant="solid" borderRadius="full">
                      {button.badge}
                    </Badge>
                  )}
                  {button.label === "New Arrivals" && (
                    <Badge ml={1} colorScheme="yellow" fontSize="0.6em" variant="solid">
                      NEW
                    </Badge>
                  )}
                </Button>
              ))}
            </HStack>
          )}
        </HStack>

        {/* Search and Action Icons */}
        <HStack spacing={2}>
          {searchOpen ? (
            <form onSubmit={handleSearchSubmit}>
              <InputGroup size="md">
                <InputLeftElement pointerEvents="none">
                  <FaSearch color="gray.300" />
                </InputLeftElement>
                <Input
                  placeholder="Search..."
                  bg="whiteAlpha.200"
                  border="none"
                  focusBorderColor="yellow.400"
                  color="white"
                  _placeholder={{ color: "whiteAlpha.700" }}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  autoFocus
                  w="250px"
                />
              </InputGroup>
            </form>
          ) : (
            <IconButton
              icon={<FaSearch />}
              aria-label="Search"
              variant="ghost"
              fontSize="lg"
              color="white"
              _hover={{ bg: buttonHoverBg }}
              onClick={() => setSearchOpen(true)}
            />
          )}

          {searchOpen && (
            <IconButton
              icon={<FaTimes />}
              aria-label="Close Search"
              variant="ghost"
              fontSize="lg"
              color="white"
              _hover={{ bg: buttonHoverBg }}
              onClick={() => setSearchOpen(false)}
            />
          )}

          {!isMobileView && (
            <>
              <Tooltip label="Wishlist" hasArrow>
                <Box position="relative">
                  <IconButton
                    icon={<FaHeart />}
                    aria-label="Wishlist"
                    variant="ghost"
                    as={RouterLink}
                    to="/wishlist"
                    color="white"
                    _hover={{ bg: buttonHoverBg }}
                  />
                  {wishlistCount > 0 && (
                    <Badge
                      position="absolute"
                      top="-2px"
                      right="-2px"
                      borderRadius="full"
                      bg="red.500"
                      color="white"
                      fontSize="0.6em"
                      minW="18px"
                      height="18px"
                      textAlign="center"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontWeight="bold"
                    >
                      {wishlistCount}
                    </Badge>
                  )}
                </Box>
              </Tooltip>

              <Tooltip label="Toggle Dark Mode" hasArrow>
                <Box>
                  <ColorModeSwitch color="white" />
                </Box>
              </Tooltip>
            </>
          )}

          <Menu>
            <MenuButton
              as={IconButton}
              icon={<FaUserAlt />}
              aria-label="User Profile"
              variant="ghost"
              color="white"
              _hover={{ bg: buttonHoverBg }}
            />
            <MenuList bg={useColorModeValue("white", "gray.800")} color={useColorModeValue("gray.800", "white")}>
              {isLoggedIn ? (
                <>
                  <MenuItem as={RouterLink} to="/profile" icon={<FaUserAlt />}>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout} icon={<FaSignOutAlt />}>
                    Logout
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem as={RouterLink} to="/login" icon={<FaSignInAlt />}>
                    Login
                  </MenuItem>
                  <MenuItem as={RouterLink} to="/signup" icon={<FaUserPlus />}>
                    Register
                  </MenuItem>
                </>
              )}
            </MenuList>
          </Menu>

          {isMobileView && (
            <IconButton
              icon={<FaBars />}
              aria-label="Open Menu"
              variant="ghost"
              onClick={onOpen}
              color="white"
              _hover={{ bg: buttonHoverBg }}
            />
          )}
        </HStack>
      </Flex>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent bg={useColorModeValue("white", "gray.800")}>
          <DrawerCloseButton />
          <DrawerBody pt={12}>
            <VStack spacing={4} align="stretch">
              {buttons.map((button) => (
                <Button
                  key={button.label}
                  as={button.to ? RouterLink : undefined}
                  to={button.to}
                  onClick={() => {
                    if (button.onClick) button.onClick();
                    onClose();
                  }}
                  leftIcon={button.icon}
                  justifyContent="flex-start"
                  variant={button.isActive ? "solid" : "ghost"}
                  colorScheme={button.isActive ? "blue" : undefined}
                  w="full"
                  position="relative"
                >
                  {button.label}
                  {button.badge && (
                    <Badge ml={1} colorScheme="yellow" fontSize="0.6em" borderRadius="full">
                      {button.badge}
                    </Badge>
                  )}
                  {button.label === "New Arrivals" && (
                    <Badge ml={1} colorScheme="green" fontSize="0.6em">
                      NEW
                    </Badge>
                  )}
                </Button>
              ))}

              <Box pt={4} pb={2}>
                <Text fontSize="sm" fontWeight="bold" color="gray.500">
                  ACCOUNT
                </Text>
              </Box>

              {isLoggedIn ? (
                <>
                  <Button
                    as={RouterLink}
                    to="/profile"
                    leftIcon={<FaUserAlt />}
                    justifyContent="flex-start"
                    variant="ghost"
                    onClick={onClose}
                    w="full"
                  >
                    Profile
                  </Button>
                  <Button
                    leftIcon={<FaSignOutAlt />}
                    justifyContent="flex-start"
                    variant="ghost"
                    onClick={() => {
                      handleLogout();
                      onClose();
                    }}
                    w="full"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    as={RouterLink}
                    to="/login"
                    leftIcon={<FaSignInAlt />}
                    justifyContent="flex-start"
                    variant="ghost"
                    onClick={onClose}
                    w="full"
                  >
                    Login
                  </Button>
                  <Button
                    as={RouterLink}
                    to="/signup"
                    leftIcon={<FaUserPlus />}
                    justifyContent="flex-start"
                    variant="ghost"
                    onClick={onClose}
                    w="full"
                  >
                    Register
                  </Button>
                </>
              )}

              <Box pt={4} pb={2}>
                <Text fontSize="sm" fontWeight="bold" color="gray.500">
                  OPTIONS
                </Text>
              </Box>

              <Button
                as={RouterLink}
                to="/wishlist"
                leftIcon={<FaHeart />}
                justifyContent="flex-start"
                variant="ghost"
                onClick={onClose}
                w="full"
                position="relative"
              >
                Wishlist
                {wishlistCount > 0 && (
                  <Badge 
                    ml={2} 
                    colorScheme="red" 
                    borderRadius="full"
                    fontSize="0.7em"
                  >
                    {wishlistCount}
                  </Badge>
                )}
              </Button>
              
              <Button
                leftIcon={<ColorModeSwitch mobileDrawer />}
                justifyContent="flex-start"
                variant="ghost"
                w="full"
              >
                Dark Mode
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default NavBar;