import { Menu, MenuList, MenuItem, MenuButton, Button } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import usePlatforms, { Platform } from "../hooks/usePlatforms";

interface Props {
  onSelectPlatform: (platform: Platform) => void;
  selectedPlatformID?: number;
}

const PlatformSelector = ({ onSelectPlatform, selectedPlatformID }: Props) => {
  const { data, error } = usePlatforms();

  if (error) return null; //if error fetching platforms, don't render/display platformSector compnent

  const selectedPlatform = data.results.find(
    (platform) => platform.id === selectedPlatformID
  );

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {" "}
        {selectedPlatform?.name || "Platforms"}{" "}
      </MenuButton>
      <MenuList>
        {data?.results.map((platform) => (
          <MenuItem
            onClick={() => onSelectPlatform(platform)}
            key={platform.id}
          >
            {platform.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default PlatformSelector;
