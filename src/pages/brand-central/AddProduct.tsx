// AddProduct.tsx
import React, { useEffect, useState } from "react";
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
  Image,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import Product from "../../entities/Product";
import userStore from "../../userStore";

const availableSizes = ["S", "M", "L", "XL", "XXL"];

interface BrandOption {
  _id: string;
  name: string;
}

const AddProduct: React.FC = () => {
  const { user } = userStore();
  const [brandOptions, setBrandOptions] = useState<BrandOption[]>([]);
  const [selectedBrandId, setSelectedBrandId] = useState<string>("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Partial<Product>>({
    title: "",
    description: "",
    price: 0,
    brand: undefined,
    category: "",
    sizes: [],
    images: [],
    stockStatus: "",
  });

  useEffect(() => {
    fetch("http://localhost:5170/api/v1/categories")
      .then((res) => res.json())
      .then(setCategories)
      .catch(console.error);

    fetch("http://localhost:5170/api/v1/brands")
      .then((res) => res.json())
      .then((data: BrandOption[]) => {
        setBrandOptions(data);
        const brandName = (user as any)?.brandProfile?.name || (user as any)?.username || "";
        const matched = data.find((b: BrandOption) => b.name.toLowerCase() === brandName.toLowerCase());
        if (matched) setSelectedBrandId(matched._id);
      })
      .catch(console.error);
  }, [user]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    setIsUploading(true);
    try {
      const res = await fetch("http://localhost:5170/api/v1/images/upload-image", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.imageUrl) setImageUrls((prev) => [...prev, data.imageUrl]);
      else toast({ title: "Image upload failed", description: JSON.stringify(data), status: "error" });
    } catch (err) {
      toast({ title: "Upload failed", status: "error" });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    const selectedBrand = brandOptions.find((b) => b._id === selectedBrandId);
    if (!product.title || !product.price || !selectedBrand || !product.category || (product.sizes?.length ?? 0) === 0 || imageUrls.length === 0) {
      toast({ title: "Missing required fields", status: "warning" });
      return;
    }

    const payload = {
      ...product,
      brand: selectedBrand, // store brand as full object
      images: imageUrls,
    };

    try {
      const response = await fetch("http://localhost:5170/api/v1/products/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast({ title: "Product added!", status: "success" });
        setTimeout(() => navigate("/brand/products"), 500);
      } else {
        const errorData = await response.json();
        toast({ title: "Failed to add product", description: errorData.message || "Something went wrong", status: "error" });
      }
    } catch (error) {
      toast({ title: "Network error", status: "error" });
    }
  };

  return (
    <Box p={8} bg="gray.100" minHeight="100vh">
      <Heading mb={4}>Add Product</Heading>
      <VStack spacing={4} align="stretch">
        <FormControl isRequired>
          <FormLabel>Title</FormLabel>
          <Input value={product.title} onChange={(e) => setProduct({ ...product, title: e.target.value })} />
        </FormControl>

        <FormControl>
          <FormLabel>Description</FormLabel>
          <Input value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Price</FormLabel>
          <Input type="number" value={product.price} onChange={(e) => setProduct({ ...product, price: +e.target.value })} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Brand</FormLabel>
          <Select value={selectedBrandId} onChange={(e) => setSelectedBrandId(e.target.value)}>
            <option value="" disabled>Select a brand</option>
            {brandOptions.map((b) => (
              <option key={b._id} value={b._id}>{b.name}</option>
            ))}
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Category</FormLabel>
          <Select value={product.category} onChange={(e) => setProduct({ ...product, category: e.target.value })}>
            <option value="" disabled>Select category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Sizes</FormLabel>
          <HStack spacing={4} wrap="wrap">
            {availableSizes.map((size) => (
              <Checkbox key={size} isChecked={product.sizes?.includes(size)} onChange={() => {
                const sizes = product.sizes || [];
                setProduct({
                  ...product,
                  sizes: sizes.includes(size) ? sizes.filter((s) => s !== size) : [...sizes, size],
                });
              }}>{size}</Checkbox>
            ))}
          </HStack>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Upload Image</FormLabel>
          <Input type="file" accept="image/*" onChange={handleImageUpload} />
        </FormControl>

        {imageUrls.length > 0 && (
          <FormControl>
            <FormLabel>Uploaded Images</FormLabel>
            <VStack spacing={2} align="start">
              {imageUrls.map((url, i) => (
                <HStack key={i}>
                  <Image boxSize="80px" src={`http://localhost:5170${url}`} />
                  <Button colorScheme="red" size="sm" onClick={() => setImageUrls((prev) => prev.filter((_, idx) => idx !== i))}>Delete</Button>
                </HStack>
              ))}
            </VStack>
          </FormControl>
        )}

        <FormControl>
          <FormLabel>Stock Status</FormLabel>
          <Select value={product.stockStatus} onChange={(e) => setProduct({ ...product, stockStatus: e.target.value })}>
            <option value="">Select stock status</option>
            <option value="In Stock">In Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </Select>
        </FormControl>

        <Button onClick={handleSave} colorScheme="teal" isDisabled={isUploading}>
          {isUploading ? "Uploading..." : "Save"}
        </Button>
        <Button as={Link} to="/brand" variant="ghost">Cancel</Button>
      </VStack>
    </Box>
  );
};

export default AddProduct;