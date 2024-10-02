import { Menu, MenuList, MenuItem, MenuButton, Button } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import useProductQueryStore from "../store";

const SortSelector = () => {
  const sortOrders = [
    { value: "", label: "Relevance" },
    { value: "-added", label: "Date Added" },
    { value: "name", label: "Name" },
    { value: "-released", label: "Release Date" },
    { value: "-metacritic", label: "Popularity" },
    { value: "-rating", label: "Average rating" },
  ];

  const sortOrder = useProductQueryStore((s) => s.productQuery.sortOrder);
  const setSortOrder = useProductQueryStore((s) => s.setSortOrder);
  const currentSortOrder = sortOrders.find(
    (order) => order.value === sortOrder
  );

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<BsChevronDown />}
        size={{ base: "sm", md: "md" }}
        //px={2} // Optional: Adjust padding for mobile
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
