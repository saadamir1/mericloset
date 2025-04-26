// BrandCentral.tsx
import React, { useState, useEffect } from "react";
import {
  Box, Button, Heading, SimpleGrid, Card, CardBody,
  Stat, StatLabel, StatNumber, Flex, Tooltip,
  IconButton, HStack, Tabs, TabList, TabPanels, Tab, TabPanel, Text, Center
} from "@chakra-ui/react";
import {
  RepeatIcon, SettingsIcon, AddIcon
} from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import userStore from "./../../userStore";

interface Product {
  id: string;
  title: string;
  price: number;
  description?: string;
  images: string[];
  brand: string;
  views?: number;
  stock?: number;
  status?: string;
}

interface BrandStats {
  totalProducts: number;
  activeProducts: number;
  lowStock: number;
  totalViews: number;
  pendingProducts: number;
}

const BrandCentral: React.FC = () => {
  const { data, refetch } = useProducts();
  const { user } = userStore();
  const [brandStats, setBrandStats] = useState<BrandStats>({
    totalProducts: 0,
    activeProducts: 0,
    lowStock: 0,
    totalViews: 0,
    pendingProducts: 0
  });

  const brandName = user?.username;

  const getBrandProducts = (): Product[] => {
    if (!data || !brandName) return [];
    const allProducts = data.pages.flatMap(page => page.results || []);
    return allProducts.filter(product => product.brand?.toLowerCase() === brandName.toLowerCase());
  };

  useEffect(() => {
    const products = getBrandProducts();
    setBrandStats({
      totalProducts: products.length,
      activeProducts: products.length, // Placeholder
      lowStock: 0, // Placeholder
      totalViews: products.reduce((sum, p) => sum + (p.views || 0), 0),
      pendingProducts: 0 // Placeholder
    });
  }, [data, brandName]);

  return (
    <Box bg="gray.50" minHeight="100vh">
      <Box p={6} bg="white" boxShadow="sm">
        <HStack spacing={4} align="center">
          <Heading size="lg">Brand Dashboard</Heading>
          <Flex flex={1} />
          <HStack spacing={2}>
            <Tooltip label="Refresh Data">
              <IconButton icon={<RepeatIcon />} aria-label="Refresh" size="sm" onClick={() => refetch()} />
            </Tooltip>
            <Tooltip label="Settings">
              <IconButton icon={<SettingsIcon />} aria-label="Settings" size="sm" />
            </Tooltip>
          </HStack>
        </HStack>
      </Box>
      <Box p={6}>
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6} mb={6}>
          <Card><CardBody><Stat><StatLabel>Total Products</StatLabel><StatNumber>{brandStats.totalProducts}</StatNumber></Stat></CardBody></Card>
          <Card><CardBody><Stat><StatLabel color="green.500">Active</StatLabel><StatNumber>{brandStats.activeProducts}</StatNumber></Stat></CardBody></Card>
          <Card><CardBody><Stat><StatLabel color="orange.500">Low Stock</StatLabel><StatNumber>{brandStats.lowStock}</StatNumber></Stat></CardBody></Card>
          <Card><CardBody><Stat><StatLabel color="blue.500">Views</StatLabel><StatNumber>{brandStats.totalViews}</StatNumber></Stat></CardBody></Card>
        </SimpleGrid>
        <Tabs variant="enclosed" colorScheme="purple">
          <TabList>
            <Tab as={Link} to="/brand/products">Products</Tab>
            <Tab>Analytics</Tab>
            <Tab>Settings</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Center py={10} flexDirection="column">
                <Text fontSize="lg" mb={4} textAlign="center">
                  Manage your product listings and keep your inventory updated.
                </Text>
                <Button
                  as={Link}
                  to="/brand/products"
                  colorScheme="purple"
                  leftIcon={<AddIcon />}
                >
                  View Product Inventory
                </Button>
              </Center>
            </TabPanel>
            <TabPanel><Card><CardBody><Heading size="md">Analytics</Heading></CardBody></Card></TabPanel>
            <TabPanel><Card><CardBody><Heading size="md">Settings</Heading></CardBody></Card></TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default BrandCentral;
