import {
  Grid,
  Show,
  GridItem,
  Box,
  Flex,
  Button,
  Center,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import GameGrid from "../components/ProductGrid";
import GameHeading from "../components/ProductHeading";
import CategoryList from "../components/CategoryList";
import BrandSelector from "../components/BrandSelector";
import SortSelector from "../components/SortSelector";
import InfoSection from "../components/InfoSection";
import CustomSlider from "../components/CustomSlider";
import Scroller from "../components/Scroller";

const HomePage = () => {
  return (
    <>
      {/* Image Slider */}
      <CustomSlider />

      {/* Main Content */}
      <Grid
        templateAreas={{
          base: '"main"',
          lg: '"aside main"',
        }}
        templateColumns={{
          base: "1fr",
          lg: "230px 1fr",
        }}
      >
        <Show above="lg">
          <GridItem area="aside" paddingTop={10} paddingRight={3}>
            <CategoryList />
          </GridItem>
        </Show>
        <GridItem area="main">
          <Box paddingLeft={2} paddingTop={3} textAlign="left">
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

      {/* Info Section */}
      <InfoSection />

      {/* Feedback Button */}
      <Center mt={10} mb={4}>
        <Link to="/feedback">
          <Button colorScheme="blue" size="lg" px={10}>
            Give Feedback
          </Button>
        </Link>
      </Center>

      {/* Scroll Buttons */}
      <Scroller />
    </>
  );
};

export default HomePage;
