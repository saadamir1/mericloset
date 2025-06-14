import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Checkbox,
  Select,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import Product from "../../entities/Product";
const baseURL = import.meta.env.VITE_API_BASE_URL;

const availableSizes = ["S", "M", "L", "XL", "XXL"];

const AddProduct: React.FC = () => {
  const [product, setProduct] = useState<Partial<Product>>({
    title: "",
    description: "",
    price: 0,
    sizes: [],
    images: [""],
    stockStatus: "",
  });
  const [imageUrls, setImageUrls] = useState<string[]>([""]);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      const response = await fetch(`${baseURL}/products/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...product, images: imageUrls }),
      });

      if (response.ok) {
        toast({
          title: "Product added successfully!",
          status: "success",
          duration: 2000,
        });
        navigate("/brand/central");
      } else {
        toast({
          title: "Failed to add product.",
          status: "error",
          duration: 2000,
        });
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast({
        title: "Error adding product.",
        status: "error",
        duration: 2000,
      });
    }
  };

  return (
    <Box p={8} bg="gray.100" minHeight="100vh">
      <Heading mb={4}>Add Product</Heading>
      <VStack spacing={4} align="stretch">
        <FormControl isRequired>
          <FormLabel>Title</FormLabel>
          <Input
            value={product.title}
            onChange={(e) => setProduct({ ...product, title: e.target.value })}
            placeholder="Product Title"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Input
            value={product.description}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
            placeholder="Product Description"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Price</FormLabel>
          <Input
            type="number"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: +e.target.value })}
            placeholder="Price"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Sizes</FormLabel>
          <HStack spacing={4} wrap="wrap">
            {availableSizes.map((size) => (
              <Checkbox
                key={size}
                isChecked={product.sizes?.includes(size)}
                onChange={() => {
                  const sizes = product.sizes || [];
                  setProduct({
                    ...product,
                    sizes: sizes.includes(size)
                      ? sizes.filter((s) => s !== size)
                      : [...sizes, size],
                  });
                }}
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
                  onChange={(e) => {
                    const newImageUrls = [...imageUrls];
                    newImageUrls[index] = e.target.value;
                    setImageUrls(newImageUrls);
                  }}
                  placeholder="Image URL"
                />
                <Button
                  onClick={() => {
                    const newImageUrls = imageUrls.filter((_, i) => i !== index);
                    setImageUrls(newImageUrls);
                  }}
                  colorScheme="red"
                  size="sm"
                >
                  Delete
                </Button>
              </HStack>
            ))}
            <Button onClick={() => setImageUrls([...imageUrls, ""])} colorScheme="blue" size="sm">
              Add Image URL
            </Button>
          </VStack>
        </FormControl>
        <FormControl>
          <FormLabel>Stock Status</FormLabel>
          <Select
            value={product.stockStatus}
            onChange={(e) => setProduct({ ...product, stockStatus: e.target.value })}
            placeholder="Select stock status"
          >
            <option value="In Stock">In Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </Select>
        </FormControl>
        <Button onClick={handleSave} colorScheme="teal">
          Save
        </Button>
        <Button as={Link} to="/brand/central" variant="ghost">
          Cancel
        </Button>
      </VStack>
    </Box>
  );
};

export default AddProduct;