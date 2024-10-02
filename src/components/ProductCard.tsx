import Product from "../entities/Product";
import { Card, CardBody, Heading, HStack, Image } from "@chakra-ui/react";
import PlatformIconList from "./PlatformIconList";
import CriticScore from "./CriticScore";
import getCroppedImageUrl from "../services/image-url";
import { Link } from "react-router-dom";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <Card height="350px">
      {" "}
      <Image
        // objectFit="cover"
        // height="180px"
        src={getCroppedImageUrl(product.background_image)}
      />
      <CardBody>
        <HStack justifyContent="space-between" marginBottom={3}>
          {product.parent_platforms && ( //if exist then proceed
            <PlatformIconList
              platforms={product.parent_platforms.map((p) => p.platform)}
            />
          )}
          <CriticScore score={product.metacritic} />
        </HStack>
        <Heading fontSize={{ base: "xl", md: "2xl" }} textAlign="left">
          <Link to={"/products/" + product.slug}>{product.name}</Link>
        </Heading>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
