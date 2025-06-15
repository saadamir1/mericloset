import { 
  SimpleGrid, 
  Text, 
  Box, 
  Badge, 
  HStack, 
  VStack, 
  Icon, 
  useColorModeValue 
} from "@chakra-ui/react";
import { FaTag, FaRuler, FaPalette, FaCrown } from "react-icons/fa";
import Product from "../entities/Product";
import CriticScore from "./CriticScore";

interface Props {
  product: Product;
}

const ProductComponents = ({ product }: Props) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const iconColor = useColorModeValue("green.500", "green.300");

  const formatArray = (data: any) => {
    if (!data) return "N/A";
    
    if (Array.isArray(data)) {
      return data.join(',').replace(/[\[\]']/g, '').split(',').map(item => item.trim()).filter(item => item).join(', ');
    }
    
    return String(data).replace(/[\[\]']/g, '').split(',').map(item => item.trim()).filter(item => item).join(', ');
  };

  const AttributeCard = ({ icon, label, children }: any) => (
    <Box
      bg={cardBg}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="xl"
      p={4}
      transition="all 0.2s"
      _hover={{ transform: "translateY(-2px)", shadow: "md" }}
    >
      <VStack align="start" spacing={2}>
        <HStack spacing={2}>
          <Icon as={icon} color={iconColor} boxSize={4} />
          <Text fontSize="sm" fontWeight="semibold" color={textColor} textTransform="uppercase" letterSpacing="wide">
            {label}
          </Text>
        </HStack>
        <Box>
          {children}
        </Box>
      </VStack>
    </Box>
  );

  const SizeBadges = ({ sizes }: { sizes: string }) => {
    if (sizes === "N/A") return <Text color={textColor}>Not available</Text>;
    
    return (
      <HStack spacing={2} flexWrap="wrap">
        {sizes.split(', ').map((size, index) => (
          <Badge
            key={index}
            colorScheme="green"
            variant="solid"
            px={3}
            py={1}
            borderRadius="full"
            fontSize="sm"
            fontWeight="bold"
          >
            {size}
          </Badge>
        ))}
      </HStack>
    );
  };

  const ColorBadges = ({ colors }: { colors: string }) => {
    if (colors === "N/A") return <Text color={textColor}>Not available</Text>;
    
    return (
      <HStack spacing={2} flexWrap="wrap">
        {colors.split(', ').map((color, index) => (
          <Badge
            key={index}
            colorScheme="purple"
            variant="outline"
            px={3}
            py={1}
            borderRadius="full"
            fontSize="sm"
            fontWeight="medium"
            textTransform="capitalize"
          >
            {color}
          </Badge>
        ))}
      </HStack>
    );
  };

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mt={6}>
      <AttributeCard icon={FaTag} label="Price">
        <CriticScore price={product.price} />
      </AttributeCard>

      <AttributeCard icon={FaRuler} label="Available Sizes">
        <SizeBadges sizes={formatArray(product.sizes)} />
      </AttributeCard>

      <AttributeCard icon={FaCrown} label="Brand">
        <Text fontSize="lg" fontWeight="bold" color={iconColor}>
          {product.brand || "Unknown Brand"}
        </Text>
      </AttributeCard>

      <AttributeCard icon={FaPalette} label="Colors">
        <ColorBadges colors={formatArray(product.colors)} />
      </AttributeCard>
    </SimpleGrid>
  );
};

export default ProductComponents;