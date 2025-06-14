import {
  Box,
  Heading,
  Text,
  RadioGroup,
  Radio,
  Button,
  Input,
  useToast,
  Divider,
  useColorModeValue,
  HStack,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";
import { useEffect, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import visaIcon from "../assets/visa.jpg";
import masterIcon from "../assets/mastercard.png";
import unknownIcon from "../assets/unknown.png";
import userStore from "../userStore"; // ✅ added

interface ProductItem {
  product: {
    _id: string;
    title: string;
    image: string;
    price: number;
    quantity: number;
    images: string[];
  };
}

const WishlistCheckout = () => {
  const [items, setItems] = useState<ProductItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvv: "", type: "" });
  const [shipping, setShipping] = useState({ fullName: "", address: "", city: "", postalCode: "" });
  const [contact, setContact] = useState({ email: "", phone: "" });
  const [showRequiredNote, setShowRequiredNote] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();
  const { user } = userStore(); // ✅ get user

  useEffect(() => {
    const stored = localStorage.getItem("wishlist_checkout_items");
    if (stored) setItems(JSON.parse(stored));
  }, []);

  const handleCardChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (e.target.name === "number") {
      value = value.replace(/[^0-9]/g, "").replace(/(.{4})/g, "$1-").slice(0, 19);
      const plainNumber = value.replace(/-/g, "");
      const type = plainNumber.startsWith("4") ? "Visa" : plainNumber.startsWith("5") ? "MasterCard" : "Unknown";
      setCardDetails({ ...cardDetails, number: value, type });
    } else if (e.target.name === "expiry") {
      value = value.replace(/\D/g, "").slice(0, 4);
      if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2);
      setCardDetails({ ...cardDetails, expiry: value });
    } else {
      setCardDetails({ ...cardDetails, [e.target.name]: value });
    }
  };

  const validateFields = () => {
    const missingShipping = !shipping.fullName || !shipping.address || !shipping.city || !shipping.postalCode || !contact.phone;
    const missingCard = paymentMethod === "card" && (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv);
    if (missingShipping || missingCard) {
      setShowRequiredNote(true);
      toast({ title: "Please fill all required fields.", status: "warning", duration: 3000, isClosable: true });
      return false;
    }
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateFields()) return;

    const payload = {
      items: items.map(i => ({
        title: i.product.title,
        image: i.product.images[0],
        price: i.product.price,
        quantity: 1,
      })),
      shipping,
      contact,
      paymentMethod,
      userId: user?.id || null, // ✅ added
    };

    if (paymentMethod === "card") {
      try {
        const res = await fetch("http://localhost:5170/create-checkout-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: payload.items }),
        });
        const data = await res.json();
        if (data.url) {
          localStorage.removeItem("wishlist_checkout_items");
          window.location.href = data.url;
        } else {
          toast({ title: "Stripe session creation failed", status: "error", duration: 3000, isClosable: true });
        }
      } catch (err) {
        toast({ title: "Error connecting to Stripe", status: "error", duration: 3000, isClosable: true });
      }
    } else {
      try {
        await fetch("http://localhost:5170/wishlist-cash-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        toast({ title: "Order placed successfully via COD!", status: "success", duration: 3000, isClosable: true });
        localStorage.removeItem("wishlist_checkout_items");
        navigate("/");
      } catch (err) {
        toast({ title: "Error saving COD order", status: "error", duration: 3000, isClosable: true });
      }
    }
  };

  const themeBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Box p={8} maxW="800px" mx="auto" bg={themeBg} boxShadow="md" borderRadius="lg" border="1px solid" borderColor={borderColor}>
      <Heading size="lg" mb={6}>Wishlist Checkout</Heading>
      {showRequiredNote && <Text color="red.500">* Required fields must be filled</Text>}

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={4}>
        {items.map((item) => (
          <HStack key={item.product._id} spacing={4} align="start">
            <Image src={item.product.images[0]} boxSize="80px" borderRadius="md" />
            <Box>
              <Text fontWeight="bold">{item.product.title}</Text>
              <Text fontSize="sm">Rs. {item.product.price}</Text>
            </Box>
          </HStack>
        ))}
      </SimpleGrid>

      <Divider my={4} />
      <Text fontWeight="bold">Shipping Details:</Text>
      <Input placeholder="Full Name *" value={shipping.fullName} onChange={e => setShipping({ ...shipping, fullName: e.target.value })} />
      <Input placeholder="Address *" value={shipping.address} onChange={e => setShipping({ ...shipping, address: e.target.value })} />
      <Input placeholder="City *" value={shipping.city} onChange={e => setShipping({ ...shipping, city: e.target.value })} />
      <Input placeholder="Postal Code *" value={shipping.postalCode} onChange={e => setShipping({ ...shipping, postalCode: e.target.value })} />

      <Divider my={4} />
      <Text fontWeight="bold">Contact Details:</Text>
      <Input placeholder="Email (optional)" value={contact.email} onChange={e => setContact({ ...contact, email: e.target.value })} />
      <Input placeholder="Phone Number *" value={contact.phone} onChange={e => setContact({ ...contact, phone: e.target.value })} />

      <Divider my={4} />
      <Text fontWeight="bold">Select Payment Method:</Text>
      <RadioGroup onChange={setPaymentMethod} value={paymentMethod}>
        <HStack spacing={5} mt={2}>
          <Radio value="cod">Cash on Delivery</Radio>
          <Radio value="card">Credit/Debit Card</Radio>
        </HStack>
      </RadioGroup>

      {paymentMethod === "card" && (
        <Box mt={4} w="100%">
          <Input name="number" placeholder="Card Number *" value={cardDetails.number} onChange={handleCardChange} mb={2} />
          {cardDetails.type && (
            <HStack spacing={2} align="center" mb={2}>
              <Text fontSize="sm" color="gray.500">Detected: {cardDetails.type}</Text>
              <Image
                src={cardDetails.type === "Visa" ? visaIcon : cardDetails.type === "MasterCard" ? masterIcon : unknownIcon}
                alt={cardDetails.type}
                boxSize="40px"
                objectFit="contain"
              />
            </HStack>
          )}
          <Input name="expiry" placeholder="Expiry Date (MM/YY) *" value={cardDetails.expiry} onChange={handleCardChange} mb={2} />
          <Input name="cvv" placeholder="CVV *" value={cardDetails.cvv} onChange={handleCardChange} mb={2} />
        </Box>
      )}

      <Button colorScheme="green" mt={6} w="full" onClick={handlePlaceOrder}>Place Order</Button>
    </Box>
  );
};

export default WishlistCheckout;
