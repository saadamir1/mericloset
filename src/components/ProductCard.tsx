import { useState, useEffect, useRef } from "react";
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
import axios from "axios";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const [hovered, setHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false); // ✅ Prevents re-fetching

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const textColor = useColorModeValue("gray.900", "gray.100");
  const brandColor = useColorModeValue("gray.600", "gray.400");
  const priceColor = useColorModeValue("black", "white");

  // Dynamic heart color
  const heartColor = isWishlisted ? "red.500" : useColorModeValue("gray.500", "gray.400");

  // ✅ **Prevent Infinite API Calls**
  useEffect(() => {
    if (hasFetched.current) return; // Prevent duplicate API calls
    hasFetched.current = true; // ✅ Mark as fetched to prevent loop

    const checkWishlistStatus = async () => {
      console.log(`Checking wishlist status for product ID: ${product.id}`);
      try {
        const { data } = await axios.get("http://localhost:5170/api/v1/favorites/user");
        console.log("Fetched Wishlist Data:", data);

        const isFavorite = data.some((fav: any) => fav.product._id === product.id);
        console.log(`Product ${product.id} is in wishlist:`, isFavorite);
        setIsWishlisted(isFavorite);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setLoading(false);
      }
    };

    checkWishlistStatus();
  }, [product.id]); // ✅ Only runs when `product.id` changes

  // ✅ **Handle Wishlist Toggle**
  const handleWishlistToggle = async () => {
    console.log(`Toggling wishlist for product ID: ${product.id}. Currently wishlisted: ${isWishlisted}`);
    try {
      if (!isWishlisted) {
        console.log("Sending request to ADD to wishlist...");
        const response = await axios.post("http://localhost:5170/api/v1/favorites/add", {
          productId: product.id,
        });
        console.log("Product added to wishlist!", response.data);
        setIsWishlisted(true);
      } else {
        console.log("Sending request to REMOVE from wishlist...");
        const response = await axios.delete(
          `http://localhost:5170/api/v1/favorites/remove/${product.id}`
        );
        console.log("Product removed from wishlist!", response.data);
        setIsWishlisted(false);
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

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
        icon={<FaHeart size={20} />}
        color={loading ? "gray.300" : heartColor} // Set color to gray while loading
        aria-label="Add to wishlist"
        position="absolute"
        top={2}
        right={2}
        size="md"
        onClick={handleWishlistToggle}
        variant="ghost"
        transition="color 0.2s ease-in-out, transform 0.2s ease"
        _hover={{ color: "red.500", transform: "scale(1.1)" }}
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
