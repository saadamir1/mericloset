import React, { useState } from "react";
import {
  Box,
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
  Spacer,
  Tooltip,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import logo from "../assets/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import {
  FaUserAlt,
  FaHeart,  // Wishlist Icon
  FaHome,
  FaFire,
  FaStar,
  FaPhoneAlt,
  FaGlobe,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserPlus,
} from "react-icons/fa";
import ReactCountryFlag from "react-country-flag";
import useProductQueryStore from "../store"; // Import useProductQueryStore
import userStore from "./../userStore"; // Import useUser  Store

// Add the style prop type
interface NavBarProps {
  style?: React.CSSProperties;
}

interface Language {
  code: string;
  label: string;
  flagCode: string;
}

const NavBar: React.FC<NavBarProps> = ({ style }) => {
  const isMobileView = useBreakpointValue({ base: true, md: false });
  const toast = useToast();
  const navbarBgColor = useColorModeValue("gray.400", "gray.800");
  const logoHeight = useBreakpointValue({ base: "30px", md: "40px" });

  const buttons = [
    { label: "Home", icon: <FaHome />, to: "/" },
    { label: "Trending", icon: <FaFire />, to: "/trending" },
    { label: "New Arrival", icon: <FaStar />, to: "/new-arrival" },
    { label: "Contact", icon: <FaPhoneAlt />, to: "/contact-us" },
  ];

  const languages: Language[] = [
    { code: "en", label: "English", flagCode: "US" },
    { code: "ur", label: "اردو", flagCode: "PK" },
    { code: "fr", label: "Français", flagCode: "FR" },
    { code: "es", label: "Español", flagCode: "ES" },
  ];

  const [currentLanguage, setCurrentLanguage] = useState<string>("en");

  const { isLoggedIn, logout } = userStore();

  const handleLanguageChange = (langCode: string) => {
    const selectedLanguage = languages.find((lang) => lang.code === langCode);
    if (selectedLanguage) {
      setCurrentLanguage(langCode);
      toast({
        title: `Language changed to ${selectedLanguage.label}`,
        status: "info",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const resetFilters = useProductQueryStore((state) => state.resetFilters);

  const handleLogoClick = () => {
    resetFilters();
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box
      bg={navbarBgColor}
      width="100%"
      p={2}
      position="sticky"
      top="0"
      zIndex="999"
      boxShadow="md"
      style={style}
    >
      <HStack width="100%" alignItems="center" spacing={4}>
        <RouterLink to="/" onClick={handleLogoClick}>
          <Box textAlign="center">
            <Image
              src={logo}
              alt="Logo"
              height={logoHeight}
              objectFit="cover"
              _hover={{ transform: "scale(1.05)" }}
              transition="transform 0.2s"
            />
          </Box>
        </RouterLink>

        {!isMobileView && (
          <HStack spacing={4}>
            {buttons.map(({ label, icon, to }) => (
              <Button
                key={label}
                as={RouterLink}
                to={to}
                leftIcon={icon}
                variant="ghost"
                fontSize="sm"
                fontWeight="medium"
                _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
              >
                {label}
              </Button>
            ))}
          </HStack>
        )}

        <Spacer />

        <Box maxW={{ base: "200px", md: "600px" }}  minW="300px" flex="1">
          <SearchInput />
        </Box>

        <Spacer />

        <HStack spacing={2}>
          <Tooltip label="Toggle Dark Mode ">
            <ColorModeSwitch />
          </Tooltip>

          <Tooltip label="Wishlist">
            <IconButton
              icon={<FaHeart />}
              aria-label="Wishlist"
              variant="ghost"
              as={RouterLink}
              to="/wishlist"
              _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
            />
          </Tooltip>

          <Menu>
            <MenuButton
              as={IconButton}
              icon={<FaUserAlt />}
              aria-label="User  Profile"
              variant="ghost"
              _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
            />
            <MenuList>
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

          <Menu>
            <MenuButton
              as={IconButton}
              icon={<FaGlobe />}
              aria-label="Language"
              variant="ghost"
              fontSize="xl"
              _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
            />
            <MenuList>
              {languages.map((lang) => (
                <MenuItem
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  style={{
                    textDecoration: currentLanguage === lang.code ? "underline" : "none",
                    fontWeight: currentLanguage === lang.code ? "bold" : "normal",
                  }}
                >
                  <ReactCountryFlag
                    countryCode={lang.flagCode}
                    svg
                    style={{
                      width: "1.5em",
                      height: "1.5em",
                      marginRight: "0.5em",
                    }}
                  />
                  {lang.label}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </HStack>
      </HStack>
    </Box>
  );
};

export default NavBar;