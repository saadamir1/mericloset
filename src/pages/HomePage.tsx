import { Grid, Show, GridItem, Box, Flex } from "@chakra-ui/react";
import GameGrid from "../components/ProductGrid";
import GameHeading from "../components/ProductHeading";
import CategoryList from "../components/CategoryList";
import BrandSelector from "../components/BrandSelector";
import SortSelector from "../components/SortSelector";

const HomePage = () => {
  return (
    <Grid
      templateAreas={{
        base: ' "main"', // for mobile view
        lg: ' "aside main"', // for larger screen view e.g PC or 1080px
      }}
      templateColumns={{
        base: "320px 1fr", // for mobile view
        lg: "230px 1fr", // for larger screen view e.g PC or 1080px
      }}
      justifyContent="center" // Center content horizontally
    >
      <Show above="lg">
        <GridItem area="aside" paddingTop={10}>
          {" "}
          <CategoryList />
        </GridItem>
      </Show>
      <GridItem area="main">
        <Box paddingLeft={2} paddingTop={3} textAlign="left">
          {" "}
          <GameHeading />
        </Box>
        <Flex paddingLeft={2} marginBottom={3}>
          <Box marginRight={4}>
            <BrandSelector />
          </Box>

          <SortSelector />
        </Flex>
        <GameGrid />
      </GridItem>
    </Grid>
  );
};

export default HomePage;
