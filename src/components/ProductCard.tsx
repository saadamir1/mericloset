import Product from "../entities/Product";
import { Card, CardBody, Text, Heading, Image, useColorModeValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const bgColor = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Card 
      height="390px" 
      boxShadow="md" 
      bg={bgColor} 
      borderWidth="1px" 
      borderColor={borderColor} 
      borderRadius="md"
    >
      {product.images.length > 0 && (
        <Image
          src={product.images[0]}
          alt={product.title}
          height="280px"
          //objectFit="cover"
          borderTopRadius="md"
        />
      )}
      <CardBody>
        <Heading fontSize={{ base: "lg", md: "xl" }} textAlign="left" noOfLines={1}>
          <Link to={`/products/${product.id}`}>{product.title}</Link>
        </Heading>
        <Text color="gray.600" fontSize="sm" noOfLines={1}>
          {product.brand}
        </Text>
        <Text fontWeight="bold"  fontSize="xl">
          Rs. {Math.floor(product.price)}
        </Text>

      </CardBody>
    </Card>
  );
};

export default ProductCard;
