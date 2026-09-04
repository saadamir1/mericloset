import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  SimpleGrid,
  Image,
  Select,
  HStack,
  VStack,
  Badge,
  useToast,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import { API_BASE, mediaUrl } from "../config";
import { getRecentViews, getStyleProfile } from "../intelligence/memory";

const OutfitBuilderPage = () => {
  const toast = useToast();
  const recent = useMemo(() => getRecentViews(), []);
  const profile = getStyleProfile();
  const [occasion, setOccasion] = useState(profile?.occasions?.[0] || "Eid");
  const [seedId, setSeedId] = useState(recent[0]?.id || "");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const cardBg = useColorModeValue("white", "gray.800");

  const build = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${API_BASE}/intelligence/outfit-builder`, {
        occasion,
        productIds: seedId ? [seedId] : [],
        profile: profile || undefined,
      });
      setResult(data);
    } catch (e: any) {
      toast({
        title: "Outfit builder unavailable",
        description: e?.response?.data?.message || "Try again when the API is online",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="1100px" mx="auto" py={6}>
      <Heading size="lg" mb={2}>
        AI outfit builder
      </Heading>
      <Text color="gray.500" mb={6}>
        Combines color harmony, content similarity, price affinity, and optional Gemini styling notes.
      </Text>

      <HStack spacing={3} mb={6} flexWrap="wrap">
        <Select maxW="200px" value={occasion} onChange={(e) => setOccasion(e.target.value)}>
          {["Eid", "Wedding", "Office", "Casual", "Mehndi", "Formal"].map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </Select>
        <Select
          maxW="320px"
          placeholder="Seed from recently viewed (optional)"
          value={seedId}
          onChange={(e) => setSeedId(e.target.value)}
        >
          {recent.map((r) => (
            <option key={r.id} value={r.id}>
              {r.title}
            </option>
          ))}
        </Select>
        <Button colorScheme="brand" onClick={build} isLoading={loading}>
          Build look
        </Button>
      </HStack>

      {loading && (
        <HStack py={10} justify="center">
          <Spinner color="brand.500" />
          <Text>Scoring catalog…</Text>
        </HStack>
      )}

      {result && (
        <VStack align="stretch" spacing={5}>
          <Box bg={cardBg} p={4} borderRadius="xl" borderWidth="1px">
            <HStack mb={2} flexWrap="wrap" gap={2}>
              <Badge colorScheme="brand">{result.algorithm}</Badge>
              {result.model && <Badge>Gemini · {result.model}</Badge>}
            </HStack>
            <Text>{result.stylingNote}</Text>
          </Box>
          <SimpleGrid columns={{ base: 2, md: 3, lg: 5 }} spacing={4}>
            {(result.products || []).map((p: any) => (
              <Box key={p._id || p.id} bg={cardBg} borderRadius="xl" overflow="hidden" borderWidth="1px">
                <Image
                  src={mediaUrl(p.images?.[0])}
                  alt={p.title}
                  h="160px"
                  w="100%"
                  objectFit="cover"
                />
                <Box p={3}>
                  <Text as={RouterLink} to={`/products/${p.id || p._id}`} fontWeight="600" fontSize="sm" noOfLines={2}>
                    {p.title}
                  </Text>
                  <Text fontSize="sm" mt={1}>
                    Rs. {Math.floor(p.price)}
                  </Text>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      )}
    </Box>
  );
};

export default OutfitBuilderPage;
