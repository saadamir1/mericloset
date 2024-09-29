import { Box, Text, Link } from "@chakra-ui/react";
import SocialMediaLinks from "./SocialMediaLinks";

const Footer = () => {
  return (
    <Box
      as="footer"
      bg="gray.700"
      color="white"
      py={2}
      mt={7}
      textAlign="center"
    >
      <Text mt={2} fontSize={["sm", "md"]}>
        &copy; {new Date().getFullYear()} MeriCloset. All rights reserved.
      </Text>
      <Box mt={2}>
        <Link href="/privacy-policy" mx={2} fontSize={["xs", "sm", "md"]}>
          Privacy Policy
        </Link>
        <Link href="/terms-of-service" mx={2} fontSize={["xs", "sm", "md"]}>
          Terms of Service
        </Link>
        <Link href="/contact-us" mx={2} fontSize={["xs", "sm", "md"]}>
          Contact Us
        </Link>
      </Box>
      <Box mb={2} display="flex" justifyContent="center" mt={4}>
        <SocialMediaLinks />
      </Box>
    </Box>
  );
};

export default Footer;
