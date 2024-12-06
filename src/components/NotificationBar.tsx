import React from "react";
import { Box, Text, CloseButton } from "@chakra-ui/react";

interface NotificationBarProps {
  message: string; // Define 'message' type as 'string'
  onClose: () => void; // Define 'onClose' as a function that returns 'void'
}

const NotificationBar: React.FC<NotificationBarProps> = ({ message, onClose }) => {
  return (
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
        {message}
      </Text>
      <CloseButton
        size="sm"
        position="absolute"
        top="50%"
        right="10px"
        transform="translateY(-50%)"
        onClick={onClose}
      />
    </Box>
  );
};

export default NotificationBar;
