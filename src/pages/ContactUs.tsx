import { Box, Heading, Text, Link } from "@chakra-ui/react";
import SocialMediaLinks from "../components/SocialMediaLinks";

interface EmailLinkProps {
  email: string;
}

const EmailLink = ({ email }: EmailLinkProps) => (
  <Link href={`mailto:${email}`} fontWeight="bold" color="green.700">
    {email}
  </Link>
);

const ContactUs = () => {
  return (
    <Box as="section" p={5} bg="gray.100" color="black">
      <Heading mb={4} textAlign="center" color="green.700">
        Contact Us
      </Heading>
      <Text mb={4}>
        We would love to hear from you! For any inquiries, feel free to reach
        out to us through the following contact methods:
      </Text>

      <Box mb={4}>
        <Heading size="md" mb={2}>
          Customer Support
        </Heading>
        <Text>
          For questions regarding your account, issues with products, or
          technical support, email us at{" "}
          <EmailLink email="Saadamir070@gmail.com" />.
        </Text>
      </Box>

      <Box mb={4}>
        <Heading size="md" mb={2}>
          Business Inquiries
        </Heading>
        <Text>
          For partnership or business-related inquiries, contact us at{" "}
          <EmailLink email="Saadamir070@gmail.com" />.
        </Text>
      </Box>
      <Box mb={4}>
        <Heading size="md" mb={2}>
          Social Media
        </Heading>
        <Text mb={2}>Follow us on our social media channels:</Text>
        <SocialMediaLinks />
      </Box>
    </Box>
  );
};

export default ContactUs;
