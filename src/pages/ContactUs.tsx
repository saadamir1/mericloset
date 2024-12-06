import {
  Box,
  Heading,
  Text,
  Link,
  VStack,
  Divider,
  Flex,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import SocialMediaLinks from "../components/SocialMediaLinks";

interface EmailLinkProps {
  email: string;
}

const EmailLink = ({ email }: EmailLinkProps) => (
  <Link
    href={`mailto:${email}`}
    fontWeight="bold"
    color="teal.400"
    _hover={{ textDecoration: "underline", color: "teal.600" }}
  >
    {email}
  </Link>
);

const ContactUs = () => {
  const headingColor = useColorModeValue("teal.600", "teal.300");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const bgColor = useColorModeValue("white", "gray.800");
  const boxShadow = useColorModeValue("lg", "dark-lg");

  return (
    <Box
      as="section"
      p={8}
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={useColorModeValue("gray.100", "gray.900")}
    >
      <Flex
        direction={{ base: "column", lg: "row" }}
        justify="space-between"
        align="stretch"
        w="full"
        maxW="1200px"
      >
        {/* Contact Information Box */}
        <Box
          p={8}
          borderRadius="md"
          boxShadow={boxShadow}
          bg={bgColor}
          width={{ base: "100%", lg: "40%" }}
        >
          <Heading mb={6} textAlign="center" color={headingColor}>
            Contact Us
          </Heading>
          <Text mb={6} textAlign="center" fontSize="lg" color={textColor}>
            We'd love to hear from you! Feel free to reach out for any inquiries.
          </Text>

          <VStack spacing={6} align="start">
            <Box>
              <Flex align="center" mb={2}>
                <Icon as={FaEnvelope} w={5} h={5} color="teal.400" mr={2} />
                <Heading size="md" color={headingColor}>
                  Customer Support
                </Heading>
              </Flex>
              <Text color={textColor}>
                For assistance, email us at <EmailLink email="Saadamir070@gmail.com" />.
              </Text>
            </Box>

            <Divider borderColor="gray.300" />

            <Box>
              <Flex align="center" mb={2}>
                <Icon as={FaEnvelope} w={5} h={5} color="teal.400" mr={2} />
                <Heading size="md" color={headingColor}>
                  Business Inquiries
                </Heading>
              </Flex>
              <Text color={textColor}>
                For partnerships, email us at <EmailLink email="Saadamir070@gmail.com" />.
              </Text>
            </Box>

            <Divider borderColor="gray.300" />

            <Box>
              <Flex align="center" mb={2}>
                <Icon as={FaPhoneAlt} w={5} h={5} color="teal.400" mr={2} />
                <Heading size="md" color={headingColor}>
                  Social Media
                </Heading>
              </Flex>
              <Text mb={2} color={textColor}>
                Follow us on:
              </Text>
              <SocialMediaLinks />
            </Box>
          </VStack>
        </Box>

        {/* Google Maps Embed */}
        <Box
          mt={{ base: 6, lg: 0 }}
          ml={{ lg: 6 }}
          flex="1"
          borderRadius="md"
          overflow="hidden"
          boxShadow={boxShadow}
          bg={bgColor}
        >
          <Box p={4}>
            <Heading size="md" mb={4} color={headingColor}>
              Our Location
            </Heading>
            <Text mb={4} color={textColor}>
              Visit our office for complaints and in-person inquiries:
            </Text>
          </Box>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d106213.31330764922!2d73.00510519999999!3d33.7046522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1733327619042!5m2!1sen!2s"
            width="100%"
            height="400"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Islamabad Location"
          ></iframe>
        </Box>
      </Flex>
    </Box>
  );
};

export default ContactUs;
