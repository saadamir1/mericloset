import React, { useState } from 'react';
import { Box, Text, Link, VStack, HStack, Icon, Input, Button, useToast, Flex } from '@chakra-ui/react';
import { FaInstagram, FaFacebookF, FaSnapchatGhost, FaPinterestP, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const toast = useToast();
  const year = new Date().getFullYear();

  const handleSubscribe = () => {
    if (email) {
      setIsSubscribed(true);
      toast({
        title: "Subscribed successfully!",
        description: "Our monthly clothes catalog will be sent to your email.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Please enter a valid email address.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box as="footer" bg="gray.800" color="gray.100" py={5} px={2} textAlign="center" position="relative">
      <VStack spacing={4}>
        <HStack justify="center" spacing={4}>
          <Link href="/about-us" fontSize="sm" _hover={{ textDecoration: 'underline' }}>
            About Us
          </Link>
          <Link href="/privacy-policy" fontSize="sm" _hover={{ textDecoration: 'underline' }}>
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" fontSize="sm" _hover={{ textDecoration: 'underline' }}>
            Terms of Service
          </Link>
          <Link href="/contact-us" fontSize="sm" _hover={{ textDecoration: 'underline' }}>
            Contact Us
          </Link>
        </HStack>

        {/* Social Media Icons */}
        <HStack justify="center" spacing={2}>
          <Link href="https://www.instagram.com/" isExternal>
            <Icon as={FaInstagram} w={6} h={6} _hover={{ color: 'white' }} />
          </Link>
          <Link href="https://www.facebook.com/" isExternal>
            <Icon as={FaFacebookF} w={6} h={6} _hover={{ color: 'white' }} />
          </Link>
          <Link href="https://www.snapchat.com/" isExternal>
            <Icon as={FaSnapchatGhost} w={6} h={6} _hover={{ color: 'white' }} />
          </Link>
          <Link href="https://www.pinterest.com/" isExternal>
            <Icon as={FaPinterestP} w={6} h={6} _hover={{ color: 'white' }} />
          </Link>
        </HStack>
      </VStack>

      {/* Quick Links and Account Section */}
      <HStack justify="center" spacing={16} mt={6}>
        <VStack spacing={1} align="flex-start" maxWidth="250px">
          <Text fontWeight="bold" color="white">Quick Links</Text>
          <Link href="/about-us" fontSize="sm" _hover={{ textDecoration: 'underline' }}>About</Link>
          <Link href="/contact-us" fontSize="sm" _hover={{ textDecoration: 'underline' }}>Contact</Link>
          <Link href="/faq" fontSize="sm" _hover={{ textDecoration: 'underline' }}>FAQ</Link>
        </VStack>

        <VStack spacing={1} align="flex-start" maxWidth="250px">
          <Text fontWeight="bold" color="white">Account</Text>
          <Link href="/my-account" fontSize="sm" _hover={{ textDecoration: 'underline' }}>My Account</Link>
          <Link href="/orders" fontSize="sm" _hover={{ textDecoration: 'underline' }}>Orders Tracking</Link>
          <Link href="/wishlist" fontSize="sm" _hover={{ textDecoration: 'underline' }}>Wishlist</Link>
        </VStack>

        {/* Newsletter Form Section */}
        <VStack spacing={2} align="flex-start">
          <Text fontWeight="bold" color="white">Newsletter</Text>
          <HStack>
            <Input
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="sm"
              width="200px"
              borderColor="gray.500"
              color="white"
              _placeholder={{ color: 'gray.400' }}
            />
            <Button colorScheme="teal" onClick={handleSubscribe} size="sm">
              Subscribe
            </Button>
          </HStack>
        </VStack>
      </HStack>

      {/* Footer Bottom Content */}
      <Flex justify="center" align="center" direction="column" mt={12}>
        <Text fontSize="sm">
          &copy; {year} MeriCloset. All rights reserved.
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;