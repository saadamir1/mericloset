import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, SearchIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import useProducts from "../../hooks/useProducts";

const BrandCentral: React.FC = () => {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<string>("asc");

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(`http://localhost:5170/api/v1/products/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          console.log("Product deleted successfully!");
        } else {
          console.error("Failed to delete product.");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const filteredProducts = data?.pages.flatMap((page) => page.results).filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = filteredProducts?.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.title.localeCompare(b.title);
    } else {
      return b.title.localeCompare(a.title);
    }
  });

  return (
    <Box p={8} bg="gray.100" minHeight="100vh">
      <Heading mb={4}>Brand Central</Heading>
      <Flex mb={4} justifyContent="space-between" alignItems="center">
        <InputGroup width="40%">
          <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
        <Select
          width="20%"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          placeholder="Sort by"
        >
          <option value="asc">Name (A-Z)</option>
          <option value="desc">Name (Z-A)</option>
        </Select>
        <Button as={Link} to="/brand/add-product" colorScheme="teal">
          Add Product
        </Button>
      </Flex>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error fetching products.</p>
      ) : (
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>Image</Th>
              <Th>Title</Th>
              <Th>Price</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sortedProducts?.map((product) => (
              <Tr key={product.id}>
                <Td>
                  <img
                    src={product.images[1] ? product.images[1] : product.images[0]}
                    alt={product.title}
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  />
                </Td>
                <Td>{product.title}</Td>
                <Td>${product.price}</Td>
                <Td>
                  <IconButton
                    as={Link}
                    // to={`/brand/edit-product/${product.id}`}
                    aria-label="Edit Product"
                    icon={<EditIcon />}
                    mr={2}
                  />
                  <IconButton
                    aria-label="Delete Product"
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    onClick={() => handleDelete(product.id)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
      {hasNextPage && (
        <Button onClick={() => fetchNextPage()} isLoading={isLoading}>
          Load More
        </Button>
      )}
    </Box>
  );
};

export default BrandCentral;