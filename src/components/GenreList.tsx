import { Image, List, ListItem, Text, HStack, Spinner } from "@chakra-ui/react";
import useGenres, { Genre } from "../hooks/useGenres";
import getCroppedImageUrl from "../services/image-url";

const GenreList = () => {
  const { data, isLoading, error } = useGenres();

  if (isLoading) return <Spinner />;
  if (error) return null; //just display nothing in case of error

  return (
    <List>
      {data.map((genre) => (
        <ListItem key={genre.id} paddingY="5px">
          <HStack>
            <Image
              boxSize="32px"
              borderRadius={8}
              src={getCroppedImageUrl(genre.image_background)}
            />
            <Text fontSize="lg">{genre.name}</Text>
          </HStack>
        </ListItem>
      ))}
    </List>
  );
};

export default GenreList;

// import { HStack, List, Text, ListItem, Image } from "@chakra-ui/react";
// import useGenres, { Genre } from "../hooks/useGenres";
// import getCroppedImageUrl from "../services/image-url";

// const GenreList = () => {
//   const { data } = useGenres();
//   return (
//     <List>
//       {data.map((genre) => (
//         <ListItem key={genre.id}>
//           <HStack>
//             {" "}
//             <Image
//               boxSize="32px"
//               borderRadius={8}
//               src={getCroppedImageUrl(genre.background_image)}
//             />
//             <Text>{genre.name}</Text>
//           </HStack>
//         </ListItem>
//       ))}
//     </List>
//   );
// };

// export default GenreList;
