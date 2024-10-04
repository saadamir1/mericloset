import { Box, Heading, Text, Link, VStack, Divider } from "@chakra-ui/react";
import SocialMediaLinks from "../components/SocialMediaLinks";

interface EmailLinkProps {
  email: string;
}

const EmailLink = ({ email }: EmailLinkProps) => (
  <Link
    href={`mailto:${email}`}
    fontWeight="bold"
    color="teal.400" // Changed to a contrasting color for better visibility
    _hover={{ textDecoration: "underline", color: "teal.600" }} // Change color on hover
  >
    {email}
  </Link>
);

const ContactUs = () => {
  return (
    <Box
      as="section"
      p={8}
      color="black"
      height="100vh" // Full height to fill the viewport
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box p={8} borderRadius="md" boxShadow="lg" backgroundColor="white" width={{ base: "90%", sm: "400px" }}>
        <Heading mb={6} textAlign="center" color="teal.600">
          Contact Us
        </Heading>
        <Text mb={6} textAlign="center" fontSize="lg" color="gray.600">
          We would love to hear from you! For any inquiries, feel free to reach out to us through the following contact methods:
        </Text>

        <VStack spacing={5} align="start">
          <Box>
            <Heading size="md" mb={2} color="teal.600">
              Customer Support
            </Heading>
            <Text>
              For questions regarding your account, issues with products, or technical support, email us at{" "}
              <EmailLink email="Saadamir070@gmail.com" />.
            </Text>
          </Box>

          <Divider borderColor="gray.200" />

          <Box>
            <Heading size="md" mb={2} color="teal.600">
              Business Inquiries
            </Heading>
            <Text>
              For partnership or business-related inquiries, contact us at{" "}
              <EmailLink email="Saadamir070@gmail.com" />.
            </Text>
          </Box>

          <Divider borderColor="gray.200" />

          <Box>
            <Heading size="md" mb={2} color="teal.600">
              Social Media
            </Heading>
            <Text mb={2}>Follow us on our social media channels:</Text>
            <SocialMediaLinks />
          </Box>
        </VStack>
      </Box>
    </Box>
  );
};

export default ContactUs;
