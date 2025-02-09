import { useState } from "react";
import Product from "../entities/Product";
import {
  Card,
  CardBody,
  Text,
  Heading,
  Image,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const [hovered, setHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const textColor = useColorModeValue("gray.900", "gray.100");
  const brandColor = useColorModeValue("gray.600", "gray.400");
  const priceColor = useColorModeValue("black", "white");

  // Dynamic heart color
  const heartColor = isWishlisted ? "red.500" : useColorModeValue("gray.500", "gray.400");

  return (
    <Card
      height="390px"
      boxShadow="lg"
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="md"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      position="relative"
    >
      <IconButton
        icon={<FaHeart size={20} />} // Increased heart size
        color={heartColor}
        aria-label="Add to wishlist"
        position="absolute"
        top={2}
        right={2}
        size="md" // Made the button a bit larger
        onClick={() => setIsWishlisted(!isWishlisted)}
        variant="ghost"
        transition="color 0.2s ease-in-out, transform 0.2s ease"
        _hover={{ color: "red.500", transform: "scale(1.1)" }} // Subtle scale effect on hover
        _dark={{
          color: isWishlisted ? "red.400" : "gray.500",
          _hover: { color: "red.500", transform: "scale(1.1)" },
        }}
      />
      {product.images.length > 0 && (
        <Image
          src={hovered && product.images[1] ? product.images[1] : product.images[0]}
          alt={product.title}
          height="280px"
          objectFit="cover"
          borderTopRadius="md"
          transition="0.3s ease"
        />
      )}
      <CardBody>
        <Heading fontSize={{ base: "lg", md: "xl" }} textAlign="left" noOfLines={1} color={textColor}>
          <Link to={`/products/${product.id}`}>{product.title}</Link>
        </Heading>
        <Text color={brandColor} fontSize="sm" noOfLines={1}>
          {product.brand}
        </Text>
        <Text fontWeight="bold" fontSize="xl" color={priceColor}>
          Rs. {Math.floor(product.price)}
        </Text>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
