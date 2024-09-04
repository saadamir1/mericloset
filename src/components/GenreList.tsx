import {
  Image,
  List,
  ListItem,
  HStack,
  Spinner,
  Button,
  Heading,
} from "@chakra-ui/react";
import useGenres, { Genre } from "../hooks/useGenres";
import getCroppedImageUrl from "../services/image-url";

interface Props {
  onSelectGenre: (genre: Genre) => void;
  selectedGenreID?: number; // same as selectedGenreID: number | undefined;
}

const GenreList = ({ selectedGenreID, onSelectGenre }: Props) => {
  const { data, isLoading, error } = useGenres();

  if (isLoading) return <Spinner />;
  if (error) return null; //just don't render this component in case of error

  return (
    <>
      <Heading textAlign="left" fontSize="2xl" marginBottom={3}>
        Genres
      </Heading>
      <List>
        {data?.results.map((genre) => (
          <ListItem key={genre.id} paddingY="5px">
            <HStack>
              <Image
                boxSize="32px"
                borderRadius={8}
                src={getCroppedImageUrl(genre.image_background)}
              />
              <Button
                onClick={() => onSelectGenre(genre)}
                fontSize="lg"
                variant="link"
                whiteSpace="nowrap"
                textAlign="left"
                objectFit="cover"
                fontWeight={genre.id === selectedGenreID ? "bold" : "normal"}
                textColor={
                  genre.id === selectedGenreID ? "teal.300" : "inherit"
                }
              >
                {genre.name}
              </Button>
            </HStack>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default GenreList;
