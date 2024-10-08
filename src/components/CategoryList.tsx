import {
  Button,
  Heading,
  HStack,
  Image,
  List,
  ListItem,
  Spinner,
} from "@chakra-ui/react";
import useCategories from "../hooks/useCategories";
import getCroppedImageUrl from "../services/image-url";
import useProductQueryStore from "../store";

const CategoryList = () => {
  const { data, isLoading, error } = useCategories();
  const selectedCategoryID = useProductQueryStore((s) => s.productQuery.categoryID);
  const setSelectedCategoryID = useProductQueryStore((s) => s.setCategoryID);

  if (isLoading) return <Spinner />;
  //if (error) return null;

  return (
    <>
      <Heading textAlign="left" fontSize="2xl" marginBottom={3}>
        Categories
      </Heading>
      <List>
        {data?.results.map((category) => (
          <ListItem key={category.id} paddingY="5px">
            <HStack>
              <Image
                boxSize="32px"
                borderRadius={8}
                src={getCroppedImageUrl(category.image_background)}
              />
              <Button
                onClick={() => setSelectedCategoryID(category.id)}
                fontSize="lg"
                variant="link"
                whiteSpace="nowrap"
                textAlign="left"
                objectFit="cover"
                fontWeight={category.id === selectedCategoryID ? "bold" : "normal"}
                textColor={
                  category.id === selectedCategoryID ? "teal.300" : "inherit"
                }
              >
                {category.name}
              </Button>
            </HStack>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default CategoryList;
