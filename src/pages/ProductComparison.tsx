import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Image,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useToast,
  Badge,
  Skeleton,
  SkeletonText,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  HStack,
  VStack,
  Container,
} from "@chakra-ui/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaTrash, FaSearch } from "react-icons/fa";
import useComparedProducts from "../hooks/useComparedProducts";
import Product from "../entities/Product";
import userStore from "../userStore";
import axios from "axios";

const ProductComparisonPage = () => {
  const [searchParams] = useSearchParams();
  const productIds = searchParams.get("ids")?.split(",") || [];
  const { products, isLoading, error } = useComparedProducts(productIds);
  const [wishlistedIds, setWishlistedIds] = useState<string[]>([]);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const { user } = userStore();

  // Theme-based styling
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const tableHeaderBg = useColorModeValue("gray.50", "gray.700");
  const tableBorderColor = useColorModeValue("gray.200", "gray.600");
  const featureHeaderBg = useColorModeValue("gray.100", "gray.700");
  const headingColor = useColorModeValue("gray.800", "white");

  // Fetch wishlist data on component mount
  useEffect(() => {
    if (!user || products.length === 0) return;

    const fetchWishlist = async () => {
      setIsWishlistLoading(true);
      try {
        const { data } = await axios.get(`http://localhost:5170/api/v1/favorites/user/${user.id}`);
        const favoriteIds = data.map((fav: any) => fav.product._id);
        setWishlistedIds(favoriteIds);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setIsWishlistLoading(false);
      }
    };

    fetchWishlist();
  }, [user, products]);

  const handleRemoveProduct = (productId: string) => {
    const newProductIds = productIds.filter((id) => id !== productId);
    
    if (newProductIds.length > 0) {
      navigate(`/compare?ids=${newProductIds.join(",")}`);
    } else {
      navigate("/products"); // Redirect to products page if no products left
      toast({
        title: "All products removed",
        description: "You've removed all products from comparison",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleViewProduct = (slug: string) => {
    navigate(`/products/${slug}`);
  };

  const handleWishlistToggle = async (productId: string) => {
    if (!user || !user.id) {
      toast({
        title: "Please log in to manage your wishlist",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const isWishlisted = wishlistedIds.includes(productId);
    
    try {
      if (!isWishlisted) {
        await axios.post("http://localhost:5170/api/v1/favorites/add", {
          userId: user.id,
          productId: productId,
        });
        setWishlistedIds([...wishlistedIds, productId]);
        toast({
          title: "Added to wishlist",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } else {
        await axios.delete(
          `http://localhost:5170/api/v1/favorites/remove/${productId}/${user.id}`
        );
        setWishlistedIds(wishlistedIds.filter(id => id !== productId));
        toast({
          title: "Removed from wishlist",
          status: "info",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
      toast({
        title: "Error updating wishlist",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <Container maxW="container.xl" py={8}>
        <Heading as="h1" size="xl" mb={6}>Product Comparison</Heading>
        <Grid templateColumns={{ base: "1fr", md: `repeat(${Math.min(productIds.length, 3)}, 1fr)` }} gap={6}>
          {Array.from({ length: productIds.length || 2 }).map((_, index) => (
            <GridItem key={index}>
              <Box p={4} bg={cardBg} borderRadius="lg" boxShadow="sm" border="1px solid" borderColor={borderColor}>
                <Skeleton height="200px" mb={4} borderRadius="md" />
                <SkeletonText mt={2} noOfLines={2} spacing={2} />
                <Skeleton height="30px" mt={4} width="50%" />
                <Skeleton height="40px" mt={4} />
              </Box>
            </GridItem>
          ))}
        </Grid>
      </Container>
    );
  }

  // Error handling
  if (error || products.length === 0) {
    return (
      <Container maxW="container.xl" py={8}>
        <Alert
          status="error"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="200px"
          borderRadius="lg"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            Products Not Available
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            {error instanceof Error 
              ? error.message 
              : "No products were found for comparison. Please select products to compare."}
          </AlertDescription>
          <Button 
            mt={4} 
            colorScheme="green" 
            onClick={() => navigate("/products")}
          >
            Browse Products
          </Button>
        </Alert>
      </Container>
    );
  }

  // Function to render attribute value based on its type
  const renderAttributeValue = (product: Product, attribute: string) => {
    switch (attribute) {
      case "title":
        return product.title;
      case "brand":
        return product.brand;
      case "price":
        return `$${product.price.toFixed(2)}`;
      case "colors":
        return product.colors.length > 0 ? (
          <Flex wrap="wrap" gap={2} justifyContent="center">
            {product.colors.map((color, idx) => (
              <Badge key={idx} px={2} py={1} borderRadius="md" colorScheme="blue">
                {color}
              </Badge>
            ))}
          </Flex>
        ) : "N/A";
      case "sizes":
        return product.sizes.length > 0 ? (
          <Flex wrap="wrap" gap={2} justifyContent="center">
            {product.sizes.map((size, idx) => (
              <Badge key={idx} px={2} py={1} borderRadius="md" colorScheme="purple">
                {size}
              </Badge>
            ))}
          </Flex>
        ) : "N/A";
      case "category":
        return product.category || "N/A";
      default:
        return product[attribute as keyof Product]?.toString() || "N/A";
    }
  };

  const getAttributeLabel = (attribute: string) => {
    const labels: { [key: string]: string } = {
      title: "Product Name",
      brand: "Brand",
      price: "Price",
      colors: "Available Colors",
      sizes: "Available Sizes",
      category: "Category",
    };
    return labels[attribute] || attribute.charAt(0).toUpperCase() + attribute.slice(1);
  };

  // Get all possible attributes from the products
  const attributeCategories = [
    { name: "Basic Information", attributes: ["title", "brand", "price"] },
    { name: "Specifications", attributes: ["category", "colors", "sizes"] },
  ];

  return (
    <Container maxW="container.xl" py={8}>
      <Box mb={8}>
        <Heading as="h1" size="xl" color={headingColor} mb={2}>
          Product Comparison
        </Heading>
        <Text color="gray.600">
          Compare the features and specifications of your selected products
        </Text>
      </Box>

      {/* Products Grid View with equal height cards */}
      <Grid 
        templateColumns={{ 
          base: "1fr", 
          md: `repeat(${Math.min(products.length, 3)}, 1fr)` 
        }} 
        gap={6} 
        mb={10}
      >
        {products.map((product) => (
          <GridItem key={product.id}>
            <Box 
              p={4} 
              bg={cardBg} 
              borderRadius="lg" 
              boxShadow="sm" 
              border="1px solid" 
              borderColor={borderColor}
              position="relative"
              display="flex"
              flexDirection="column"
              height="100%"
            >
              <IconButton
                aria-label="Remove from comparison"
                icon={<FaTrash />}
                size="sm"
                position="absolute"
                top={3}
                right={3}
                colorScheme="red"
                variant="ghost"
                onClick={() => handleRemoveProduct(product.id)}
              />

              {/* Image with fixed height */}
              <Flex 
                height="220px" 
                alignItems="center" 
                justifyContent="center" 
                mb={4}
                overflow="hidden"
                borderRadius="md"
              >
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  maxHeight="200px"
                  objectFit="contain"
                  cursor="pointer"
                  onClick={() => handleViewProduct(product.id)}
                  transition="transform 0.3s"
                  _hover={{ transform: "scale(1.05)" }}
                />
              </Flex>
              
              {/* Fixed height for title section */}
              <VStack spacing={2} align="start" mb={4} minHeight="80px">
                <Heading 
                  as="h3" 
                  size="md" 
                  cursor="pointer" 
                  onClick={() => handleViewProduct(product.id)}
                  noOfLines={2}
                >
                  {product.title}
                </Heading>
                <Text fontWeight="medium" color="gray.600">
                  {product.brand}
                </Text>
              </VStack>
              
              {/* Price and Status */}
              <Flex justify="space-between" align="center" mb={4}>
                <Heading as="h4" size="lg" color={headingColor}>
                  ${product.price.toFixed(2)}
                </Heading>
                <Badge colorScheme="green" p={1}>
                  In Stock
                </Badge>
              </Flex>
              
              {/* View Button pushed to bottom */}
              <Button
                onClick={() => handleViewProduct(product.id)}
                leftIcon={<FaSearch />}
                colorScheme="green"
                variant="solid"
                size="md"
                mt="auto"
                width="100%"
              >
                View
              </Button>
            </Box>
          </GridItem>
        ))}
      </Grid>

      {/* Improved Comparison Table */}
      <Box 
        overflow="hidden" 
        bg={cardBg} 
        borderRadius="lg" 
        boxShadow="md" 
        border="1px solid" 
        borderColor={borderColor}
        mb={8}
      >
        <Table variant="simple" style={{ tableLayout: "fixed", width: "100%" }}>
          <Thead>
            <Tr>
              <Th 
                bg={featureHeaderBg} 
                borderBottom="2px solid" 
                borderColor={tableBorderColor}
                width="200px"
                textAlign="left"
              >
                FEATURE
              </Th>
              {products.map((product) => (
                <Th 
                  key={product.id} 
                  bg={featureHeaderBg} 
                  borderBottom="2px solid" 
                  borderColor={tableBorderColor}
                  textAlign="center"
                >
                  {product.title}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {/* Basic Information Section */}
            <Tr>
              <Td 
                colSpan={products.length + 1} 
                bg={tableHeaderBg} 
                fontWeight="bold"
              >
                Basic Information
              </Td>
            </Tr>
            <Tr>
              <Td fontWeight="medium">Product Name</Td>
              {products.map((product) => (
                <Td key={`${product.id}-title`} textAlign="center">
                  {product.title}
                </Td>
              ))}
            </Tr>
            <Tr>
              <Td fontWeight="medium">Brand</Td>
              {products.map((product) => (
                <Td key={`${product.id}-brand`} textAlign="center">
                  {product.brand}
                </Td>
              ))}
            </Tr>
            <Tr>
              <Td fontWeight="medium">Price</Td>
              {products.map((product) => (
                <Td key={`${product.id}-price`} textAlign="center" color="blue.600" fontWeight="bold">
                  ${product.price.toFixed(2)}
                </Td>
              ))}
            </Tr>

            {/* Specifications Section */}
            <Tr>
              <Td 
                colSpan={products.length + 1} 
                bg={tableHeaderBg} 
                fontWeight="bold"
              >
                Specifications
              </Td>
            </Tr>
            <Tr>
              <Td fontWeight="medium">Category</Td>
              {products.map((product) => (
                <Td key={`${product.id}-category`} textAlign="center">
                  {product.category || "N/A"}
                </Td>
              ))}
            </Tr>
            <Tr>
              <Td fontWeight="medium">Available Colors</Td>
              {products.map((product) => (
                <Td key={`${product.id}-colors`} textAlign="center">
                  <Flex wrap="wrap" gap={2} justifyContent="center">
                    {product.colors.map((color, idx) => (
                      <Badge key={idx} px={2} py={1} borderRadius="md" bg={color.toLowerCase()}>
                        {color}
                      </Badge>
                    ))}
                  </Flex>
                </Td>
              ))}
            </Tr>
            <Tr>
              <Td fontWeight="medium">Available Sizes</Td>
              {products.map((product) => (
                <Td key={`${product.id}-sizes`} textAlign="center">
                  <Flex wrap="wrap" gap={2} justifyContent="center">
                    {product.sizes && product.sizes.length > 0 ? (
                      product.sizes.map((size, idx) => (
                        <Badge key={idx} px={2} py={1} borderRadius="md" colorScheme="purple">
                          {size}
                        </Badge>
                      ))
                    ) : (
                      <Text>N/A</Text>
                    )}
                  </Flex>
                </Td>
              ))}
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </Container>
  );
};

export default ProductComparisonPage;