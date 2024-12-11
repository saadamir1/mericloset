import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import useBrands from "../hooks/useBrands";
import useProductQueryStore from "../store";
import Brand from "../entities/Brand";

const BrandSelector = () => {
  const { data, error, isLoading } = useBrands();
  const selectedBrandID = useProductQueryStore((s) => s.productQuery.brandID);
  const setselectedBrandID = useProductQueryStore((s) => s.setBrandID);

  if (error) {
    console.error("Error fetching brands:", error);
  }

  if (isLoading) {
    return <div>Loading brands...</div>;
  }

  if (error) {
    return <div>Error loading brands</div>;
  }

  // Extract brands from `data`, assuming it's a `FetchResponse<Brand>`
  const brands: Brand[] = Array.isArray(data) ? data : data?.results || [];  // Adjust as per the correct property

  if (!brands || brands.length === 0) {
    return <div>No brands available</div>;
  }

  const brandLabel = selectedBrandID
    ? `Brand: ${selectedBrandID}`
    : "Select a brand";

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<BsChevronDown />}
        size={{ base: "sm", md: "md" }}
      >
        {brandLabel}
      </MenuButton>
      <MenuList>
        {brands.map((brand) => (
          <MenuItem
            onClick={() => setselectedBrandID(brand.id)}
            key={brand.id}
          >
            {brand.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default BrandSelector;
