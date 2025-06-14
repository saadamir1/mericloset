import {
  Box,
  Heading,
  Text,
  VStack,
  RadioGroup,
  Radio,
  Button,
  Input,
  useToast,
  Divider,
  useColorModeValue,
  HStack,
  Image,
} from "@chakra-ui/react";
import { useEffect, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import visaIcon from "../assets/visa.jpg";
import masterIcon from "../assets/mastercard.png";
import unknownIcon from "../assets/unknown.png";

interface OrderType {
  title: string;
  image: string;
  price: number;
  quantity: number;
}

const Checkout = () => {
  const [order, setOrder] = useState<OrderType | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    type: "",
  });
  const [shipping, setShipping] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const [contact, setContact] = useState({
    email: "",
    phone: "",
  });
  const [showRequiredNote, setShowRequiredNote] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const savedOrder = localStorage.getItem("checkout_order");
    if (savedOrder) setOrder(JSON.parse(savedOrder));
  }, []);

  const handleCardChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (e.target.name === "number") {
      value = value.replace(/[^0-9]/g, "").replace(/(.{4})/g, "$1-").slice(0, 19);
      const plainNumber = value.replace(/-/g, "");
      const firstDigit = plainNumber.charAt(0);
      let type = firstDigit === "4" ? "Visa" : firstDigit === "5" ? "MasterCard" : "Unknown";
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
    const requiredMissing = !shipping.fullName || !shipping.address || !shipping.city || !shipping.postalCode || !contact.phone;
    const cardMissing = paymentMethod === "card" && (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv);

    if (requiredMissing || cardMissing) {
      setShowRequiredNote(true);
      toast({ title: "Please fill all required fields.", status: "warning", duration: 3000, isClosable: true });
      return false;
    }
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateFields()) return;

    if (paymentMethod === "card") {
      try {
        const res = await fetch("http://localhost:5170/create-checkout-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            product: {
              title: order!.title,
              image: order!.image,
              price: order!.price,
              quantity: order!.quantity,
            },
          }),
        });

        const data = await res.json();
        if (data.url) {
          window.location.href = data.url;
        } else {
          toast({ title: "Stripe session creation failed", status: "error", duration: 3000, isClosable: true });
        }
      } catch (err) {
        toast({ title: "Error connecting to Stripe", status: "error", duration: 3000, isClosable: true });
      }
    } else {
      try {
        await fetch("http://localhost:5170/cash-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            order,
            shipping,
            contact,
            paymentMethod: "Cash on Delivery",
          }),
        });
        toast({ title: "Order placed successfully via COD!", status: "success", duration: 3000, isClosable: true });
        localStorage.removeItem("checkout_order");
        navigate("/");
      } catch (err) {
        toast({ title: "Error saving COD order", status: "error", duration: 3000, isClosable: true });
      }
    }
  };

  const themeBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  if (!order) return <Text p={10}>No order found. Please go back and add a product.</Text>;

  return (
    <Box p={8} maxW="600px" mx="auto" bg={themeBg} boxShadow="md" borderRadius="lg" border="1px solid" borderColor={borderColor}>
      <Heading size="lg" mb={6}>Checkout</Heading>
      {showRequiredNote && <Text color="red.500">* Required fields must be filled</Text>}
      <VStack align="start" spacing={4}>
        <HStack spacing={4}>
          <Image src={order.image} boxSize="100px" objectFit="cover" borderRadius="md" />
          <Box>
            <Text fontWeight="bold">{order.title}</Text>
            <Text>Quantity: {order.quantity}</Text>
            <Text>Total: Rs. {order.price * order.quantity}</Text>
          </Box>
        </HStack>

        <Divider my={4} />

        <Text fontWeight="bold">Shipping Details:</Text>
        <Input isRequired placeholder="Full Name *" value={shipping.fullName} onChange={e => setShipping({ ...shipping, fullName: e.target.value })} />
        <Input isRequired placeholder="Address *" value={shipping.address} onChange={e => setShipping({ ...shipping, address: e.target.value })} />
        <Input isRequired placeholder="City *" value={shipping.city} onChange={e => setShipping({ ...shipping, city: e.target.value })} />
        <Input isRequired placeholder="Postal Code *" value={shipping.postalCode} onChange={e => setShipping({ ...shipping, postalCode: e.target.value })} />

        <Divider my={4} />

        <Text fontWeight="bold">Contact Details:</Text>
        <Input placeholder="Email (optional)" value={contact.email} onChange={e => setContact({ ...contact, email: e.target.value })} />
        <Input isRequired placeholder="Phone Number *" value={contact.phone} onChange={e => setContact({ ...contact, phone: e.target.value })} />

        <Divider my={4} />

        <Text fontWeight="bold">Select Payment Method:</Text>
        <RadioGroup onChange={setPaymentMethod} value={paymentMethod}>
          <HStack spacing={5}>
            <Radio value="cod">Cash on Delivery</Radio>
            <Radio value="card">Credit/Debit Card</Radio>
          </HStack>
        </RadioGroup>

        {paymentMethod === "card" && (
          <Box mt={4} w="100%">
            <Input isRequired name="number" placeholder="Card Number *" value={cardDetails.number} onChange={handleCardChange} mb={2} />
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
            <Input isRequired name="expiry" placeholder="Expiry Date (MM/YY) *" value={cardDetails.expiry} onChange={handleCardChange} mb={2} />
            <Input isRequired name="cvv" placeholder="CVV *" value={cardDetails.cvv} onChange={handleCardChange} mb={2} />
          </Box>
        )}

        <Button colorScheme="green" mt={4} w="full" onClick={handlePlaceOrder}>Place Order</Button>
      </VStack>
    </Box>
  );
};

export default Checkout;
