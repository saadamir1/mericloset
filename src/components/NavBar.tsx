import React, { useState } from "react";
import {
  Box,
  HStack,
  Image,
  Button,
  Text, 
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
import SearchInput from "./SearchInput"; // Ensure this component exists
import {
  FaUserAlt,
  FaHeart,  // Wishlist Icon
  FaHome,
  FaFire,
  FaStar,
  FaPhoneAlt,
  FaGlobe,
} from "react-icons/fa";
import ReactCountryFlag from "react-country-flag";
import useProductQueryStore from "../store"; // Import useProductQueryStore

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
  const navbarBgColor = useColorModeValue("white", "gray.800");
  const logoHeight = useBreakpointValue({ base: "40px", md: "50px" });

  const buttons = [
    { label: "Home", icon: <FaHome />, to: "/" },
    { label: "Trending", icon: <FaFire />, to: "/" },
    { label: "New Arrival", icon: <FaStar />, to: "/" },
    { label: "Contact", icon: <FaPhoneAlt />, to: "/contact-us" },
  ];

  const languages: Language[] = [
    { code: "en", label: "English", flagCode: "US" },
    { code: "ur", label: "اردو", flagCode: "PK" },
    { code: "fr", label: "Français", flagCode: "FR" },
    { code: "es", label: "Español", flagCode: "ES" },
  ];

  const [currentLanguage, setCurrentLanguage] = useState<string>("en");

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

  const sloganColor = useColorModeValue("gray.600", "gray.300");

  // Use the resetFilters function from useProductQueryStore
  const resetFilters = useProductQueryStore((state) => state.resetFilters);

  // Function to clear filters when logo is clicked
  const handleLogoClick = () => {
    resetFilters(); // Call resetFilters to clear the filters
  };

  return (
    <Box
      bg={navbarBgColor}
      width="100%"
      p={3}
      position="sticky"
      top="0"
      zIndex="999"
      boxShadow="md"
      style={style} // Apply the style prop here
    >
      <HStack width="100%" alignItems="center" spacing={4}>
        {/* Logo and Slogan */}
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
            {/* Bold slogan with dynamic color */}
            <Text fontSize="xs" fontStyle={"italic"} color={sloganColor} fontWeight="bold" mt={1}>
              Style at Your Fingertips
            </Text>
          </Box>
        </RouterLink>

        {/* Navigation Buttons */}
        {!isMobileView && (
          <HStack spacing={6}>
            {buttons.map(({ label, icon, to }) => (
              <Button
                key={label}
                as={RouterLink}
                to={to}
                leftIcon={icon}
                variant="ghost"
                fontSize="sm"
                fontWeight="bold"
              >
                {label}
              </Button>
            ))}
          </HStack>
        )}

        {/* Spacer */}
        <Spacer />

        {/* Search Bar */}
        <Box maxW={{ base: "300px", md: "900px" }} flex="1">
          <SearchInput />
        </Box>

        {/* Spacer */}
        <Spacer />

        {/* Icons and Language Menu */}
        <HStack spacing={4}>
          <Tooltip label="Toggle Dark Mode">
            <ColorModeSwitch />
          </Tooltip>

          {/* Wishlist Button */}
          <Tooltip label="Wishlist">
            <IconButton
              icon={<FaHeart />}
              aria-label="Wishlist"
              variant="ghost"
              as={RouterLink}
              to="/wishlist"
            />
          </Tooltip>

          {/* User Profile Menu */}
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<FaUserAlt />}
              aria-label="User Profile"
              variant="ghost"
            />
            <MenuList>
              <MenuItem as={RouterLink} to="/login">
                Login
              </MenuItem>
              <MenuItem as={RouterLink} to="/signup">
                Register
              </MenuItem>
            </MenuList>
          </Menu>

          {/* Language Menu */}
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<FaGlobe />}
              aria-label="Language"
              variant="ghost"
              fontSize="xl"
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
