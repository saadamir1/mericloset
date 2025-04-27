import React from 'react';
import { Box, Text, VStack, HStack, Image, useColorModeValue } from '@chakra-ui/react';
import AmmarBinYasirImg from '../assets/profiles/AmmarBinYasir.jpg'; 
import SaadAmirImg from '../assets/profiles/SaadAmir.jpeg';
import TalhaTanveerImg from '../assets/profiles/TalhaTanveer.jpg';

const AboutPage: React.FC = () => {
  // Set colors based on theme (light or dark).
  const sectionBgColor = useColorModeValue("gray.50", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const headingColor = useColorModeValue("teal.500", "teal.300");
  const descriptionColor = useColorModeValue("gray.600", "gray.400");
  const boxBgColor = useColorModeValue("white", "gray.700");
  const boxShadowColor = useColorModeValue("rgba(0, 0, 0, 0.1)", "rgba(0, 0, 0, 0.5)");

  return (
    <Box as="section" bg={sectionBgColor} color={textColor} py={{ base: 8, md: 10 }} px={{ base: 6, md: 8 }} textAlign="center">
      <VStack spacing={8} align="center">
        {/* About Text Section */}
        <Box maxWidth="800px" mx="auto">
          <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold" color={headingColor}>
            About Our Brand
          </Text>
          <Text fontSize={{ base: "md", md: "lg" }} mt={4} color={descriptionColor} lineHeight={1.8}>
            At MeriCloset, we are passionate about bringing you the best in fashion.
            Our journey started in 2020 when we began exploring the fashion industry
            and quickly realized our passion for creating high-quality, stylish clothing.
            We combine comfort, style, and durability to create pieces that you'll love to wear.
          </Text>
        </Box>

        {/* Our Journey Timeline */}
        <Box maxWidth="900px" mx="auto" py={{ base: 6, md: 8 }}>
          <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" color={headingColor}>
            Our Journey
          </Text>
          <VStack spacing={6} mt={4} align="stretch">
            {[ 
              { year: "2020", description: "We just got into university and started our journey in the fashion industry." },
              { year: "2021", description: "We focused on building our design and coding skills to establish our online presence." },
              { year: "2022", description: "Our brand started gaining recognition, and we expanded our product range." },
              { year: "2023", description: "We faced challenges but came back stronger, learning from our experiences." },
            ].map((event, index) => (
              <Box
                key={index}
                bg={boxBgColor}
                p={6}
                borderRadius="lg"
                shadow={boxShadowColor}
                _hover={{ transform: "scale(1.03)", transition: "all 0.3s ease-in-out" }}
              >
                <HStack justify="space-between">
                  <Text fontWeight="bold" color={headingColor} fontSize="xl">
                    {event.year}
                  </Text>
                  <Box>
                    <Text color={descriptionColor} fontSize="md">{event.description}</Text>
                  </Box>
                </HStack>
              </Box>
            ))}
          </VStack>
        </Box>

        {/* Meet Our Founders Section */}
        <Box maxWidth="1200px" mx="auto" py={{ base: 6, md: 10 }}>
          <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" color={headingColor}>
            Meet Our Founders
          </Text>
          <HStack spacing={10} mt={6} justify="center">
            {/* CEO */}
            <VStack spacing={4} align="center">
              <Image
                borderRadius="full"
                boxSize="150px"
                src={AmmarBinYasirImg} 
                alt="Ammar Bin Yasir"
              />
              <Text fontWeight="bold" color={textColor}>Ammar Bin Yasir</Text>
              <Text color={descriptionColor}>CEO</Text>
            </VStack>

            {/* CTO */}
            <VStack spacing={4} align="center">
              <Image
                borderRadius="full"
                boxSize="150px"
                src={SaadAmirImg} 
                alt="Saad Amir"
              />
              <Text fontWeight="bold" color={textColor}>Saad Amir</Text>
              <Text color={descriptionColor}>CTO</Text>
            </VStack>

            {/* CFO */}
            <VStack spacing={4} align="center">
              <Image
                borderRadius="full"
                boxSize="150px"
                src={TalhaTanveerImg} 
                alt="Talha Tanveer"
              />
              <Text fontWeight="bold" color={textColor}>Talha Tanveer</Text>
              <Text color={descriptionColor}>CFO</Text>
            </VStack>
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default AboutPage;