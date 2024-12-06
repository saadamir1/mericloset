import { Box, Flex, Text, Icon, useColorModeValue } from "@chakra-ui/react";
import { FaShippingFast, FaRegClock, FaUndo } from "react-icons/fa";

const InfoSection = () => {
  
  const textColor = useColorModeValue("gray.900", "white");
  const subTextColor = useColorModeValue("gray.600", "gray.400");

  return (
    <Flex
      direction={{ base: "column", lg: "row" }}
      justify="space-evenly"
      align="center"
      bg="transparent"
      p={6}
      mt={0} 
      position="relative"
    >
      <Box textAlign="center" p={3}>
        <Icon as={FaShippingFast} boxSize={8} color="green.500" />
        <Text mt={3} fontWeight="bold" fontSize={{ base: "lg", lg: "xl" }} color={textColor}>
          Free Shipping
        </Text>
        <Text fontSize="md" color={subTextColor}>For orders over $50</Text>
      </Box>
      <Box textAlign="center" p={3}>
        <Icon as={FaUndo} boxSize={8} color="red.500" />
        <Text mt={3} fontWeight="bold" fontSize={{ base: "lg", lg: "xl" }} color={textColor}>
          Money Back Guarantee
        </Text>
        <Text fontSize="md" color={subTextColor}>If goods are defective</Text>
      </Box>
      <Box textAlign="center" p={3}>
        <Icon as={FaRegClock} boxSize={8} color="blue.500" />
        <Text mt={3} fontWeight="bold" fontSize={{ base: "lg", lg: "xl" }} color={textColor}>
          Online Support 24/7
        </Text>
        <Text fontSize="md" color={subTextColor}>Dedicated support</Text>
      </Box>
    </Flex>
  );
};

export default InfoSection;