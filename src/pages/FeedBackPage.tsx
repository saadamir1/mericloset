import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Heading,
  useToast,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaStar } from "react-icons/fa";

const FeedbackPage = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "", rating: 0 });
  const toast = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRating = (value: number) => {
    setForm((prev) => ({ ...prev, rating: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://mericloset-backend-66892c258cf6.herokuapp.com/api/v1/feedback",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) throw new Error("Failed to submit");

      toast({
        title: "Feedback sent!",
        description: "Thank you for your feedback.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });

      setForm({ name: "", email: "", message: "", rating: 0 });
    } catch (err) {
      toast({
        title: "Error",
        description: "Could not send feedback.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="lg" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="xl" boxShadow="md">
      <Heading size="lg" mb={4}>
        Send Us Your Feedback
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired mb={3}>
          <FormLabel>Name</FormLabel>
          <Input name="name" value={form.name} onChange={handleChange} placeholder="Your name" />
        </FormControl>

        <FormControl isRequired mb={3}>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
        </FormControl>

        <FormControl isRequired mb={3}>
          <FormLabel>Message</FormLabel>
          <Textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your feedback"
          />
        </FormControl>

        <FormControl isRequired mb={4}>
          <FormLabel>Rate Your Experience</FormLabel>
          <HStack spacing={1}>
            {[1, 2, 3, 4, 5].map((star) => (
              <IconButton
                key={star}
                icon={<FaStar />}
                aria-label={`Rate ${star}`}
                color={form.rating >= star ? "yellow.400" : "gray.300"}
                variant="ghost"
                onClick={() => handleRating(star)}
              />
            ))}
          </HStack>
        </FormControl>

        <Button type="submit" colorScheme="teal" width="full">
          Submit Feedback
        </Button>
      </form>
    </Box>
  );
};

export default FeedbackPage;
