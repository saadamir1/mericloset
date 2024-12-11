import {
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
  Spinner,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import useCategories from "../hooks/useCategories";
import useProductQueryStore from "../store";
import Category from "../entities/Category";
import { ChevronRightIcon } from "@chakra-ui/icons";

const CategoryList = () => {
  const { data, isLoading, isError, error } = useCategories();
  const selectedCategoryID = useProductQueryStore((s) => s.productQuery.categoryID);
  const setSelectedCategoryID = useProductQueryStore((s) => s.setCategoryID);

  // Debugging State
  console.log("Selected Category ID:", selectedCategoryID);

  const accordionButtonBg = useColorModeValue("teal.100", "teal.700");
  const accordionButtonHoverBg = useColorModeValue("teal.50", "teal.600");
  const accordionButtonHoverColor = useColorModeValue("teal.600", "white");
  const accordionPanelBg = useColorModeValue("white", "gray.800");
  const headingColor = useColorModeValue("black", "white");

  if (isLoading) {
      console.log("Categories are loading...");
      return <Spinner />;
  }

  if (isError) {
      console.error("Error fetching categories:", error);
      return <Text>Error: {error instanceof Error ? error.message : "Unknown error"}</Text>;
  }

  if (!Array.isArray(data)) {
      console.error("Invalid data format:", data);
      return <Text>Error: Invalid data format</Text>;
  }

  const renderCategories = (categories: Category[]) => {
      console.log("Rendering categories:", categories);

      return categories.map((category: Category) => {
          const hasSubcategories = Array.isArray(category.subcategories) && category.subcategories.length > 0;

          return (
              <AccordionItem key={category._id} border="none">
                  <h2>
                      <AccordionButton
                          _expanded={{ bg: accordionButtonBg, color: "teal.600" }}
                          onClick={() => {
                              console.log(`Category selected: ${category.name} (ID: ${category._id})`);
                              setSelectedCategoryID(category._id);
                          }}
                          _hover={{
                              bg: accordionButtonHoverBg,
                              color: accordionButtonHoverColor,
                          }}
                      >
                          <Box flex="1" textAlign="left">
                              <HStack>
                                  <ChevronRightIcon />
                                  <Text
                                      fontSize="lg"
                                      fontWeight="semibold"
                                      color={category._id === selectedCategoryID ? "teal.500" : "inherit"}
                                  >
                                      {category.name}
                                  </Text>
                              </HStack>
                          </Box>
                          <AccordionIcon />
                      </AccordionButton>
                  </h2>
                  {hasSubcategories && (
                      <AccordionPanel pb={4} bg={accordionPanelBg}>
                          <Accordion allowMultiple>
                              {renderCategories(category.subcategories)}
                          </Accordion>
                      </AccordionPanel>
                  )}
              </AccordionItem>
          );
      });
  };

  return (
      <Box padding={4} bg={useColorModeValue("gray.50", "gray.800")} borderRadius="md">
          <Heading textAlign="left" fontSize="2xl" marginBottom={3} color={headingColor}>
              Categories
          </Heading>
          <Accordion allowMultiple>
              {data.length > 0 ? (
                  renderCategories(data)
              ) : (
                  <Text>No categories available</Text>
              )}
          </Accordion>
      </Box>
  );
};

export default CategoryList;
