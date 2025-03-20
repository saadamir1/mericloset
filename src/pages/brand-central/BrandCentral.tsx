import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  InputGroup,
  InputLeftElement,
  Input,
  Select,
  Flex,
  Badge,
  Text,
  Card,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tooltip,
  Avatar,
  HStack,
  VStack,
  Divider,
  useToast,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel
} from "@chakra-ui/react";
import {
  EditIcon,
  DeleteIcon,
  SearchIcon,
  SettingsIcon,
  RepeatIcon,
  WarningIcon,
  CheckCircleIcon,
  TimeIcon,
  CalendarIcon,
  ViewIcon,
  AddIcon
} from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import userStore from "./../../userStore";

// Define interfaces based on MongoDB schemas
interface Brand {
  _id: string;
  id: string; // Virtual field from Mongoose
  name: string;
  description?: string;
  logoUrl?: string;
  website?: string;
  createdAt: Date;
  popularityIndex: number;
  slug: string;
}

interface Profile {
  firstName?: string;
  lastName?: string;
  gender?: 'male' | 'female' | 'non-binary' | 'other' | '';
  age?: number;
  measurements?: {
    height?: number;
    weight?: number;
    chest?: number;
    waist?: number;
  };
  preferences?: {
    style?: string;
    sustainability?: boolean;
    size?: string;
    color?: string;
    favoriteBrands?: string[];
    fitPreference?: string;
  };
}

interface User {
  _id: string;
  id: string; // Virtual field from Mongoose
  username: string;
  email: string;
  role: 'user' | 'admin' | 'brand';
  userProfile?: Profile;
  brandProfile?: Brand;
  createdAt: Date;
  updatedAt: Date;
}

interface Product {
  id: string;
  title: string;
  price: number;
  description?: string;
  images: string[];
  brand: string; // This is the brand ID
  brandId?: string; // Alternative property name
  views?: number;
  stock?: number;
  status?: string;
}

interface ProductStatus {
  color: string;
  label: string;
  icon: React.ReactNode;
}

interface BrandStats {
  totalProducts: number;
  activeProducts: number;
  lowStock: number;
  totalViews: number;
  pendingProducts: number;
}

const BrandCentral: React.FC = () => {
  const { data, fetchNextPage, hasNextPage, isLoading, isError, refetch } = useProducts();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const { user, token } = userStore();
  
  // Stats tracking
  const [brandStats, setBrandStats] = useState<BrandStats>({
    totalProducts: 0,
    activeProducts: 0,
    lowStock: 0,
    totalViews: 0,
    pendingProducts: 0
  });
  
  const toast = useToast();
  const currentUser = user as User; // Type assertion
  
  // Filter products to only show current brand's products
  useEffect(() => {
    if (data && currentUser) {
      calculateBrandStats();
    }
  }, [data, currentUser]);

  // Calculate dashboard stats
  const calculateBrandStats = () => {
    const brandProducts = getBrandProducts();
    
    setBrandStats({
      totalProducts: brandProducts.length,
      activeProducts: brandProducts.filter(p => getProductStatus(p) === "active").length,
      lowStock: brandProducts.filter(p => getProductStatus(p) === "low_stock" || getProductStatus(p) === "out_of_stock").length,
      totalViews: brandProducts.reduce((sum, product) => sum + (product.views || 0), 0),
      pendingProducts: brandProducts.filter(p => getProductStatus(p) === "pending").length
    });
  };

  // Get only products belonging to current brand
  const getBrandProducts = (): Product[] => {
    if (!data || !currentUser) return [];
    
    // Filter products by current user's brand ID
    return data.pages.flatMap(page => page.results)
      .filter(product => {
        // Check for both ways the brand might be referenced
        // If user has a brandProfile, match against its ID
        const userBrandId = currentUser.brandProfile?.id || currentUser.id;
        return product.brand === userBrandId || product.brand === userBrandId;
      });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(`http://localhost:5170/api/v1/products/${id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}` // Use token from store instead of localStorage
          }
        });
        
        if (response.ok) {
          toast({
            title: "Product deleted successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          refetch(); // Refresh product list
        } else {
          toast({
            title: "Failed to delete product",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        toast({
          title: "Network error",
          description: "Could not connect to the server",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  // Status for products - normally this would come from your API
  const getProductStatus = (product: Product): string => {
    const statuses = ["active", "pending", "low_stock", "out_of_stock"];
    // For demo purposes, assign statuses pseudo-randomly based on product ID
    const statusIndex = parseInt(product.id.charAt(product.id.length - 1)) % 4;
    return statuses[statusIndex];
  };

  // Get status badge color and label
  const getStatusBadge = (status: string): ProductStatus => {
    switch (status) {
      case "active":
        return { color: "green", label: "Active", icon: <CheckCircleIcon mr={1} /> };
      case "pending":
        return { color: "yellow", label: "Pending Review", icon: <TimeIcon mr={1} /> };
      case "low_stock":
        return { color: "orange", label: "Low Stock", icon: <WarningIcon mr={1} /> };
      case "out_of_stock":
        return { color: "red", label: "Out of Stock", icon: <WarningIcon mr={1} /> };
      default:
        return { color: "gray", label: "Unknown", icon: null };
    }
  };

  const filteredProducts = getBrandProducts()
    .filter((product) => 
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
      (filterStatus === "all" || getProductStatus(product) === filterStatus)
    );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.title.localeCompare(b.title);
    } else if (sortOrder === "desc") {
      return b.title.localeCompare(a.title);
    } else if (sortOrder === "price_high") {
      return b.price - a.price;
    } else if (sortOrder === "price_low") {
      return a.price - b.price;
    }
    return 0;
  });

  return (
    <Box bg="gray.50" minHeight="100vh">
      <Box p={6} bg="white" boxShadow="sm">
        <HStack spacing={4} align="center">
          <Heading size="lg">Brand Dashboard</Heading>
          <Flex flex={1} />
          <HStack spacing={2}>
            <Tooltip label="Refresh Data">
              <IconButton 
                icon={<RepeatIcon />} 
                aria-label="Refresh" 
                size="sm" 
                onClick={() => refetch()}
              />
            </Tooltip>
            <Tooltip label="Settings">
              <IconButton icon={<SettingsIcon />} aria-label="Settings" size="sm" />
            </Tooltip>
            {currentUser && (
              <HStack spacing={2} ml={4}>
                <Avatar 
                  size="sm" 
                  name={currentUser.brandProfile?.name || currentUser.username} 
                  src={currentUser.brandProfile?.logoUrl}
                  bg="purple.500" 
                />
                <Text fontWeight="medium">{currentUser.brandProfile?.name || currentUser.username}</Text>
              </HStack>
            )}
          </HStack>
        </HStack>
      </Box>

      <Box p={6}>
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6} mb={6}>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Total Products</StatLabel>
                <StatNumber>{brandStats.totalProducts}</StatNumber>
                <StatHelpText>In your catalog</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel color="green.500">Active Listings</StatLabel>
                <StatNumber>{brandStats.activeProducts}</StatNumber>
                <StatHelpText>Live on marketplace</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel color="orange.500">Inventory Alerts</StatLabel>
                <StatNumber>{brandStats.lowStock}</StatNumber>
                <StatHelpText>Low/out of stock items</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel color="blue.500">Total Views</StatLabel>
                <StatNumber>{brandStats.totalViews}</StatNumber>
                <StatHelpText>Product impressions</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </SimpleGrid>

        <Tabs variant="enclosed" colorScheme="purple" mb={6}>
          <TabList>
            <Tab>Products</Tab>
            <Tab>Analytics</Tab>
            <Tab>Settings</Tab>
          </TabList>

          <TabPanels>
            {/* PRODUCTS TAB */}
            <TabPanel px={0}>
              <Card>
                <CardBody>
                  <VStack spacing={4} align="stretch">
                    <HStack justify="space-between">
                      <Heading size="md">Product Inventory</Heading>
                      <Button 
                        as={Link} 
                        to="/brand/add-product" 
                        colorScheme="purple" 
                        size="sm"
                        leftIcon={<AddIcon />}
                      >
                        Add New Product
                      </Button>
                    </HStack>
                    <Divider />
                    <Flex direction={{ base: "column", md: "row" }} gap={4}>
                      <InputGroup>
                        <InputLeftElement pointerEvents="none">
                          <SearchIcon color="gray.300" />
                        </InputLeftElement>
                        <Input
                          placeholder="Search products..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </InputGroup>
                      <Select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        width={{ base: "full", md: "200px" }}
                      >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="pending">Pending Review</option>
                        <option value="low_stock">Low Stock</option>
                        <option value="out_of_stock">Out of Stock</option>
                      </Select>
                      <Select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        width={{ base: "full", md: "200px" }}
                      >
                        <option value="asc">Name (A-Z)</option>
                        <option value="desc">Name (Z-A)</option>
                        <option value="price_high">Price (High-Low)</option>
                        <option value="price_low">Price (Low-High)</option>
                      </Select>
                    </Flex>

                    {isLoading ? (
                      <Text p={4}>Loading products...</Text>
                    ) : isError ? (
                      <Text p={4} color="red.500">Error fetching products. Please try again.</Text>
                    ) : sortedProducts.length === 0 ? (
                      <VStack py={10} spacing={4}>
                        <Text>You haven't added any products yet.</Text>
                        <Button 
                          as={Link} 
                          to="/brand/add-product" 
                          colorScheme="purple"
                          leftIcon={<AddIcon />}
                        >
                          Add Your First Product
                        </Button>
                      </VStack>
                    ) : (
                      <Box overflowX="auto">
                        <Table variant="simple" colorScheme="gray">
                          <Thead bg="gray.50">
                            <Tr>
                              <Th>Product</Th>
                              <Th>Status</Th>
                              <Th isNumeric>Price</Th>
                              <Th isNumeric>Stock</Th>
                              <Th>Last Updated</Th>
                              <Th>Actions</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {sortedProducts.map((product) => {
                              const status = getProductStatus(product);
                              const statusBadge = getStatusBadge(status);
                              return (
                                <Tr key={product.id}>
                                  <Td>
                                    <HStack>
                                      <Avatar
                                        src={product.images[0]}
                                        name={product.title}
                                        size="sm"
                                      />
                                      <VStack align="start" spacing={0}>
                                        <Text fontWeight="medium">{product.title}</Text>
                                        <Text fontSize="xs" color="gray.500">
                                          ID: {product.id.substring(0, 8)}...
                                        </Text>
                                      </VStack>
                                    </HStack>
                                  </Td>
                                  <Td>
                                    <Badge 
                                      colorScheme={statusBadge.color} 
                                      display="flex" 
                                      alignItems="center"
                                      width="fit-content"
                                      px={2}
                                      py={1}
                                      borderRadius="full"
                                    >
                                      {statusBadge.icon}
                                      {statusBadge.label}
                                    </Badge>
                                  </Td>
                                  <Td isNumeric>${product.price.toFixed(2)}</Td>
                                  <Td isNumeric>
                                    {/* Mock stock numbers based on status */}
                                    {status === "active" ? Math.floor(Math.random() * 50) + 20 : 
                                     status === "low_stock" ? Math.floor(Math.random() * 5) + 1 : 
                                     status === "out_of_stock" ? 0 : "Pending"}
                                  </Td>
                                  <Td>
                                    <Text fontSize="sm" color="gray.600">
                                      <CalendarIcon mr={1} />
                                      {new Date().toLocaleDateString()}
                                    </Text>
                                  </Td>
                                  <Td>
                                    <Menu>
                                      <MenuButton
                                        as={Button}
                                        size="sm"
                                        variant="outline"
                                        rightIcon={<SettingsIcon />}
                                      >
                                        Actions
                                      </MenuButton>
                                      <MenuList>
                                        <MenuItem 
                                          icon={<EditIcon />}
                                          as={Link}
                                          to={`/brand/edit-product/${product.id}`}
                                        >
                                          Edit Details
                                        </MenuItem>
                                        <MenuItem icon={<ViewIcon />}>View Analytics</MenuItem>
                                        <MenuItem 
                                          icon={<DeleteIcon />} 
                                          color="red.500"
                                          onClick={() => handleDelete(product.id)}
                                        >
                                          Delete Product
                                        </MenuItem>
                                      </MenuList>
                                    </Menu>
                                  </Td>
                                </Tr>
                              );
                            })}
                          </Tbody>
                        </Table>
                      </Box>
                    )}

                    {hasNextPage && sortedProducts.length > 0 && (
                      <Button 
                        onClick={() => fetchNextPage()} 
                        isLoading={isLoading}
                        size="sm"
                        alignSelf="center"
                        mt={4}
                      >
                        Load More Products
                      </Button>
                    )}
                  </VStack>
                </CardBody>
              </Card>
            </TabPanel>

            {/* ANALYTICS TAB */}
            <TabPanel>
              <Card>
                <CardBody>
                  <Heading size="md" mb={4}>Product Analytics</Heading>
                  <Text color="gray.500">Analytics dashboard would appear here.</Text>
                </CardBody>
              </Card>
            </TabPanel>

            {/* SETTINGS TAB */}
            <TabPanel>
              <Card>
                <CardBody>
                  <Heading size="md" mb={4}>Brand Settings</Heading>
                  <Text color="gray.500">Brand settings interface would appear here.</Text>
                </CardBody>
              </Card>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default BrandCentral;