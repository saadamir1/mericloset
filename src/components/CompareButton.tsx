import { useState, useEffect } from "react";
import {
  Button,
  Box,
  Badge,
  Tooltip,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { FaBalanceScale } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useComparisonStore from "../comparisonStore";

const CompareButton = () => {
  const { comparedProductIds, clearComparison } = useComparisonStore();
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  // Color settings
  const buttonBg = useColorModeValue("blue.500", "blue.400");
  const badgeBg = useColorModeValue("blue.100", "blue.700");
  const badgeColor = useColorModeValue("blue.800", "blue.100");

  useEffect(() => {
    setShowButton(comparedProductIds.length > 0);
  }, [comparedProductIds]);

  const handleCompare = () => {
    if (comparedProductIds.length < 2) {
      toast({
        title: "Select more products",
        description: "Please select at least 2 products to compare",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    
    navigate(`/compare?ids=${comparedProductIds.join(',')}`);
  };

  const handleClear = (e: { stopPropagation: () => void; }) => {
    e.stopPropagation();
    clearComparison();
    toast({
      title: "Comparison cleared",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  if (!showButton) return null;

  return (
    <Box
      position="fixed"
      bottom="20px"
      right="20px"
      zIndex={10}
    >
      <Tooltip label="Compare selected products">
        <Button
          onClick={handleCompare}
          colorScheme="blue"
          size="lg"
          rightIcon={<FaBalanceScale />}
          boxShadow="lg"
          position="relative"
          pr={10}
          pl={5}
        >
          Compare Now
          <Badge
            position="absolute"
            top="-8px"
            right="-8px"
            borderRadius="full"
            bg={badgeBg}
            color={badgeColor}
            boxSize="24px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize="sm"
            fontWeight="bold"
            border="2px solid"
            borderColor={buttonBg}
          >
            {comparedProductIds.length}
          </Badge>
          <Box
            as="span"
            position="absolute"
            top="-10px"
            right="-10px"
            cursor="pointer"
            fontSize="xs"
            color="red.500"
            bg="white"
            borderRadius="full"
            w="18px"
            h="18px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            onClick={handleClear}
            border="1px solid"
            borderColor="red.500"
            fontWeight="bold"
          >
            ✕
          </Box>
        </Button>
      </Tooltip>
    </Box>
  );
};

export default CompareButton;