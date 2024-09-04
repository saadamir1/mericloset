import { GameQuery } from "../App";
import { Heading } from "@chakra-ui/react";
import useGenres from "../hooks/useGenres";
import platforms from "../data/platforms";

interface Props {
  gameQuery: GameQuery;
}

const GameHeading = ({ gameQuery }: Props) => {
  const { data: genres } = useGenres();

  const platform = platforms.find(
    (platform) => platform.id === gameQuery.platformID
  );
  const genre = genres?.results.find((g) => g.id === gameQuery.genreID);

  const heading = `${platform?.name || ""} ${genre?.name || ""} Games`;

  return (
    <Heading as="h1" marginY={5} fontSize="5xl">
      {heading}
    </Heading>
  );
};

export default GameHeading;
