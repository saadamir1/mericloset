import { Box, Text, Link } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box as="footer" bg="gray.700" color="white" py={2} textAlign="center">
      <Text>
        &copy; {new Date().getFullYear()} Saad Amir | Game Hub. All rights
        reserved.
      </Text>
      <Box mt={2}>
        <Link href="#" mx={2}>
          Privacy Policy
        </Link>
        <Link href="#" mx={2}>
          Terms of Service
        </Link>
        <Link href="#" mx={2}>
          Contact Us
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
