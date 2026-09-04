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
  useToast,
  HStack,
  Tooltip,
  Box,
  Badge,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaHeart, FaBalanceScale } from "react-icons/fa";
import axios from "axios";
import userStore from "../userStore";
import useComparisonStore from "../comparisonStore";
import { API_BASE, mediaUrl } from "../config";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const { user } = userStore();
  const { addToComparison, removeFromComparison, isInComparison } = useComparisonStore();
  const [hovered, setHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);
  const toast = useToast();

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("blackAlpha.100", "whiteAlpha.200");
  const textColor = useColorModeValue("ink.800", "gray.100");
  const brandColor = useColorModeValue("gray.500", "gray.400");
  const priceColor = useColorModeValue("ink.900", "white");
  const mutedHeart = useColorModeValue("gray.400", "gray.500");
  const mutedCompare = useColorModeValue("gray.400", "gray.500");
  const actionBg = useColorModeValue("whiteAlpha.900", "blackAlpha.600");
  const heartColor = isWishlisted ? "red.400" : mutedHeart;
  const compareColor = isInComparison(product.id) ? "brand.500" : mutedCompare;

  const img0 = mediaUrl(product.images?.[0] || "");
  const img1 = mediaUrl(product.images?.[1] || "");

  useEffect(() => {
    if (!user?.id || hasFetched.current) {
      setLoading(false);
      return;
    }
    hasFetched.current = true;

    const fetchFavorites = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/favorites/user/${user.id}`);
        setIsWishlisted(data.some((fav: any) => fav.product?._id === product.id));
      } catch {
        /* ignore */
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [product.id, user]);

  const handleWishlistToggle = async () => {
    if (!user?.id) {
      if (!toast.isActive("login-error")) {
        toast({
          id: "login-error",
          title: "Please log in to manage your wishlist.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
      return;
    }

    try {
      if (!isWishlisted) {
        await axios.post(`${API_BASE}/favorites/add`, {
          userId: user.id,
          productId: product.id,
        });
        setIsWishlisted(true);
      } else {
        await axios.delete(`${API_BASE}/favorites/remove/${product.id}/${user.id}`);
        setIsWishlisted(false);
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  const handleCompareToggle = () => {
    if (isInComparison(product.id)) {
      removeFromComparison(product.id);
      toast({ title: "Removed from comparison", status: "info", duration: 1600, isClosable: true });
    } else {
      addToComparison(product.id);
      toast({
        title: "Added to comparison",
        description: "Compare up to 3 products",
        status: "success",
        duration: 1600,
        isClosable: true,
      });
    }
  };

  return (
    <Card
      height="100%"
      minH="380px"
      boxShadow="sm"
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="2xl"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      position="relative"
      overflow="hidden"
      transition="transform .2s, box-shadow .2s"
      _hover={{ transform: "translateY(-4px)", boxShadow: "lg" }}
    >
      <HStack position="absolute" top={3} right={3} zIndex="1" spacing={1}>
        <Tooltip label={isWishlisted ? "Remove from wishlist" : "Wishlist"}>
          <IconButton
            icon={<FaHeart />}
            color={loading ? "gray.300" : heartColor}
            aria-label="Wishlist"
            size="sm"
            onClick={handleWishlistToggle}
            variant="solid"
            bg={actionBg}
            borderRadius="full"
          />
        </Tooltip>
        <Tooltip label={isInComparison(product.id) ? "Remove compare" : "Compare"}>
          <IconButton
            icon={<FaBalanceScale />}
            color={compareColor}
            aria-label="Compare"
            size="sm"
            onClick={handleCompareToggle}
            variant="solid"
            bg={actionBg}
            borderRadius="full"
          />
        </Tooltip>
      </HStack>

      <Box overflow="hidden">
        {(img0 || product.images?.length > 0) && (
          <Image
            src={hovered && img1 ? img1 : img0 || product.images[0]}
            alt={product.title}
            height="240px"
            objectFit="cover"
            width="100%"
            transition="0.35s ease"
            transform={hovered ? "scale(1.04)" : "scale(1)"}
          />
        )}
      </Box>
      <CardBody pt={4}>
        <Badge colorScheme="brand" mb={2} borderRadius="full" px={2}>
          {product.stockStatus || "In stock"}
        </Badge>
        <Heading fontSize="md" textAlign="left" noOfLines={2} color={textColor} minH="2.6em">
          <Link to={`/products/${product.id}`}>{product.title}</Link>
        </Heading>
        <Text color={brandColor} fontSize="sm" noOfLines={1} mt={1}>
          {typeof product.brand === "string" ? product.brand : (product.brand as any)?.name}
        </Text>
        <Text fontWeight="700" fontSize="lg" color={priceColor} mt={2}>
          Rs. {Math.floor(product.price)}
        </Text>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
