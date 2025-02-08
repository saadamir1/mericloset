import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import useBrands from "../hooks/useBrands";
import useProductQueryStore from "../store";
import Brand from "../entities/Brand";

const BrandSelector = () => {
  const { data, error, isLoading } = useBrands();
  const selectedBrand = useProductQueryStore((s) => s.productQuery.brandID); // Retrieve the brand name from store
  const setSelectedBrand = useProductQueryStore((s) => s.setBrandID); // Function to set the brand name in store

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
  const brands: Brand[] = Array.isArray(data) ? data : data?.results || [];

  if (!brands || brands.length === 0) {
    return <div>No brands available</div>;
  }

  // Determine the label to show in the dropdown button
  const brandLabel = selectedBrand ? `Brand: ${selectedBrand}` : "Select a brand";

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
            onClick={() => setSelectedBrand(brand.name)}  // Set the brand name when a brand is selected
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
