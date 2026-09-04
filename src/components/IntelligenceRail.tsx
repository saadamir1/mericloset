import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Image,
  LinkBox,
  LinkOverlay,
  Button,
  HStack,
  useColorModeValue,
  Tag,
  Wrap,
  WrapItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  VStack,
  CheckboxGroup,
  Checkbox,
  RadioGroup,
  Radio,
  Stack,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE, mediaUrl } from "../config";
import {
  getRecentViews,
  getStyleProfile,
  saveStyleProfile,
  styleQueryFromProfile,
  StyleProfile,
} from "../intelligence/memory";
import useUserStore from "../userStore";

const OCCASIONS = ["Eid", "Wedding", "Office", "Casual", "Mehndi"];
const VIBES = ["Classic", "Modern", "Minimal", "Festive", "Street"];
const COLORS = ["Black", "White", "Green", "Maroon", "Beige", "Navy"];

const IntelligenceRail = () => {
  const recent = getRecentViews();
  const profile = getStyleProfile();
  const { user, isLoggedIn } = useUserStore();
  const uid = user.id || user._id;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [picks, setPicks] = useState<any[]>([]);
  const [occasions, setOccasions] = useState<string[]>(profile?.occasions || []);
  const [vibes, setVibes] = useState<string[]>(profile?.vibes || []);
  const [colors, setColors] = useState<string[]>(profile?.colors || []);
  const [budget, setBudget] = useState<StyleProfile["budget"]>(profile?.budget || "mid");
  const cardBg = useColorModeValue("white", "gray.800");
  const railBg = useColorModeValue("blackAlpha.50", "whiteAlpha.50");

  useEffect(() => {
    const load = async () => {
      try {
        if (isLoggedIn && uid) {
          const { data } = await axios.get(`${API_BASE}/intelligence/for-you/${uid}`);
          setPicks(data.products || []);
          return;
        }
        if (profile) {
          const { data } = await axios.post(`${API_BASE}/intelligence/smart-search`, {
            query: styleQueryFromProfile(profile),
            profile,
          });
          setPicks(data.products || []);
        } else {
          const { data } = await axios.get(`${API_BASE}/intelligence/trending`);
          setPicks(data.products || []);
        }
      } catch {
        /* offline / empty catalog */
      }
    };
    load();
  }, [isLoggedIn, uid, profile?.updatedAt]);

  const saveQuiz = () => {
    saveStyleProfile({ occasions, vibes, colors, budget });
    onClose();
    window.location.reload();
  };

  const ProductStrip = ({
    title,
    subtitle,
    items,
  }: {
    title: string;
    subtitle: string;
    items: any[];
  }) => {
    if (!items?.length) return null;
    return (
      <Box mb={8}>
        <Heading size="md" mb={1}>
          {title}
        </Heading>
        <Text fontSize="sm" color="gray.500" mb={4}>
          {subtitle}
        </Text>
        <SimpleGrid columns={{ base: 2, md: 4, lg: 5 }} spacing={4}>
          {items.slice(0, 5).map((p) => {
            const id = p.id || p._id;
            const img = mediaUrl(p.image || p.images?.[0] || "");
            return (
              <LinkBox
                key={id}
                bg={cardBg}
                borderRadius="xl"
                overflow="hidden"
                borderWidth="1px"
                _hover={{ shadow: "md" }}
              >
                <Image src={img} alt={p.title} h="140px" w="100%" objectFit="cover" />
                <Box p={3}>
                  <LinkOverlay as={RouterLink} to={`/products/${p.slug || id}`} fontSize="sm" fontWeight="600" noOfLines={2}>
                    {p.title}
                  </LinkOverlay>
                  {p.price != null && (
                    <Text fontSize="sm" mt={1}>
                      Rs. {Math.floor(p.price)}
                    </Text>
                  )}
                </Box>
              </LinkBox>
            );
          })}
        </SimpleGrid>
      </Box>
    );
  };

  return (
    <Box bg={railBg} borderRadius="2xl" p={{ base: 4, md: 6 }} mb={8}>
      <HStack justify="space-between" mb={6} flexWrap="wrap" gap={3}>
        <Box>
          <Heading size="md">Style intelligence</Heading>
          <Text fontSize="sm" color="gray.500">
            Inspired by AI stylist apps: taste profile, recent views, and for-you picks.
          </Text>
        </Box>
        <HStack>
          <Button size="sm" variant="outline" onClick={onOpen}>
            {profile ? "Update style quiz" : "30s style quiz"}
          </Button>
          <Button as={RouterLink} to="/outfit-builder" size="sm" variant="outline">
            Outfit builder
          </Button>
          <Button as={RouterLink} to={uid ? `/recommendations/${uid}` : "/recommendations"} size="sm" colorScheme="brand">
            Open AI picks
          </Button>
        </HStack>
      </HStack>

      {profile && (
        <Wrap mb={5}>
          {[...profile.occasions, ...profile.vibes, ...profile.colors, profile.budget].map((t) => (
            <WrapItem key={t}>
              <Tag borderRadius="full" colorScheme="brand">
                {t}
              </Tag>
            </WrapItem>
          ))}
        </Wrap>
      )}

      <ProductStrip
        title="For you"
        subtitle={isLoggedIn ? "Learned from what you browse" : "From your style quiz / trending"}
        items={picks}
      />
      <ProductStrip title="Recently viewed" subtitle="Pick up where you left off" items={recent} />

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Quick style quiz</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="stretch" spacing={5}>
              <Box>
                <Text fontWeight="600" mb={2}>
                  Occasions
                </Text>
                <CheckboxGroup value={occasions} onChange={(v) => setOccasions(v as string[])}>
                  <Wrap>
                    {OCCASIONS.map((o) => (
                      <WrapItem key={o}>
                        <Checkbox value={o}>{o}</Checkbox>
                      </WrapItem>
                    ))}
                  </Wrap>
                </CheckboxGroup>
              </Box>
              <Box>
                <Text fontWeight="600" mb={2}>
                  Vibe
                </Text>
                <CheckboxGroup value={vibes} onChange={(v) => setVibes(v as string[])}>
                  <Wrap>
                    {VIBES.map((o) => (
                      <WrapItem key={o}>
                        <Checkbox value={o}>{o}</Checkbox>
                      </WrapItem>
                    ))}
                  </Wrap>
                </CheckboxGroup>
              </Box>
              <Box>
                <Text fontWeight="600" mb={2}>
                  Colors you reach for
                </Text>
                <CheckboxGroup value={colors} onChange={(v) => setColors(v as string[])}>
                  <Wrap>
                    {COLORS.map((o) => (
                      <WrapItem key={o}>
                        <Checkbox value={o}>{o}</Checkbox>
                      </WrapItem>
                    ))}
                  </Wrap>
                </CheckboxGroup>
              </Box>
              <Box>
                <Text fontWeight="600" mb={2}>
                  Budget lane
                </Text>
                <RadioGroup value={budget} onChange={(v) => setBudget(v as StyleProfile["budget"])}>
                  <Stack direction="row">
                    <Radio value="value">Value</Radio>
                    <Radio value="mid">Mid</Radio>
                    <Radio value="premium">Premium</Radio>
                  </Stack>
                </RadioGroup>
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={saveQuiz} colorScheme="brand">
              Save & refresh picks
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default IntelligenceRail;
