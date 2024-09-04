import { Box, Flex, Grid, GridItem, Heading, Show } from "@chakra-ui/react";
import "./App.css";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";
import { useState } from "react";
import PlatformSelector from "./components/PlatformSelector";
import SortSelector from "./components/SortSelector";
import GameHeading from "./components/GameHeading";

export interface GameQuery {
  genreID?: number;
  platformID?: number; // same as platformID: number | undefined;
  sortOrder: string;
  searchText: string;
}

function App() {
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);
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
        <NavBar
          onSearch={(searchText) => setGameQuery({ ...gameQuery, searchText })}
        />
      </GridItem>
      <Show above="lg">
        <GridItem area="aside">
          <GenreList
            selectedGenreID={gameQuery.genreID}
            onSelectGenre={(genre) =>
              setGameQuery({ ...gameQuery, genreID: genre.id })
            }
          />
        </GridItem>
      </Show>
      <GridItem area="main">
        <Box paddingLeft={2} textAlign="left">
          <GameHeading gameQuery={gameQuery} />
        </Box>
        <Flex paddingLeft={2} marginBottom={3}>
          <Box marginRight={4}>
            <PlatformSelector
              selectedPlatformID={gameQuery.platformID}
              onSelectPlatform={(platform) =>
                setGameQuery({ ...gameQuery, platformID: platform.id })
              }
            />
          </Box>

          <SortSelector
            sortOrder={gameQuery.sortOrder}
            onSelectSortOrder={(sortOrder) =>
              setGameQuery({ ...gameQuery, sortOrder })
            }
          />
        </Flex>
        {/* </Box> */}
        <GameGrid gameQuery={gameQuery} />
      </GridItem>
    </Grid>
  );
}

export default App;
