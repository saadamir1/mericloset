import { Menu, MenuList, MenuItem, MenuButton, Button } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import useProductQueryStore from "../store"; // Your custom store

const SortSelector = () => {
  const sortOrders = [
    { value: "", label: "Relevance" }, // Default sorting
    { value: "-added", label: "Date Added" },
    { value: "name", label: "Name (A-Z)" },
    { value: "-name", label: "Name (Z-A)" },
    { value: "price", label: "Price (Low to High)" },
    { value: "-price", label: "Price (High to Low)" },
  ];

  const sortOrder = useProductQueryStore((s) => s.productQuery.sortOrder);
  const setSortOrder = useProductQueryStore((s) => s.setSortOrder);
  const currentSortOrder = sortOrders.find(
    (order) => order.value === sortOrder
  );
  console.log("Current sort order:", sortOrder);


  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<BsChevronDown />}
        size={{ base: "sm", md: "md" }}
      >
        {currentSortOrder?.label || "Order by: Relevance"}
      </MenuButton>
      <MenuList>
        {sortOrders.map((order) => (
          <MenuItem
            onClick={() => setSortOrder(order.value)}
            key={order.value}
            value={order.value}
          >
            {order.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default SortSelector;
