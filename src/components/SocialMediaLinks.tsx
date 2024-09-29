import { List, ListItem, Link, Icon } from "@chakra-ui/react";
import { FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";

interface SocialMediaLinkProps {
  href: string;
  icon: React.ElementType;
  color: string;
}

const SocialMediaLink = ({ href, icon, color }: SocialMediaLinkProps) => (
  <ListItem>
    <Link href={href} isExternal>
      <Icon as={icon} w={6} h={6} color={color} />
    </Link>
  </ListItem>
);

const SocialMediaLinks = () => (
  <List display="flex" gap={4}>
    <SocialMediaLink
      href="https://linkedin.com"
      icon={FaLinkedin}
      color="#0A66C2"
    />
    <SocialMediaLink
      href="https://facebook.com"
      icon={FaFacebook}
      color="#1877F2"
    />
    <SocialMediaLink
      href="https://instagram.com"
      icon={FaInstagram}
      color="#C13584"
    />
  </List>
);

export default SocialMediaLinks;
