import { Heading } from "@chakra-ui/react";
import useGenre from "../hooks/useGenre";
import usePlatform from "../hooks/usePlatform";
import useProductQueryStore from "../store";

const ProductHeading = () => {
  const genreID = useProductQueryStore((s) => s.productQuery.genreID);
  const genre = useGenre(genreID);

  const platformID = useProductQueryStore((s) => s.productQuery.platformID);
  const platform = usePlatform(platformID);

  const heading = `${platform?.name || ""} ${genre?.name || ""} Products`;

  return (
    <Heading as="h1" marginY={5} fontSize="5xl">
      {heading}
    </Heading>
  );
};

export default ProductHeading;
