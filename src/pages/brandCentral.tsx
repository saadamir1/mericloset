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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Alert,
  AlertIcon,
  InputGroup,
  InputLeftElement,
  Select,
  Flex,
  Checkbox,
  HStack,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, SearchIcon } from "@chakra-ui/icons";
import Footer from "../components/Footer"; // Ensure the path is correct
import InfoSection from "../components/InfoSection";
import useProducts from "../hooks/useProducts"; // Import your custom hook
import Product from "../entities/Product";

const availableSizes = ['S', 'M', 'L', 'XL', 'XXL']; // Define available sizes

const BrandCentral: React.FC = () => {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } = useProducts();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [alert, setAlert] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [imageUrls, setImageUrls] = useState<string[]>([""]); // State for image URLs

const openModal = (product?: Product) => {
  if (product) {
    setCurrentProduct({ ...product });
    setImageUrls(product.images);
  } else {
    // Initialize with default values for a new product
    setCurrentProduct({
      id: "",
      title: "",
      description: "",
      price: 0,
      sizes: [],
      images: [],
      stockStatus: "",
      brand: "",
      colors: [],
      scrapedAt: new Date().toISOString(),
    });
    setImageUrls([""]); // Start with one empty image URL
  }
  onOpen();
};

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(`http://localhost:5170/api/v1/products/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setAlert("Product deleted successfully!");
          setTimeout(() => {
            setAlert(null); // Clear alert after 2 seconds
          }, 2000);
          // Optionally, refresh the product list here
        } else {
          setAlert("Failed to delete product.");
          setTimeout(() => {
            setAlert(null); // Clear alert after 2 seconds
          }, 2000);
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        setAlert("Error deleting product.");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!currentProduct) return;
    const { name, value } = e.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };

  const handleSizeChange = (size: string) => {
    if (!currentProduct) return;
    const sizes = currentProduct.sizes || [];
    if (sizes.includes(size)) {
      setCurrentProduct({ ...currentProduct, sizes: sizes.filter(s => s !== size) });
    } else {
      setCurrentProduct({ ...currentProduct, sizes: [...sizes, size] });
    }
  };

  const handleSave = async () => {
    if (!currentProduct) return;

    const productData = {
      ...currentProduct,
      images: imageUrls,
    };

    try {
        console.log("Submitting product data:", productData);
        console.log("Current product:", currentProduct);
      const response = currentProduct.id
        ? await fetch(`http://localhost:5170/api/v1/products/${currentProduct.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
          })
        : await fetch('http://localhost:5170/api/v1/products/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
 });

      if (response.ok) {
        setAlert("Product saved successfully!");
        setTimeout(() => {
          setAlert(null); // Clear alert after 2 seconds
        }, 2000);
        onClose();
        setCurrentProduct(null);
        // Optionally refresh the product list here
      } else {
        setAlert("Failed to save product.");
        setTimeout(() => {
          setAlert(null); // Clear alert after 2 seconds
        }, 2000);
      }
    } catch (error) {
      console.error("Error saving product:", error);
      setAlert("Error saving product.");
      setTimeout(() => {
        setAlert(null); // Clear alert after 2 seconds
      }, 2000);
    }
  };

  const handleAddImageUrl = () => {
    setImageUrls([...imageUrls, ""]); // Add a new empty input for image URL
  };

  const handleImageUrlChange = (index: number, value: string) => {
    const newImageUrls = [...imageUrls];
    newImageUrls[index] = value; // Update the specific image URL
    setImageUrls(newImageUrls);
  };

  const handleDeleteImageUrl = (index: number) => {
    const newImageUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newImageUrls);
  };

  const filteredProducts = data?.pages.flatMap(page => page.results).filter(product =>
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
    <>
      <Box p={8} bg="gray.100" minHeight="100vh">
        <Heading mb={4}>Brand Central</Heading>
        {alert && (
          <Alert status="success" mb={4}>
            <AlertIcon />
            {alert}
          </Alert>
        )}
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
          <Button colorScheme="teal" onClick={() => openModal()}>
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
                      aria-label="Edit Product"
                      icon={<EditIcon />}
                      mr={2}
                      onClick={() => openModal(product)}
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
        <Modal
          isOpen={isOpen}
          onClose={() => {
            onClose();
            setCurrentProduct(null);
            setImageUrls([""]); // Reset image URLs
          }}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {currentProduct && currentProduct.id ? "Update Product" : "Add Product"}
 </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Title</FormLabel>
                  <Input
                    name="title"
                    value={currentProduct?.title || ""}
                    onChange={handleChange}
                    placeholder="Product Title"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Input
                    name="description"
                    value={currentProduct?.description || ""}
                    onChange={handleChange}
                    placeholder="Product Description"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Price</FormLabel>
                  <Input
                    name="price"
                    type="number"
                    value={currentProduct?.price || ""}
                    onChange={handleChange}
                    placeholder="Price"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Sizes</FormLabel>
                  <HStack spacing={4} wrap="wrap">
                    {availableSizes.map(size => (
                      <Checkbox
                        key={size}
                        isChecked={currentProduct?.sizes?.includes(size)}
                        onChange={() => handleSizeChange(size)}
                      >
                        {size}
                      </Checkbox>
                    ))}
                  </HStack>
                </FormControl>
                <FormControl>
                  <FormLabel>Images</FormLabel>
                  <VStack spacing={1}>
                    {imageUrls.map((url, index) => (
                      <HStack key={index}>
                        <Input
                          value={url}
                          onChange={(e) => handleImageUrlChange(index, e.target.value)}
                          placeholder="Image URL"
                        />
                        <IconButton
                          aria-label="Delete Image URL"
                          icon={<DeleteIcon />}
                          onClick={() => handleDeleteImageUrl(index)}
                          size="sm" // Smaller button size
                        />
                      </HStack>
                    ))}
                    <Button onClick={handleAddImageUrl} colorScheme="blue" size="sm">
                      Add Image URL
                    </Button>
                  </VStack>
                </FormControl>
                <FormControl>
                  <FormLabel>Stock Status</FormLabel>
                  <Select
                    name="stockStatus"
                    value={currentProduct?.stockStatus || ""}
                    onChange={handleChange}
                    placeholder="Select stock status"
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </Select>
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="teal" mr={3} onClick={handleSave}>
                Save
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  onClose();
                  setCurrentProduct(null);
                  setImageUrls([""]); // Reset image URLs
                }}
              >
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <InfoSection />
        <Box mb={4} /> {/* Add margin below the products table */}
      </Box>
      <Footer /> {/* Move Footer outside the Box for full width */}
    </>
  );
};

export default BrandCentral;