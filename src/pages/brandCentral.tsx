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
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

// Define a Product type for items in the list
interface Product {
  id: number;
  name: string;
  price: string; // using string since form inputs return strings
}

// Define a type for the product form (for add/update)
// 'id' is optional for new products
interface ProductForm {
  id?: number;
  name: string;
  price: string;
}

const BrandCentral: React.FC = () => {
  // Initial product list with proper types
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Product One", price: "10" },
    { id: 2, name: "Product Two", price: "20" },
  ]);

  // currentProduct holds form values; it can be null when no product is being edited/added
  const [currentProduct, setCurrentProduct] = useState<ProductForm | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Opens the modal; if a product is passed, it’s for editing; otherwise, it's for adding a new product
  const openModal = (product?: Product) => {
    if (product) {
      setCurrentProduct(product);
    } else {
      setCurrentProduct({ name: "", price: "" });
    }
    onOpen();
  };

  // Delete a product by id (id is typed as number)
  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  // Handle changes in the form inputs; ensure currentProduct is not null before spreading
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentProduct) return;
    const { name, value } = e.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };

  // Save product: if an id exists update the product, otherwise add a new product
  const handleSave = () => {
    if (!currentProduct) return;
    if (currentProduct.id) {
      // Update product by mapping over existing products
      setProducts(
        products.map((p) =>
          p.id === currentProduct.id
            ? { id: currentProduct.id, name: currentProduct.name, price: currentProduct.price }
            : p
        )
      );
    } else {
      // Add a new product with a unique id
      const newProduct: Product = { ...currentProduct, id: Date.now() };
      setProducts([...products, newProduct]);
    }
    onClose();
    setCurrentProduct(null);
  };

  return (
    <Box p={8}>
      <Heading mb={4}>Brand Central</Heading>
      <Button colorScheme="teal" mb={4} onClick={() => openModal()}>
        Add Product
      </Button>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Price</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map((product) => (
            <Tr key={product.id}>
              <Td>{product.name}</Td>
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

      {/* Modal for adding/updating a product */}
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setCurrentProduct(null);
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
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  name="name"
                  value={currentProduct?.name || ""}
                  onChange={handleChange}
                  placeholder="Product Name"
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
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default BrandCentral;
