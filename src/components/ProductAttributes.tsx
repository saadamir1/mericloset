import { SimpleGrid, Text } from "@chakra-ui/react";
import Product from "../entities/Product";
import CriticScore from "./CriticScore";
import DefinitionItem from "./DefinitionItem";

interface Props {
  product: Product;
}

const ProductComponents = ({ product }: Props) => {
  return (
    <SimpleGrid columns={2} as="dl" spacing={4}>
      {/* Price */}
      <DefinitionItem term="Price">
        <CriticScore price={product.price} />
      </DefinitionItem>

      {/* Sizes */}
      <DefinitionItem term="Sizes">
        <Text>{product.sizes?.join(", ") || "N/A"}</Text>
      </DefinitionItem>

      {/* Brand */}
      <DefinitionItem term="Brand">
        <Text>{product.brand || "N/A"}</Text>
      </DefinitionItem>

      {/* Colors */}
      <DefinitionItem term="Colors">
        <Text>{product.colors?.join(", ") || "N/A"}</Text>
      </DefinitionItem>
    </SimpleGrid>
  );
};

export default ProductComponents;
