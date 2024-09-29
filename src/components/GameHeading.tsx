import { Heading } from "@chakra-ui/react";
import useGenre from "../hooks/useGenre";
import usePlatform from "../hooks/usePlatform";
import useGameQueryStore from "../store";

const GameHeading = () => {
  const genreID = useGameQueryStore((s) => s.gameQuery.genreID);
  const genre = useGenre(genreID);

  const platformID = useGameQueryStore((s) => s.gameQuery.platformID);
  const platform = usePlatform(platformID);

  const heading = `${platform?.name || ""} ${genre?.name || ""} Products`;

  return (
    <Heading as="h1" marginY={5} fontSize="5xl">
      {heading}
    </Heading>
  );
};

export default GameHeading;
