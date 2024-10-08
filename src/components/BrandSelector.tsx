import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import useBrand from "../hooks/useBrand";
import useBrands from "../hooks/useBrands";
import useProductQueryStore from "../store";

const BrandSelector = () => {
  const { data, error } = useBrands();
  const selectedBrandID = useProductQueryStore((s) => s.productQuery.brandID);
  const setselectedBrandID = useProductQueryStore((s) => s.setBrandID);
  const selectedBrand = useBrand(selectedBrandID);

  //if (error) return null;

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<BsChevronDown />}
        size={{ base: "sm", md: "md" }}
      >
        {selectedBrand?.name || "Brands"}
      </MenuButton>
      <MenuList>
        {data?.results.map((brand) => (
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
