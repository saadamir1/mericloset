import { SimpleGrid, Text } from "@chakra-ui/react";
import Product from "../entities/Product";
import CriticScore from "./CriticScore";
import DefinitionItem from "./DefinitionItem";

interface Props {
  product: Product;
}

const ProductComponents = ({ product }: Props) => {
  return (
    <SimpleGrid columns={2} as="dl">
      <DefinitionItem term="Platforms">
        {/* //same as parent_platforms.platform.name */}
        {product.parent_platforms?.map(({ platform }) => (
          <Text key={platform.id}>{platform.name}</Text>
        ))}
      </DefinitionItem>
      <DefinitionItem term="Metascore">
        <CriticScore score={product.metacritic} />
      </DefinitionItem>
      <DefinitionItem term="Genres">
        {product.genres?.map((genre) => (
          <Text key={genre.id}>{genre.name}</Text>
        ))}
      </DefinitionItem>
      <DefinitionItem term="Publishers">
        {product.publishers?.map((p) => (
          <Text key={p.id}>{p.name}</Text>
        ))}
      </DefinitionItem>
    </SimpleGrid>
  );
};

export default ProductComponents;
