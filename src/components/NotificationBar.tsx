import React, { useState, useEffect } from "react";
import { Box, Text, CloseButton } from "@chakra-ui/react";

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
        position="absolute"
        top={0}
        left={0}
        width="100%"
        bg="teal.500"
        color="white"
        p={2}
        textAlign="center"
        zIndex="1000"
      >
        <Text fontSize="sm" display="inline">
          {notificationMessage}
        </Text>
        <CloseButton
          size="sm"
          position="absolute"
          top="50%"
          right="10px"
          transform="translateY(-50%)"
          onClick={closeNotification}
        />
      </Box>
    )
  );
};

export default NotificationBar;
