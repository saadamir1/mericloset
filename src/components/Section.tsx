import { Box, Heading, Text } from "@chakra-ui/react";

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section = ({ title, children }: SectionProps) => (
  <Box mb={6}>
    <Heading size="md" mb={4} color="teal.700">
      {title}
    </Heading>
    <Text>{children}</Text>
  </Box>
);

export default Section;
