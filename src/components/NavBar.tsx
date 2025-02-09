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
  Spacer,
  Tooltip,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import logo from "../assets/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import {
  FaShoppingCart,
  FaHome,
  FaFire,
  FaStar,
  FaPhoneAlt,
  FaGlobe,
  FaHeart,
} from "react-icons/fa";
import ReactCountryFlag from "react-country-flag";

const NavBar = () => {
  const isMobileView = useBreakpointValue({ base: true, md: false });
  const navbarBgColor = useColorModeValue("white", "gray.800");
  const logoHeight = useBreakpointValue({ base: "40px", md: "50px" });

  const buttons = [
    { label: "Home", icon: <FaHome />, to: "/" },
    { label: "Trending", icon: <FaFire />, to: "/" },
    { label: "New Arrival", icon: <FaStar />, to: "/" },
    { label: "Contact", icon: <FaPhoneAlt />, to: "/contact-us" },
  ];

  const languages = [
    { code: "en", label: "English", flagCode: "US" },
    { code: "ur", label: "اردو", flagCode: "PK" },
    { code: "fr", label: "Français", flagCode: "FR" },
    { code: "es", label: "Español", flagCode: "ES" },
  ];

  const handleLanguageChange = (langCode: string) => {
    if (langCode !== "en") {
      const translateUrl = `https://translate.google.com/translate?hl=${langCode}&sl=auto&tl=${langCode}&u=${window.location.href}`;
      window.location.href = translateUrl; // ✅ Redirects to Google Translate
    }
  };

  return (
    <Box bg={navbarBgColor} width="100%" p={3} position="sticky" top="0" zIndex="999" boxShadow="md">
      <HStack width="100%" alignItems="center" spacing={4}>
        {/* Logo */}
        <RouterLink to="/">
          <Box textAlign="center">
            <Image src={logo} alt="Logo" height={logoHeight} objectFit="cover" />
            <Text fontSize="xs" fontStyle={"italic"} fontWeight="bold" mt={1}>
              Style at Your Fingertips
            </Text>
          </Box>
        </RouterLink>

        {/* Navigation Buttons */}
        {!isMobileView && (
          <HStack spacing={6}>
            {buttons.map(({ label, icon, to }) => (
              <Button key={label} as={RouterLink} to={to} leftIcon={icon} variant="ghost">
                {label}
              </Button>
            ))}
          </HStack>
        )}

        <Spacer />

        {/* Search Bar */}
        <Box maxW={{ base: "300px", md: "900px" }} flex="1">
          <SearchInput />
        </Box>

        <Spacer />

        {/* Icons & Language Menu */}
        <HStack spacing={4}>
          <Tooltip label="Toggle Dark Mode">
            <ColorModeSwitch />
          </Tooltip>
          <Tooltip label="Wishlist">
            <IconButton icon={<FaHeart />} aria-label="Wishlist" variant="ghost" as={RouterLink} to="/wishlist" />
          </Tooltip>
          <Tooltip label="Cart">
            <IconButton icon={<FaShoppingCart />} aria-label="Cart" variant="ghost" as={RouterLink} to="/cart" />
          </Tooltip>
          <Menu>
            <MenuButton as={IconButton} icon={<FaGlobe />} aria-label="Language" variant="ghost" fontSize="xl" />
            <MenuList>
              {languages.map((lang) => (
                <MenuItem
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                >
                  <ReactCountryFlag countryCode={lang.flagCode} svg style={{ width: "1.5em", height: "1.5em", marginRight: "0.5em" }} />
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
