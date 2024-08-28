import {
  Button,
  ButtonGroup,
  Grid,
  grid,
  GridItem,
  Show,
} from "@chakra-ui/react";
import "./App.css";

function App() {
  return (
    <Grid
      templateAreas={{
        base: '"nav" "main"', // for mobile view
        lg: '"nav nav" "aside main"', //for larger screen view e.g PC or 1080px
      }}
    >
      <GridItem area="nav" bg="coral">
        Nav
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" bg="gold">
          Aside
        </GridItem>
      </Show>
      <GridItem area="main" bg="dodgerblue">
        Main
      </GridItem>
    </Grid>
  );
}

export default App;
