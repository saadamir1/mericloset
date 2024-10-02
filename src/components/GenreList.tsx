import {
  Button,
  Heading,
  HStack,
  Image,
  List,
  ListItem,
  Spinner,
} from "@chakra-ui/react";
import useGenres from "../hooks/useGenres";
import getCroppedImageUrl from "../services/image-url";
import useProductQueryStore from "../store";

const GenreList = () => {
  const { data, isLoading, error } = useGenres();
  const selectedGenreID = useProductQueryStore((s) => s.productQuery.genreID);
  const setSelectedGenreID = useProductQueryStore((s) => s.setGenreID);

  if (isLoading) return <Spinner />;
  if (error) return null; //just don't render this component in case of error

  return (
    <>
      <Heading textAlign="left" fontSize="2xl" marginBottom={3}>
        Categories
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
                onClick={() => setSelectedGenreID(genre.id)}
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
