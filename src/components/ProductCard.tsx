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
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaBalanceScale } from "react-icons/fa";
import axios from "axios";
import userStore from "../userStore";
import useComparisonStore from "../comparisonStore";

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
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const textColor = useColorModeValue("gray.900", "gray.100");
  const brandColor = useColorModeValue("gray.600", "gray.400");
  const priceColor = useColorModeValue("black", "white");
  const heartColor = isWishlisted ? "red.500" : useColorModeValue("gray.500", "gray.400");
  const compareColor = isInComparison(product.id) ? "blue.500" : useColorModeValue("gray.500", "gray.400");

  useEffect(() => {
    if (!user || hasFetched.current) return;
    hasFetched.current = true;

    const fetchFavorites = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5170/api/v1/favorites/user/${user.id}`);
        setIsWishlisted(data.some((fav: any) => fav.product._id === product.id));
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [product.id, user]);

  const handleWishlistToggle = async () => {
    if (!user || !user.id) {
      if (!toast.isActive("login-error")) {
        toast({
          id: "login-error", // Unique ID to prevent duplicates
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
        await axios.post("http://localhost:5170/api/v1/favorites/add", {
          userId: user.id,
          productId: product.id,
        });
        setIsWishlisted(true);
      } else {
        await axios.delete(
          `http://localhost:5170/api/v1/favorites/remove/${product.id}/${user.id}`
        );
        setIsWishlisted(false);
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  const handleCompareToggle = () => {
    const inComparison = isInComparison(product.id);
    
    if (inComparison) {
      removeFromComparison(product.id);
      toast({
        title: "Removed from comparison",
        status: "info",
        duration: 2000,
        isClosable: true,
      });
    } else {
      addToComparison(product.id);
      toast({
        title: "Added to comparison",
        description: "You can compare up to 3 products",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  
  // const handleCompareNow = () => {
  //   const comparedProductIds = useComparisonStore.getState().comparedProductIds;
  //   if (comparedProductIds.length > 1) {
  //     navigate(`/compare?ids=${comparedProductIds.join(',')}`);
  //   } else {
  //     toast({
  //       title: "Select more products",
  //       description: "Please select at least 2 products to compare",
  //       status: "warning",
  //       duration: 2000,
  //       isClosable: true,
  //     });
  //   }
  // };
  
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
      overflow="hidden"
    >
      <HStack position="absolute" top={2} right={2} zIndex="1" spacing={1}>
        <Tooltip label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}>
          <IconButton
            icon={<FaHeart size={20} />}
            color={loading ? "gray.300" : heartColor}
            aria-label="Add to wishlist"
            size="md"
            onClick={handleWishlistToggle}
            variant="ghost"
            transition="color 0.2s ease-in-out, transform 0.2s ease"
            _hover={{ color: "red.500", transform: "scale(1.1)" }}
          />
        </Tooltip>
        <Tooltip label={isInComparison(product.id) ? "Remove from comparison" : "Add to comparison"}>
          <IconButton
            icon={<FaBalanceScale size={20} />}
            color={compareColor}
            aria-label="Add to comparison"
            size="md"
            onClick={handleCompareToggle}
            variant="ghost"
            transition="color 0.2s ease-in-out, transform 0.2s ease"
            _hover={{ color: "blue.500", transform: "scale(1.1)" }}
          />
        </Tooltip>
      </HStack>
      
      {product.images.length > 0 && (
        <Image
          src={hovered && product.images[1] ? product.images[1] : product.images[0]}
          alt={product.title}
          height="240px"
          objectFit="cover"
          width="100%"
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