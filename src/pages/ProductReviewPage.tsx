import {
  Box,
  Heading,
  Textarea,
  Button,
  useToast,
  VStack,
  Text,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import userStore from "../userStore";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const ProductReviewPage = () => {
  const { productId } = useParams();
  const { user } = userStore();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!user) {
      toast({ title: "You must be logged in to submit a review.", status: "error", duration: 3000, isClosable: true });
      return;
    }

    if (rating === 0 || review.trim() === "") {
      toast({ title: "Please provide a rating and a review.", status: "warning", duration: 3000, isClosable: true });
      return;
    }

    try {
      setSubmitting(true);
      await axios.post(`${baseURL}/feedback-products`, {
        userId: user.id,
        productId,
        rating,
        review,
        name: (user as any).name || "Anonymous",
        email: user.email,
      });

      toast({ title: "Review submitted successfully!", status: "success", duration: 3000, isClosable: true });
      navigate(-1); // go back
    } catch (error) {
      console.error("Error submitting review:", error);
      toast({ title: "Something went wrong.", status: "error", duration: 3000, isClosable: true });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box maxW="500px" mx="auto" mt={8} p={4} borderWidth={1} borderRadius="md">
      <Heading size="md" mb={4}>Write a Product Review</Heading>
      <Text fontWeight="bold" mb={1}>Your Rating</Text>
      <HStack mb={4}>
        {[1, 2, 3, 4, 5].map((star) => (
          <IconButton
            key={star}
            icon={<FaStar />}
            aria-label={`${star} star`}
            onClick={() => setRating(star)}
            color={star <= rating ? "yellow.400" : "gray.300"}
            variant="ghost"
            size="lg"
          />
        ))}
      </HStack>

      <Text fontWeight="bold" mb={1}>Your Review</Text>
      <Textarea
        placeholder="Write your honest review..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
        mb={4}
      />

      <VStack>
        <Button
          colorScheme="green"
          onClick={handleSubmit}
          isLoading={submitting}
          width="100%"
        >
          Submit Review
        </Button>
        <Button variant="ghost" onClick={() => navigate(-1)} width="100%">
          Cancel
        </Button>
      </VStack>
    </Box>
  );
};

export default ProductReviewPage;
// This code defines a ProductReviewPage component that allows users to submit product reviews.
// It includes a star rating system and a textarea for the review text.