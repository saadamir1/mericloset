import { Box, Heading, Text, Link, Divider } from "@chakra-ui/react";
import Section from "../components/Section";

const TermsOfService = () => {
  return (
    <Box as="section" p={5} bg="gray.100" color="black">
      <Heading mb={8} textAlign="center" color="teal.700">
        Terms of Service
      </Heading>
      <Text mb={6} textAlign="center">
        By using Game Hub, you agree to the following terms and conditions.
      </Text>

      <Divider mb={6} borderColor="gray.300" />

      <Section title="Use of Services">
        You must be at least 13 years old to use our services. Do not use our
        platform for illegal purposes. You are responsible for your account
        security. Some content is provided by third parties; verify details with
        original sources.
      </Section>

      <Divider mb={6} borderColor="gray.300" />

      <Section title="Content Ownership">
        All products, logos, and trademarks on our site are property of their
        respective owners. Game Hub does not own third-party content. Do not
        distribute, modify, or use this content without permission.
      </Section>

      <Divider mb={6} borderColor="gray.300" />

      <Section title="Limitation of Liability">
        We are not liable for damages from using our services, including data
        loss or interruptions. Use at your own risk. We do not guarantee
        third-party information accuracy.
      </Section>

      <Divider mb={6} borderColor="gray.300" />

      <Section title="Termination">
        We can suspend or terminate your account for violations. Upon
        termination, stop using our services and forfeit your account rights.
      </Section>

      <Divider mb={6} borderColor="gray.300" />

      <Section title="Changes to Terms">
        We may update these terms. Continued use of our services means you
        accept any changes.
      </Section>

      <Text textAlign="center">
        Questions? Contact us at{" "}
        <Link href="mailto:Saadamir070@gmail.com" color="teal.700">
          Saadamir070@gmail.com
        </Link>
        .
      </Text>
    </Box>
  );
};

export default TermsOfService;
