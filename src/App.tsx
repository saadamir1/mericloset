import { Box, Flex, Grid, GridItem, Heading, Show } from "@chakra-ui/react";
import "./App.css";
import GameGrid from "./components/GameGrid";
import GameHeading from "./components/GameHeading";
import GenreList from "./components/GenreList";
import NavBar from "./components/NavBar";
import PlatformSelector from "./components/PlatformSelector";
import SortSelector from "./components/SortSelector";

function App() {
  return (
    <Grid
      templateAreas={{
        base: '"nav" "main"', // for mobile view
        lg: '"nav nav" "aside main"', //for larger screen view e.g PC or 1080px
      }}
      templateColumns={{
        base: "320px 1fr", // for mobile view
        lg: "230px 1fr", //for larger screen view e.g PC or 1080px
      }}
      justifyContent="center" // Center content horizontally
    >
      <GridItem area="nav">
        <Heading
          fontWeight="bold"
          color="teal.500"
          textShadow="2px 2px #000000"
        >
          Game-Hub
        </Heading>
        <NavBar />
      </GridItem>
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
}

export default App;
