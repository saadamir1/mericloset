import { Box, Heading, Text, Link, Divider } from "@chakra-ui/react";
import Section from "../components/Section";

const PrivacyPolicy = () => {
  return (
    <Box as="section" p={5} bg="gray.100" color="black">
      <Heading mb={8} textAlign="center" color="teal.700">
        Privacy Policy
      </Heading>
      <Text mb={6} textAlign="center">
        At MeriCloset, we are committed to protecting your privacy. This Privacy
        Policy explains how we collect, use, and safeguard your personal
        information when you use our app and services.
      </Text>

      <Divider mb={6} borderColor="gray.300" />

      <Section title="Information We Collect">
        We collect personal information such as your name, email address, and
        body measurements when you sign up or make a purchase. We also gather
        non-personal data like device type, IP address, and usage preferences.
      </Section>

      <Divider mb={6} borderColor="green.300" />

      <Section title="How We Use Your Information">
        Your personal information is used to provide and enhance our services,
        including personalized recommendations and customer support. We do not
        sell or share your data with third parties without your consent.
      </Section>

      <Divider mb={6} borderColor="green.300" />

      <Section title="Data Security">
        We implement reasonable measures to protect your data from unauthorized
        access or disclosure. However, no method of transmission over the
        internet is completely secure, and we cannot guarantee absolute
        security.
      </Section>

      <Divider mb={6} borderColor="green.300" />

      <Section title="Changes to This Policy">
        We may update this Privacy Policy periodically. Any changes will be
        posted on this page with an updated revision date.
      </Section>

      <Text textAlign="center">
        Questions? Contact us at{" "}
        <Link href="mailto:Saadamir070@gmail.com" color="green.800">
          Saadamir070@gmail.com
        </Link>
        .
      </Text>
    </Box>
  );
};

export default PrivacyPolicy;
