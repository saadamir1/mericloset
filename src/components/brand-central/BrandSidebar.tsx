import React from 'react';
import { 
  Box, 
  VStack, 
  Button, 
  Image, 
  Flex, 
  Text, 
  Icon, 
  Divider, 
  Tooltip
} from '@chakra-ui/react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  FiHome, 
  FiPlusCircle, 
  FiEdit, 
  FiLogOut, 
  FiPackage, 
  FiBarChart
} from 'react-icons/fi';
import logo from './../../assets/logo.webp';
import useUserStore from './../../userStore';

const BrandSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useUserStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Helper function to check active route
  const isActive = (path: string) => location.pathname === path;

  return (
    <Box
      width="240px"
      bg="#1A202C" // Dark background for contrast with white logo text
      height="100vh"
      position="fixed"
      left={0}
      top={0}
      boxShadow="0 0 10px rgba(0, 0, 0, 0.3)"
      color="white"
    >
      {/* Brand Header */}
      <Flex 
        align="center" 
        justify="center" 
        py={6} 
        borderBottom="1px solid"
        borderColor="whiteAlpha.200"
      >
        <Image src={logo} alt="Logo" maxHeight="40px" />
      </Flex>

      {/* Main Navigation */}
      <Box p={4}>
        <Text 
          fontSize="xs" 
          fontWeight="bold" 
          color="#68D391" // Light green to match your brand
          mb={3} 
          textTransform="uppercase"
          px={2}
        >
          Brand Management
        </Text>

        <VStack spacing={2} align="stretch">
          <NavItem 
            icon={FiHome} 
            label="Brand Central" 
            to="/brand" 
            isActive={isActive('/brand')}
          />
          
          <NavItem 
            icon={FiBarChart} 
            label="Analytics" 
            to="/brand/analytics" 
            isActive={isActive('/brand/analytics')}
          />
          
          <Divider my={4} borderColor="whiteAlpha.200" />
          
          <Text 
            fontSize="xs" 
            fontWeight="bold" 
            color="#68D391" // Light green to match your brand
            mb={3} 
            textTransform="uppercase"
            px={2}
          >
            Product Management
          </Text>
          
          <NavItem 
            icon={FiPackage} 
            label="Products" 
            to="/brand/products" 
            isActive={isActive('/brand/products')}
          />
          
          <NavItem 
            icon={FiPlusCircle} 
            label="Add Product" 
            to="/brand/add-product" 
            isActive={isActive('/brand/add-product')}
          />
          
          <NavItem 
            icon={FiEdit} 
            label="Edit Product" 
            to="/brand/edit-profile" 
            isActive={isActive('/brand/edit-product')}
          />
        </VStack>
      </Box>

      {/* Logout Button fixed at bottom */}
      <Box position="absolute" bottom={6} width="100%" px={4}>
        <Tooltip label="Logout" placement="right">
          <Button
            width="100%"
            variant="outline"
            colorScheme="red"
            size="md"
            height="50px"
            borderRadius="md"
            onClick={handleLogout}
            leftIcon={<Icon as={FiLogOut} boxSize={5} />}
            justifyContent="flex-start"
            fontWeight="medium"
            borderColor="red.500"
            _hover={{
              bg: "rgba(229, 62, 62, 0.2)" // Subtle hover for red button
            }}
          >
            Logout
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
};

// Navigation Item Component
interface NavItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, to, isActive }) => {
  return (
    <Link to={to} style={{ textDecoration: 'none' }}>
      <Flex
        align="center"
        p={3}
        borderRadius="md"
        cursor="pointer"
        transition="all 0.2s"
        bg={isActive ? 'rgba(104, 211, 145, 0.15)' : 'transparent'} // Semi-transparent green for active state
        color={isActive ? '#68D391' : 'whiteAlpha.900'}
        _hover={{
          bg: isActive ? 'rgba(104, 211, 145, 0.15)' : 'whiteAlpha.100',
          color: isActive ? '#68D391' : 'white'
        }}
      >
        <Icon as={icon} boxSize={5} mr={3} />
        <Text fontWeight={isActive ? 'medium' : 'normal'}>
          {label}
        </Text>
      </Flex>
    </Link>
  );
};

export default BrandSidebar;