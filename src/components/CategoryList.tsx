import { Heading, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Text, Spinner, HStack, useColorModeValue } from "@chakra-ui/react";
import useCategories from "../hooks/useCategories";
import useProductQueryStore from "../store";
import Category from "../entities/Category";
import { ChevronRightIcon } from "@chakra-ui/icons";

const CategoryList = () => {
    const { data, isLoading, isError, error } = useCategories();
    const selectedCategoryID = useProductQueryStore((s) => s.productQuery.categoryID);
    const setSelectedCategoryID = useProductQueryStore((s) => s.setCategoryID);

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <Text>Error: {error instanceof Error ? error.message : "Unknown error"}</Text>;
    }

    if (!Array.isArray(data)) {
        return <Text>Error: Invalid data format</Text>;
    }

    // Function to render categories and subcategories
    const renderCategories = (categories: Category[]) => {
        return categories.map((category: Category) => {
            const hasSubcategories = category.subcategories && category.subcategories.length > 0;
            return (
                <AccordionItem key={category._id} border="none">
                    <h2>
                        <AccordionButton
                            _expanded={{ bg: useColorModeValue("teal.100", "teal.700"), color: "teal.600" }} // Highlight on expansion for light/dark mode
                            onClick={() => setSelectedCategoryID(category._id)}
                            _hover={{
                                bg: useColorModeValue("teal.50", "teal.600"),
                                color: useColorModeValue("teal.600", "white"),
                            }}
                        >
                            <Box flex="1" textAlign="left">
                                <HStack>
                                    <ChevronRightIcon />
                                    <Text fontSize="lg" fontWeight="semibold" color={category._id === selectedCategoryID ? "teal.500" : "inherit"}>
                                        {category.name}
                                    </Text>
                                </HStack>
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    {hasSubcategories && (
                        <AccordionPanel pb={4} bg={useColorModeValue("white", "gray.800")}>
                            <Accordion allowMultiple>
                                {renderCategories(category.subcategories)} {/* Recursive call for subcategories */}
                            </Accordion>
                        </AccordionPanel>
                    )}
                </AccordionItem>
            );
        });
    };

    return (
        <Box padding={4} bg={useColorModeValue("gray.50", "gray.800")} borderRadius="md">
            <Heading textAlign="left" fontSize="2xl" marginBottom={3} color={useColorModeValue("black", "white")}>
                Categories
            </Heading>
            <Accordion allowMultiple>
                {data.length > 0 ? (
                    renderCategories(data) // Display root categories and their subcategories
                ) : (
                    <Text>No categories available</Text>
                )}
            </Accordion>
        </Box>
    );
};

export default CategoryList;
