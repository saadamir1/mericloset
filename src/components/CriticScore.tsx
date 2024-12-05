import { Badge } from "@chakra-ui/react";

interface Props {
  price: number;
}

const PriceBadge = ({ price }: Props) => {
  let color =
    price > 5000 ? "green" : // High price
    price > 2500 ? "yellow" : // Mid-range price
    "red"; // Low price

  return (
    <Badge colorScheme={color} paddingX={2} borderRadius="4px">
      Rs. {Math.round(price).toLocaleString()} {/* Rounds to the nearest whole number */}
    </Badge>
  );
};

export default PriceBadge;
