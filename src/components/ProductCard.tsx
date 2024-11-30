import Product from "../entities/Product";
import { Card, CardBody, Text, Heading, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const imageUrl = "https://drive.google.com/thumbnail?id=1fhCbhY62c91j46N4yDyVEDPR-YSX3MVV&sz=w800";

  return (
    <Card height="400px" width="250px" overflow="hidden" boxShadow="md">
      {product.images.length > 0 && (
        <Image
          src={product.images[0]}
          alt={product.title}
          height="280px"   // Set the height to limit the image size within the card
          width="100%"
          //objectFit="cover" // Crop the image to fit the specified dimensions
        />
      )}
      <CardBody padding="10px">
        <Heading fontSize={{ base: "lg", md: "xl" }} textAlign="left" noOfLines={1}>
          <Link to={`/products/${product._id}`}>{product.title}</Link>
        </Heading>
        <Text color="gray.600" fontSize="sm" noOfLines={1}>
          {product.brand}
        </Text>
        <Text color="gray.800" fontWeight="bold">
          ${product.price}
        </Text>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
