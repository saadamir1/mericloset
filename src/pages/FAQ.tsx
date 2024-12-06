import {
  Box,
  VStack,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Heading,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const FAQ = () => {
  // Define colors based on the current theme
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const headingColor = useColorModeValue("teal.700", "teal.300");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const linkColor = useColorModeValue("teal.500", "teal.200");
  const accordionBg = useColorModeValue("white", "gray.700");
  const accordionBorderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Box as="main" bg={bgColor} py={10} px={5} minHeight="100vh">
      <VStack spacing={8} maxWidth="800px" mx="auto">
        <Heading as="h1" size="2xl" color={headingColor} fontWeight="bold" textAlign="center">
          Frequently Asked Questions
        </Heading>

        <Accordion
          allowMultiple
          width="100%"
          bg={accordionBg}
          borderRadius="lg"
          shadow="lg"
          border="1px solid"
          borderColor={accordionBorderColor}
        >
          {/* Question 1 */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="semibold" fontSize="lg" color={headingColor}>
                  What types of clothes does MeriCloset offer?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} fontSize="md" lineHeight="1.8" color={textColor}>
              Currently, MeriCloset offers just men's shalwar kameez and kids' shalwar kameez. However, we are planning to gradually expand our collection in the near future. Stay tuned!
            </AccordionPanel>
          </AccordionItem>

          {/* Question 2 */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="semibold" fontSize="lg" color={headingColor}>
                  Does MeriCloset have a physical store?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} fontSize="md" lineHeight="1.8" color={textColor}>
              Currently, MeriCloset operates exclusively online. This allows us to keep costs low and pass the savings on to our customers. However, we ensure a seamless shopping experience with detailed product descriptions, size guides, and a flexible return policy.
            </AccordionPanel>
          </AccordionItem>

          {/* Question 3 */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="semibold" fontSize="lg" color={headingColor}>
                  Is MeriCloset secure and safe to shop from?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} fontSize="md" lineHeight="1.8" color={textColor}>
              Yes, MeriCloset is completely secure and safe. Our website uses industry-standard encryption to protect your personal and payment information. We also collaborate with trusted payment gateways to ensure a secure checkout process.
            </AccordionPanel>
          </AccordionItem>

          {/* Question 4 */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="semibold" fontSize="lg" color={headingColor}>
                  What is MeriCloset's return policy?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} fontSize="md" lineHeight="1.8" color={textColor}>
              MeriCloset offers a flexible 15-day return policy for all products, provided they are unworn and in their original packaging. To initiate a return, contact our customer support team for further assistance.
            </AccordionPanel>
          </AccordionItem>

          {/* Question 5 */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="semibold" fontSize="lg" color={headingColor}>
                  How do I track my order?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} fontSize="md" lineHeight="1.8" color={textColor}>
              Once your order is shipped, you will receive a tracking link via email or SMS. You can use this link to monitor the status of your delivery in real time.
            </AccordionPanel>
          </AccordionItem>

          {/* Question 6 */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="semibold" fontSize="lg" color={headingColor}>
                  How can I contact customer support?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} fontSize="md" lineHeight="1.8" color={textColor}>
              You can contact our customer support team by emailing us at support@mericloset.com or by filling out the contact form on our <Link as={RouterLink} to="/contact-us" color={linkColor}>Contact Us</Link> page.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        <Text fontSize="md" color={textColor} textAlign="center" mt={8}>
          Didn't find the answer you were looking for?{" "}
          <Link as={RouterLink} to="/contact-us" color={linkColor} fontWeight="medium" cursor="pointer">
            Contact us
          </Link>{" "}
          for more assistance.
        </Text>
      </VStack>
    </Box>
  );
};

export default FAQ;