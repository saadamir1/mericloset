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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
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
  AtSignIcon,
  InfoIcon
} from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import Product from "entities/Product";

const AdminCentral: React.FC = () => {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  
  // User management states
  const [users, setUsers] = useState<SelectedUser[]>([]);
  const [customers, setCustomers] = useState<SelectedUser[]>([]);
  const [brands, setBrands] = useState<SelectedUser[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [brandSearchTerm, setBrandSearchTerm] = useState("");
  interface UserProfile {
    firstName?: string;
    lastName?: string;
    gender?: string;
    age?: number;
    measurements?: {
      height?: number;
      weight?: number;
      chest?: number;
      waist?: number;
    };
    preferences?: {
      style?: string;
      size?: string;
      color?: string;
      fitPreference?: string;
      sustainability?: boolean;
    };
  }
  
  interface BrandProfile {
    name?: string;
    slug?: string;
    logoUrl?: string;
    website?: string;
    popularityIndex?: number;
    description?: string;
  }
  
  interface SelectedUser {
    id: string;
    username: string;
    email: string;
    role: 'user' | 'brand';
    createdAt: string;
    updatedAt: string;
    userProfile?: UserProfile;
    brandProfile?: BrandProfile;
  }
  
  const [selectedUser, setSelectedUser] = useState<SelectedUser | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const toast = useToast();

  // Mock data for admin dashboard
  const dashboardStats = {
    totalProducts: data?.pages.flatMap((page) => page.results).length || 0,
    totalCustomers: customers.length || 0,
    totalBrands: brands.length || 0,
    pendingApproval: 8,
  };

  // Fetch all users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Process users into separate lists
  useEffect(() => {
    if (users.length > 0) {
      setCustomers(users.filter(user => user.role === 'user'));
      setBrands(users.filter(user => user.role === 'brand'));
    }
  }, [users]);

  // Fetch users from API
  const fetchUsers = async () => {
    setIsLoadingUsers(true);
    try {
      const response = await fetch('http://localhost:5170/api/v1/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        toast({
          title: "Error fetching users",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast({
        title: "Network error",
        description: "Could not connect to the server",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoadingUsers(false);
    }
  };

  // Delete user function
  const handleDeleteUser = async (userId: string, role: string) => {
    if (window.confirm(`Are you sure you want to delete this ${role === 'user' ? 'customer' : 'brand'}?`)) {
      try {
        const response = await fetch(`http://localhost:5170/api/v1/users/${userId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          toast({
            title: `${role === 'user' ? 'Customer' : 'Brand'} deleted successfully`,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          fetchUsers(); // Refresh the user list
        } else {
          toast({
            title: "Deletion failed",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.error(`Error deleting ${role}:`, error);
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

  // View user details
  const viewUserDetails = async (userId: string) => {
    try {
      const response = await fetch(`http://localhost:5170/api/v1/users/${userId}`);
      if (response.ok) {
        const userData = await response.json();
        setSelectedUser(userData);
        onOpen();
      } else {
        toast({
          title: "Error fetching user details",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      toast({
        title: "Network error",
        description: "Could not connect to the server",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Product management functions
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(`http://localhost:5170/api/v1/products/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          toast({
            title: "Product deleted successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
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
  const getProductStatus = (product: Product) => {
    const statuses = ["active", "pending", "low_stock", "out_of_stock"];
    // For demo purposes, assign statuses pseudo-randomly based on product ID
    const statusIndex = parseInt(product.id.charAt(product.id.length - 1)) % 4;
    return statuses[statusIndex];
  };

  // Get status badge color and label
  const getStatusBadge = (status: string) => {
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

  // Filter products by status and search term
  const filteredProducts = data?.pages.flatMap((page) => page.results)
    .filter((product) => 
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
      (filterStatus === "all" || getProductStatus(product) === filterStatus)
    );

  const sortedProducts = filteredProducts?.sort((a, b) => {
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

  // Filter customers and brands by search term
  const filteredCustomers = customers.filter(customer => 
    customer.username?.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(userSearchTerm.toLowerCase())
  );

  const filteredBrands = brands.filter(brand => 
    brand.username.toLowerCase().includes(brandSearchTerm.toLowerCase()) ||
    brand.email.toLowerCase().includes(brandSearchTerm.toLowerCase()) ||
    (brand.brandProfile?.name && brand.brandProfile.name.toLowerCase().includes(brandSearchTerm.toLowerCase()))
  );

  // Format date for display
  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <Box bg="gray.50" minHeight="100vh">
      <Box p={6} bg="white" boxShadow="sm">
        <HStack spacing={4} align="center">
          <Heading size="lg">Admin Dashboard</Heading>
          <Flex flex={1} />
          <HStack spacing={2}>
            <Tooltip label="Refresh Data">
              <IconButton 
                icon={<RepeatIcon />} 
                aria-label="Refresh" 
                size="sm" 
                onClick={fetchUsers}
              />
            </Tooltip>
            <Tooltip label="Settings">
              <IconButton icon={<SettingsIcon />} aria-label="Settings" size="sm" />
            </Tooltip>
            <HStack spacing={2} ml={4}>
              <Avatar size="sm" name="Admin User" bg="teal.500" />
              <Text fontWeight="medium">Admin User</Text>
            </HStack>
          </HStack>
        </HStack>
      </Box>

      <Box p={6}>
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6} mb={6}>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Total Products</StatLabel>
                <StatNumber>{dashboardStats.totalProducts}</StatNumber>
                <StatHelpText>In catalog</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel color="blue.500">Total Customers</StatLabel>
                <StatNumber>{dashboardStats.totalCustomers}</StatNumber>
                <StatHelpText>Registered users</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel color="purple.500">Total Brands</StatLabel>
                <StatNumber>{dashboardStats.totalBrands}</StatNumber>
                <StatHelpText>Seller accounts</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel color="yellow.500">Pending Approval</StatLabel>
                <StatNumber>{dashboardStats.pendingApproval}</StatNumber>
                <StatHelpText>Needs review</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </SimpleGrid>

        <Tabs variant="enclosed" colorScheme="teal" mb={6}>
          <TabList>
            <Tab>Products</Tab>
            <Tab>Customers</Tab>
            <Tab>Brands</Tab>
            <Tab>Reports</Tab>
          </TabList>

          <TabPanels>
            {/* PRODUCTS TAB */}
            <TabPanel px={0}>
              <Card>
                <CardBody>
                  <VStack spacing={4} align="stretch">
                    <HStack justify="space-between">
                      <Heading size="md">Product Inventory</Heading>
                      <Button as={Link} to="/Admin/add-product" colorScheme="teal" size="sm">
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
                      <Text>Loading products...</Text>
                    ) : isError ? (
                      <Text color="red.500">Error fetching products. Please try again.</Text>
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
                            {sortedProducts?.map((product) => {
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
                                          to={`/Admin/edit-product/${product.id}`}
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

                    {hasNextPage && (
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

            {/* CUSTOMERS TAB */}
            <TabPanel px={0}>
              <Card>
                <CardBody>
                  <VStack spacing={4} align="stretch">
                    <HStack justify="space-between">
                      <Heading size="md">Customer Management</Heading>
                    </HStack>
                    <Divider />
                    <Flex direction={{ base: "column", md: "row" }} gap={4}>
                      <InputGroup>
                        <InputLeftElement pointerEvents="none">
                          <SearchIcon color="gray.300" />
                        </InputLeftElement>
                        <Input
                          placeholder="Search customers by username or email..."
                          value={userSearchTerm}
                          onChange={(e) => setUserSearchTerm(e.target.value)}
                        />
                      </InputGroup>
                    </Flex>

                    {isLoadingUsers ? (
                      <Text>Loading customers...</Text>
                    ) : (
                      <Box overflowX="auto">
                        <Table variant="simple" colorScheme="gray">
                          <Thead bg="gray.50">
                            <Tr>
                              <Th>Username</Th>
                              <Th>Email</Th>
                              <Th>Profile Status</Th>
                              <Th>Joined</Th>
                              <Th>Actions</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {filteredCustomers.map((customer) => (
                              <Tr key={customer.id}>
                                <Td>
                                  <HStack>
                                    <Avatar
                                      name={customer.username}
                                      size="sm"
                                      bg="blue.500"
                                    />
                                    <Text fontWeight="medium">{customer.username}</Text>
                                  </HStack>
                                </Td>
                                <Td>
                                  <Text>
                                    <AtSignIcon mr={1} />
                                    {customer.email}
                                  </Text>
                                </Td>
                                <Td>
                                  <Badge 
                                    colorScheme={customer.userProfile ? "green" : "yellow"} 
                                    borderRadius="full"
                                    px={2}
                                    py={1}
                                  >
                                    {customer.userProfile ? "Complete" : "Incomplete"}
                                  </Badge>
                                </Td>
                                <Td>
                                  <Text fontSize="sm" color="gray.600">
                                    {formatDate(customer.createdAt)}
                                  </Text>
                                </Td>
                                <Td>
                                  <HStack spacing={2}>
                                    <IconButton
                                      aria-label="View details"
                                      icon={<InfoIcon />}
                                      size="sm"
                                      colorScheme="blue"
                                      onClick={() => viewUserDetails(customer.id)}
                                    />
                                    <IconButton
                                      aria-label="Delete user"
                                      icon={<DeleteIcon />}
                                      size="sm"
                                      colorScheme="red"
                                      onClick={() => handleDeleteUser(customer.id, 'user')}
                                    />
                                  </HStack>
                                </Td>
                              </Tr>
                            ))}
                          </Tbody>
                        </Table>
                      </Box>
                    )}
                  </VStack>
                </CardBody>
              </Card>
            </TabPanel>

            {/* BRANDS TAB */}
            <TabPanel px={0}>
              <Card>
                <CardBody>
                  <VStack spacing={4} align="stretch">
                    <HStack justify="space-between">
                      <Heading size="md">Brand Management</Heading>
                    </HStack>
                    <Divider />
                    <Flex direction={{ base: "column", md: "row" }} gap={4}>
                      <InputGroup>
                        <InputLeftElement pointerEvents="none">
                          <SearchIcon color="gray.300" />
                        </InputLeftElement>
                        <Input
                          placeholder="Search brands by name, username or email..."
                          value={brandSearchTerm}
                          onChange={(e) => setBrandSearchTerm(e.target.value)}
                        />
                      </InputGroup>
                    </Flex>

                    {isLoadingUsers ? (
                      <Text>Loading brands...</Text>
                    ) : (
                      <Box overflowX="auto">
                        <Table variant="simple" colorScheme="gray">
                          <Thead bg="gray.50">
                            <Tr>
                              <Th>Brand</Th>
                              <Th>Username</Th>
                              <Th>Email</Th>
                              <Th>Website</Th>
                              <Th>Joined</Th>
                              <Th>Actions</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {filteredBrands.map((brand) => (
                              <Tr key={brand.id}>
                                <Td>
                                  <HStack>
                                    <Avatar
                                      src={brand.brandProfile?.logoUrl}
                                      name={brand.brandProfile?.name || brand.username}
                                      size="sm"
                                      bg="purple.500"
                                    />
                                    <VStack align="start" spacing={0}>
                                      <Text fontWeight="medium">
                                        {brand.brandProfile?.name || "Unnamed Brand"}
                                      </Text>
                                      <Text fontSize="xs" color="gray.500">
                                        {brand.brandProfile?.slug || "No slug"}
                                      </Text>
                                    </VStack>
                                  </HStack>
                                </Td>
                                <Td>{brand.username}</Td>
                                <Td>{brand.email}</Td>
                                <Td>
                                  {brand.brandProfile?.website ? (
                                    <a href={brand.brandProfile.website} target="_blank" rel="noopener noreferrer">
                                      <Text color="blue.500" fontSize="sm">
                                        {brand.brandProfile.website.replace(/(^\w+:|^)\/\//, '')}
                                      </Text>
                                    </a>
                                  ) : (
                                    <Text fontSize="sm" color="gray.500">Not available</Text>
                                  )}
                                </Td>
                                <Td>
                                  <Text fontSize="sm" color="gray.600">
                                    {formatDate(brand.createdAt)}
                                  </Text>
                                </Td>
                                <Td>
                                  <HStack spacing={2}>
                                    <IconButton
                                      aria-label="View details"
                                      icon={<InfoIcon />}
                                      size="sm"
                                      colorScheme="blue"
                                      onClick={() => viewUserDetails(brand.id)}
                                    />
                                    <IconButton
                                      aria-label="Delete brand"
                                      icon={<DeleteIcon />}
                                      size="sm"
                                      colorScheme="red"
                                      onClick={() => handleDeleteUser(brand.id, 'brand')}
                                    />
                                  </HStack>
                                </Td>
                              </Tr>
                            ))}
                          </Tbody>
                        </Table>
                      </Box>
                    )}
                  </VStack>
                </CardBody>
              </Card>
            </TabPanel>

            {/* REPORTS TAB */}
            <TabPanel>
              <Card>
                <CardBody>
                  <Heading size="md" mb={4}>Reporting</Heading>
                  <Text color="gray.500">Reporting interface would appear here.</Text>
                </CardBody>
              </Card>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>

      {/* User/Brand Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selectedUser?.role === 'user' ? 'Customer Details' : 'Brand Details'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedUser && (
              <VStack align="stretch" spacing={4}>
                <HStack>
                  <Avatar
                    size="lg"
                    name={selectedUser.username}
                    src={selectedUser.brandProfile?.logoUrl}
                    bg={selectedUser.role === 'user' ? "blue.500" : "purple.500"}
                  />
                  <VStack align="start" spacing={0}>
                    <Heading size="md">
                      {selectedUser.role === 'user' 
                        ? `${selectedUser.username}`
                        : `${selectedUser.brandProfile?.name || selectedUser.username}`
                      }
                    </Heading>
                    <Badge colorScheme={selectedUser.role === 'user' ? "blue" : "purple"}>
                      {selectedUser.role === 'user' ? 'Customer' : 'Brand'}
                    </Badge>
                  </VStack>
                </HStack>

                <Divider />

                <SimpleGrid columns={2} spacing={4}>
                  <Box>
                    <Text fontWeight="bold">Username:</Text>
                    <Text>{selectedUser.username}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold">Email:</Text>
                    <Text>{selectedUser.email}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold">Joined:</Text>
                    <Text>{formatDate(selectedUser.createdAt)}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold">Last Updated:</Text>
                    <Text>{formatDate(selectedUser.updatedAt)}</Text>
                  </Box>
                </SimpleGrid>

                {selectedUser.role === 'user' && selectedUser.userProfile && (
                  <>
                    <Divider />
                    <Heading size="sm">Profile Details</Heading>
                    <SimpleGrid columns={2} spacing={4}>
                      {selectedUser.userProfile.firstName && (
                        <Box>
                          <Text fontWeight="bold">First Name:</Text>
                          <Text>{selectedUser.userProfile.firstName}</Text>
                        </Box>
                      )}
                      {selectedUser.userProfile.lastName && (
                        <Box>
                          <Text fontWeight="bold">Last Name:</Text>
                          <Text>{selectedUser.userProfile.lastName}</Text>
                        </Box>
                      )}
                      {selectedUser.userProfile.gender && (
                        <Box>
                          <Text fontWeight="bold">Gender:</Text>
                          <Text>{selectedUser.userProfile.gender}</Text>
                        </Box>
                      )}
                      {selectedUser.userProfile.age && (
                        <Box>
                          <Text fontWeight="bold">Age:</Text>
                          <Text>{selectedUser.userProfile.age}</Text>
                        </Box>
                      )}
                    </SimpleGrid>

                    {selectedUser.userProfile.measurements && (
                      <><>
                        <Heading size="sm" mt={2}>Measurements</Heading>
                        <SimpleGrid columns={2} spacing={4}>
                          {selectedUser.userProfile.measurements.height && (
                            <Box>
                              <Text fontWeight="bold">Height:</Text>
                              <Text>{selectedUser.userProfile.measurements.height} cm</Text>
                            </Box>
                          )}
                          {selectedUser.userProfile.measurements.weight && (
                            <Box>
                              <Text fontWeight="bold">Weight:</Text>
                              <Text>{selectedUser.userProfile.measurements.weight} kg</Text>
                            </Box>
                          )}
                          {selectedUser.userProfile.measurements.chest && (
                            <Box>
                              <Text fontWeight="bold">Chest:</Text>
                              <Text>{selectedUser.userProfile.measurements.chest} cm</Text>
                            </Box>
                          )}
                          {selectedUser.userProfile.measurements.waist && (
                            <Box>
                              <Text fontWeight="bold">Waist:</Text>
                              <Text>{selectedUser.userProfile.measurements.waist} cm</Text>
                            </Box>
                          )}
                        </SimpleGrid>
                      <Heading size="sm" mt={2}>Preferences</Heading><SimpleGrid columns={2} spacing={4}>
                          {selectedUser.userProfile.preferences?.style && (
                            <Box>
                              <Text fontWeight="bold">Style Preference:</Text>
                              <Text>{selectedUser.userProfile.preferences.style}</Text>
                            </Box>
                          )}
                          {selectedUser.userProfile.preferences?.size && (
                            <Box>
                              <Text fontWeight="bold">Size Preference:</Text>
                              <Text>{selectedUser.userProfile.preferences.size}</Text>
                            </Box>
                          )}
                          {selectedUser.userProfile.preferences?.color && (
                            <Box>
                              <Text fontWeight="bold">Color Preference:</Text>
                              <Text>{selectedUser.userProfile.preferences.color}</Text>
                            </Box>
                          )}
                          {selectedUser.userProfile.preferences?.fitPreference && (
                            <Box>
                              <Text fontWeight="bold">Fit Preference:</Text>
                              <Text>{selectedUser.userProfile.preferences.fitPreference}</Text>
                            </Box>
                          )}
                          {selectedUser.userProfile.preferences?.sustainability !== undefined && (
                            <Box>
                              <Text fontWeight="bold">Sustainability Focus:</Text>
                              <Text>{selectedUser.userProfile.preferences.sustainability ? "Yes" : "No"}</Text>
                            </Box>
                          )}
                        </SimpleGrid></>
                    </>
                  )}
                </>
              )}

              {selectedUser && selectedUser.role === 'brand' && selectedUser.brandProfile && (
                <>
                  <Divider />
                  <Heading size="sm">Brand Details</Heading>
                  <SimpleGrid columns={2} spacing={4}>
                    <Box>
                      <Text fontWeight="bold">Brand Name:</Text>
                      <Text>{selectedUser.brandProfile.name}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Slug:</Text>
                      <Text>{selectedUser.brandProfile.slug}</Text>
                    </Box>
                    {selectedUser.brandProfile.website && (
                      <Box>
                        <Text fontWeight="bold">Website:</Text>
                        <a href={selectedUser.brandProfile.website} style={{ color: "blue.500" }} target="_blank" rel="noopener noreferrer">
                          {selectedUser.brandProfile.website}
                        </a>
                      </Box>
                    )}
                    {selectedUser && selectedUser.brandProfile?.popularityIndex !== undefined && (
                      <Box>
                        <Text fontWeight="bold">Popularity Index:</Text>
                        <Text>{selectedUser.brandProfile.popularityIndex}</Text>
                      </Box>
                    )}
                    {selectedUser.brandProfile.description && (
                      <Box gridColumn="span 2">
                        <Text fontWeight="bold">Description:</Text>
                        <Text>{selectedUser.brandProfile.description}</Text>
                      </Box>
                    )}
                  </SimpleGrid>
                </>
              )}
            </VStack>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button 
            as={Link} 
            to={`/Admin/edit-user/${selectedUser?.id}`} 
            colorScheme="teal"
            variant="outline"
          >
            Edit Profile
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </Box>
);
};

export default AdminCentral;