import React, { useState, useEffect } from "react";
import { Box, HStack, Text, CloseButton } from "@chakra-ui/react";
import { FaBullhorn } from "react-icons/fa";

const NotificationBar: React.FC = () => {
  const [showNotification, setShowNotification] = useState(true);
  const [notificationMessage, setNotificationMessage] = useState("");

  const closeNotification = () => {
    setShowNotification(false);
  };

  useEffect(() => {
    const messages = [
      "Discover Top Brands and Exclusive Collections in One Place!",
      "Trusted by Junaid Jamshed, Nishat, Bareez, and more.",
      "Join us and explore the latest fashion trends.",
      "Exclusive collections only a click away.",
      "Quality and trust in every product we offer.",
    ];

    const updateMessage = () => {
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      setNotificationMessage(randomMessage);
    };

    // Initial message set when component mounts
    updateMessage();

    // Change message every 10 seconds
    const messageInterval = setInterval(updateMessage, 10000);

    // Clean up the interval when component unmounts
    return () => clearInterval(messageInterval);
  }, []);

  return (
    showNotification && (
      <Box
        position="relative"
        width="100%"
        minH="34px"
        bgGradient="linear(to-r, teal.700, teal.500)"
        color="white"
        px={{ base: 10, md: 12 }}
        py={2}
        textAlign="center"
        // NOTE: no position/top/zIndex here anymore. This bar and NavBar are
        // wrapped together in ONE sticky container in Layout.tsx, so they
        // always move as a single unit. That's what was causing the overlap:
        // this was sticky on its own (top: 0) while NavBar was separately
        // sticky at a hardcoded top: "34px" — the moment this bar's height
        // changed (closed, wrapped to 2 lines on small screens, font change)
        // or its stacking order shifted, NavBar's fixed 34px offset no
        // longer matched reality, so NavBar either overlapped this bar or
        // left an empty gap above itself.
      >
        <HStack spacing={2} justify="center">
          <Box as={FaBullhorn} fontSize="xs" opacity={0.85} />
          <Text fontSize="sm" fontWeight="medium">
            {notificationMessage}
          </Text>
        </HStack>
        <CloseButton
          size="sm"
          borderRadius="full"
          position="absolute"
          top="50%"
          right={{ base: 2, md: 5 }}
          transform="translateY(-50%)"
          _hover={{ bg: "whiteAlpha.300" }}
          onClick={closeNotification}
        />
      </Box>
    )
  );
};

export default NotificationBar;