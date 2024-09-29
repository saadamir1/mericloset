import { Box, Heading, Text, Link, Divider } from "@chakra-ui/react";
import Section from "../components/Section";

const TermsOfService = () => {
  return (
    <Box as="section" p={5} bg="gray.100" color="black">
      <Heading mb={8} textAlign="center" color="teal.700">
        Terms of Service
      </Heading>
      <Text mb={6} textAlign="center">
        By using MeriCloset, you agree to the following terms and conditions.
      </Text>

      <Divider mb={6} borderColor="green.300" />

      <Section title="Use of Services">
        You must be at least 13 years old to use our app. Do not use MeriCloset
        for illegal purposes. You are responsible for maintaining the security
        of your account.
      </Section>

      <Divider mb={6} borderColor="green.300" />

      <Section title="Content Ownership">
        All products, images, and trademarks on our app are owned by their
        respective brands. MeriCloset does not own third-party content and you
        may not distribute or modify it without permission.
      </Section>

      <Divider mb={6} borderColor="green.300" />

      <Section title="Limitation of Liability">
        We are not liable for any damages arising from your use of MeriCloset,
        including data loss or interruptions. Use at your own risk; we do not
        guarantee the accuracy of third-party information.
      </Section>

      <Divider mb={6} borderColor="green.300" />

      <Section title="Termination">
        We reserve the right to suspend or terminate your account for violations
        of these terms. Upon termination, you must cease all use of our app.
      </Section>

      <Divider mb={6} borderColor="green.300" />

      <Section title="Changes to Terms">
        We may update these terms at any time. Continued use of MeriCloset
        indicates your acceptance of any changes.
      </Section>

      <Text textAlign="center">
        Questions? Contact us at{" "}
        <Link href="mailto:saadamir070@gmail.com" color="green.700">
          Saadamir070@gmail.com
        </Link>
        .
      </Text>
    </Box>
  );
};

export default TermsOfService;
