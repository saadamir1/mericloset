import React from 'react';
import { Box, Heading, Text, Link, Divider, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, useColorModeValue } from "@chakra-ui/react";

const TermsOfService = () => {
  // Set colors dynamically based on theme (light or dark)
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const textColor = useColorModeValue("black", "white");
  const headingColor = useColorModeValue("teal.700", "teal.300");
  const descriptionColor = useColorModeValue("gray.600", "gray.400");
  const dividerColor = useColorModeValue("green.300", "green.500");
  const linkColor = useColorModeValue("green.700", "green.400");

  return (
    <Box as="section" p={5} bg={bgColor} color={textColor}>
      <Heading mb={8} textAlign="center" color={headingColor} fontSize={{ base: "3xl", md: "4xl" }}>
        Terms of Service
      </Heading>
      <Text mb={6} textAlign="center">
        By using MeriCloset, you agree to the following terms and conditions.
      </Text>

      <Divider mb={6} borderColor={dividerColor} />

      {/* Accordion for collapsible sections */}
      <Accordion allowMultiple>
        {/* Section 1: Use of Services */}
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight="bold" color={headingColor}>
                Use of Services
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} color={descriptionColor}>
            You must be at least 13 years old to use our app. Do not use MeriCloset
            for illegal purposes. You are responsible for maintaining the security
            of your account.
          </AccordionPanel>
        </AccordionItem>

        <Divider mb={6} borderColor={dividerColor} />

        {/* Section 2: Content Ownership */}
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight="bold" color={headingColor}>
                Content Ownership
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} color={descriptionColor}>
            All products, images, and trademarks on our app are owned by their
            respective brands. MeriCloset does not own third-party content and you
            may not distribute or modify it without permission.
          </AccordionPanel>
        </AccordionItem>

        <Divider mb={6} borderColor={dividerColor} />

        {/* Section 3: Limitation of Liability */}
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight="bold" color={headingColor}>
                Limitation of Liability
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} color={descriptionColor}>
            We are not liable for any damages arising from your use of MeriCloset,
            including data loss or interruptions. Use at your own risk; we do not
            guarantee the accuracy of third-party information.
          </AccordionPanel>
        </AccordionItem>

        <Divider mb={6} borderColor={dividerColor} />

        {/* Section 4: Termination */}
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight="bold" color={headingColor}>
                Termination
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} color={descriptionColor}>
            We reserve the right to suspend or terminate your account for violations
            of these terms. Upon termination, you must cease all use of our app.
          </AccordionPanel>
        </AccordionItem>

        <Divider mb={6} borderColor={dividerColor} />

        {/* Section 5: Changes to Terms */}
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight="bold" color={headingColor}>
                Changes to Terms
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} color={descriptionColor}>
            We may update these terms at any time. Continued use of MeriCloset
            indicates your acceptance of any changes.
          </AccordionPanel>
        </AccordionItem>

        <Divider mb={6} borderColor={dividerColor} />

        {/* New Section 6: User Responsibilities */}
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight="bold" color={headingColor}>
                User Responsibilities
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} color={descriptionColor}>
            You are responsible for the content you upload and share on MeriCloset.
            You must ensure that the content does not infringe upon any third-party rights.
          </AccordionPanel>
        </AccordionItem>

        <Divider mb={6} borderColor={dividerColor} />

        {/* New Section 7: Dispute Resolution */}
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight="bold" color={headingColor}>
                Dispute Resolution
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} color={descriptionColor}>
            In case of any disputes, we recommend contacting us first. If the issue is not
            resolved, the dispute will be handled according to the laws of the jurisdiction.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Text textAlign="center" mt={8}>
        Questions? Contact us at{" "}
        <Link href="mailto:saadamir070@gmail.com" color={linkColor}>
          Saadamir070@gmail.com
        </Link>
        .
      </Text>
    </Box>
  );
};

export default TermsOfService;