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
  FaMagic,
} from "react-icons/fa";
import useProductQueryStore from "../store";
import userStore from "./../userStore";
import useComparisonStore from "../comparisonStore";
import axios from "axios";
const baseURL = import.meta.env.VITE_API_BASE_URL;

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
  const [isScrolled, setIsScrolled] = useState(false);
  const toast = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  // Use the comparison store
  const { comparedProductIds } = useComparisonStore();

  // Track scroll position so the navbar can shift from a very light,
  // barely-there glass panel at the top of the page to a slightly more
  // solid, blurred, elevated one once the user scrolls — this is what
  // creates the "transparent, then sleek" transition effect.
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarBgColor = useColorModeValue(
    isScrolled ? "rgba(255, 255, 255, 0.92)" : "rgba(255, 255, 255, 0.55)",
    isScrolled ? "rgba(17, 24, 39, 0.92)" : "rgba(17, 24, 39, 0.55)"
  );
  const navbarTextColor = useColorModeValue("gray.800", "white");
  const logoHeight = useBreakpointValue({ base: "32px", md: "40px" });
  const isMobileView = useBreakpointValue({ base: true, md: false });
  const buttonHoverBg = useColorModeValue("blackAlpha.50", "whiteAlpha.100");
  const capsuleBg = useColorModeValue("blackAlpha.50", "whiteAlpha.100");
  const menuListBg = useColorModeValue("white", "gray.800");
  const menuItemHoverBg = useColorModeValue("teal.50", "whiteAlpha.100");
  const accentColor = "teal.400";
  
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
        `${baseURL}/favorites/user/${user.id}`
      );
      setWishlistCount(data.length);
    } catch (error) {
      console.error("Error fetching wishlist count:", error);
    }
  };

  useEffect(() => {
    const id = user?.id || user?._id || null;
    setUserId(id || null);
  }, [user]);

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
      to: userId ? `/recommendations/${userId}` : "/recommendations",
      isActive: location.pathname.includes("/recommendations")
    },
    {
      label: "Outfits",
      icon: <FaMagic />,
      to: "/outfit-builder",
      isActive: location.pathname.includes("/outfit-builder")
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
      bg={navbarBgColor}
      backdropFilter={isScrolled ? "saturate(180%) blur(16px)" : "saturate(150%) blur(8px)"}
      width="100%"
      px={{ base: 3, md: 8 }}
      py={{ base: 2, md: 3 }}
      color={navbarTextColor}
      boxShadow={isScrolled ? "0 4px 24px rgba(15, 23, 42, 0.08)" : "none"}
      transition="background-color 0.25s ease, box-shadow 0.25s ease, backdrop-filter 0.25s ease"
      style={style}
    >
      <Flex
        width="100%"
        maxW="1600px"
        mx="auto"
        alignItems="center"
        justifyContent="space-between"
      >
        {/* Logo and Desktop Navigation */}
        <HStack spacing={6}>
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <RouterLink to="/" onClick={handleLogoClick}>
              <HStack spacing={2}>
                {/* The source logo.webp has "Meri Closet" baked into the image
                    in white text, so it vanishes on a light background (that's
                    the ghosting you saw). Until there's an icon-only asset, we
                    clip the image down to just its left-hand icon square and
                    render the wordmark as real, theme-aware text instead — it
                    now stays visible in both light and dark mode. */}
                <Box
                  boxSize={logoHeight}
                  borderRadius="full"
                  overflow="hidden"
                  flexShrink={0}
                >
                  <Image
                    src={logo}
                    alt="Meri Closet"
                    h={logoHeight}
                    w="auto"
                    maxW="none"
                    objectFit="cover"
                    objectPosition="left center"
                  />
                </Box>
                <Text
                  fontFamily="'Georgia', 'Playfair Display', serif"
                  fontSize={{ base: "lg", md: "xl" }}
                  fontWeight="semibold"
                  letterSpacing="wide"
                  color={navbarTextColor}
                  whiteSpace="nowrap"
                  lineHeight="1"
                >
                  Meri Closet
                </Text>
              </HStack>
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
                  borderRadius="full"
                  position="relative"
                  color={button.isActive ? accentColor : navbarTextColor}
                  _hover={{ bg: buttonHoverBg }}
                  _after={
                    button.isActive
                      ? {
                          content: '""',
                          position: "absolute",
                          bottom: "-2px",
                          left: "20%",
                          width: "60%",
                          height: "2px",
                          bg: accentColor,
                          borderRadius: "full",
                        }
                      : {}
                  }
                >
                  {button.label}
                  {button.badge && (
                    <Badge ml={1} colorScheme="teal" fontSize="0.6em" variant="solid" borderRadius="full">
                      {button.badge}
                    </Badge>
                  )}
                  {button.label === "New Arrivals" && (
                    <Badge ml={1} colorScheme="teal" fontSize="0.6em" variant="solid" borderRadius="full">
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
                  <FaSearch color="gray.400" />
                </InputLeftElement>
                <Input
                  placeholder="Search..."
                  bg={useColorModeValue("blackAlpha.50", "whiteAlpha.100")}
                  border="none"
                  borderRadius="full"
                  focusBorderColor="teal.400"
                  color={navbarTextColor}
                  _placeholder={{ color: useColorModeValue("gray.500", "whiteAlpha.700") }}
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
              borderRadius="full"
              fontSize="lg"
              color={navbarTextColor}
              _hover={{ bg: buttonHoverBg }}
              onClick={() => setSearchOpen(true)}
            />
          )}

          {searchOpen && (
            <IconButton
              icon={<FaTimes />}
              aria-label="Close Search"
              variant="ghost"
              borderRadius="full"
              fontSize="lg"
              color={navbarTextColor}
              _hover={{ bg: buttonHoverBg }}
              onClick={() => setSearchOpen(false)}
            />
          )}

          {!isMobileView && (
            <HStack
              spacing={0}
              bg={capsuleBg}
              borderRadius="full"
              p={1}
            >
              <Tooltip label="Wishlist" hasArrow>
                <Box position="relative">
                  <IconButton
                    icon={<FaHeart />}
                    aria-label="Wishlist"
                    variant="ghost"
                    borderRadius="full"
                    size="sm"
                    as={RouterLink}
                    to="/wishlist"
                    color={navbarTextColor}
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
                  <ColorModeSwitch color={navbarTextColor} />
                </Box>
              </Tooltip>
            </HStack>
          )}

          <Menu>
            <MenuButton
              as={IconButton}
              icon={<FaUserAlt />}
              aria-label="User Profile"
              variant="ghost"
              borderRadius="full"
              color={navbarTextColor}
              _hover={{ bg: buttonHoverBg }}
            />
            <MenuList
              bg={menuListBg}
              color={navbarTextColor}
              borderRadius="xl"
              boxShadow="lg"
              border="none"
              py={2}
              minW="190px"
            >
              {isLoggedIn ? (
                <>
                  <MenuItem
                    as={RouterLink}
                    to="/profile"
                    icon={<FaUserAlt />}
                    borderRadius="md"
                    mx={1}
                    w="calc(100% - 8px)"
                    _hover={{ bg: menuItemHoverBg }}
                    _focus={{ bg: menuItemHoverBg }}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={handleLogout}
                    icon={<FaSignOutAlt />}
                    borderRadius="md"
                    mx={1}
                    w="calc(100% - 8px)"
                    _hover={{ bg: menuItemHoverBg }}
                    _focus={{ bg: menuItemHoverBg }}
                  >
                    Logout
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem
                    as={RouterLink}
                    to="/login"
                    icon={<FaSignInAlt />}
                    borderRadius="md"
                    mx={1}
                    w="calc(100% - 8px)"
                    _hover={{ bg: menuItemHoverBg }}
                    _focus={{ bg: menuItemHoverBg }}
                  >
                    Login
                  </MenuItem>
                  <MenuItem
                    as={RouterLink}
                    to="/signup"
                    icon={<FaUserPlus />}
                    borderRadius="md"
                    mx={1}
                    w="calc(100% - 8px)"
                    _hover={{ bg: menuItemHoverBg }}
                    _focus={{ bg: menuItemHoverBg }}
                  >
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
              borderRadius="full"
              onClick={onOpen}
              color={navbarTextColor}
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
                  colorScheme={button.isActive ? "teal" : undefined}
                  borderRadius="full"
                  w="full"
                  position="relative"
                >
                  {button.label}
                  {button.badge && (
                    <Badge ml={1} colorScheme="teal" fontSize="0.6em" borderRadius="full">
                      {button.badge}
                    </Badge>
                  )}
                  {button.label === "New Arrivals" && (
                    <Badge ml={1} colorScheme="teal" fontSize="0.6em" borderRadius="full">
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