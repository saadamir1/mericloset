import {
  Grid,
  Show,
  GridItem,
  Box,
  Flex,
  Heading,
  Text,
  Button,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";
import ProductHeading from "../components/ProductHeading";
import CategoryList from "../components/CategoryList";
import BrandSelector from "../components/BrandSelector";
import SortSelector from "../components/SortSelector";
import InfoSection from "../components/InfoSection";
import CustomSlider from "../components/CustomSlider";
import Scroller from "../components/Scroller";
import FeedbackBanner from "../components/FeedbackBanner";
import useUserStore from "../userStore";
import IntelligenceRail from "../components/IntelligenceRail";
import CompareButton from "../components/CompareButton";

const HomePage = () => {
  const { isLoggedIn, user } = useUserStore();
  const uid = user.id || user._id;
  const heroBg = useColorModeValue(
    "linear-gradient(135deg, #0d9488 0%, #0e1218 55%, #1a1f2a 100%)",
    "linear-gradient(135deg, #064540 0%, #0e1218 60%)",
  );

  return (
    <>
      <Box
        as="section"
        bg={heroBg}
        color="white"
        px={{ base: 5, md: 10 }}
        py={{ base: 10, md: 14 }}
        mb={2}
      >
        <Heading
          as="h1"
          fontSize={{ base: "2.4rem", md: "3.4rem" }}
          maxW="16ch"
          lineHeight={1.05}
          mb={3}
        >
          MeriCloset
        </Heading>
        <Text fontSize={{ base: "md", md: "lg" }} maxW="36ch" opacity={0.9} mb={6}>
          AI style picks, smart compare, and a calm closet for decisions that feel yours.
        </Text>
        <HStack spacing={3} flexWrap="wrap">
          <Button as={RouterLink} to={uid ? `/recommendations/${uid}` : "/recommendations"} size="md">
            Your AI picks
          </Button>
          <Button
            as={RouterLink}
            to="/compare"
            size="md"
            variant="outline"
            borderColor="whiteAlpha.700"
            color="white"
            _hover={{ bg: "whiteAlpha.200" }}
          >
            Compare looks
          </Button>
          {!isLoggedIn && (
            <Button as={RouterLink} to="/signup" size="md" variant="ghost" color="white">
              Join free
            </Button>
          )}
        </HStack>
      </Box>

      <CustomSlider />

      <Box maxW="1600px" mx="auto" px={{ base: 3, md: 6 }} mt={6}>
        <IntelligenceRail />
      </Box>

      <Box maxW="1600px" mx="auto" px={{ base: 3, md: 6 }}>
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
              <ProductHeading />
            </Box>

            <Flex paddingLeft={2} marginBottom={3} flexWrap="wrap" gap={2}>
              <Box marginRight={4}>
                <BrandSelector />
              </Box>
              <SortSelector />
            </Flex>

            <ProductGrid />
          </GridItem>
        </Grid>
      </Box>

      <InfoSection />
      <FeedbackBanner />
      <Scroller />
      <CompareButton />
    </>
  );
};

export default HomePage;
