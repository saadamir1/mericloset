import { Grid, Show, GridItem, Box, Flex } from "@chakra-ui/react";
import GameGrid from "../components/GameGrid";
import GameHeading from "../components/GameHeading";
import GenreList from "../components/GenreList";
import PlatformSelector from "../components/PlatformSelector";
import SortSelector from "../components/SortSelector";

const HomePage = () => {
  return (
    <Grid
      templateAreas={{
        base: ' "main"', // for mobile view
        lg: ' "aside main"', //for larger screen view e.g PC or 1080px
      }}
      templateColumns={{
        base: "320px 1fr", // for mobile view
        lg: "230px 1fr", //for larger screen view e.g PC or 1080px
      }}
      justifyContent="center" // Center content horizontally
    >
      <Show above="lg">
        <GridItem area="aside">
          <GenreList />
        </GridItem>
      </Show>
      <GridItem area="main">
        <Box paddingLeft={2} textAlign="left">
          <GameHeading />
        </Box>
        <Flex paddingLeft={2} marginBottom={3}>
          <Box marginRight={4}>
            <PlatformSelector />
          </Box>

          <SortSelector />
        </Flex>
        <GameGrid />
      </GridItem>
    </Grid>
  );
};

export default HomePage;
