import React from 'react';
import { Box, VStack, Button, Image, Divider, Text, Flex, Icon } from '@chakra-ui/react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiHome, FiUser, FiLogOut, FiSettings } from 'react-icons/fi';
import logo from './../../assets/logo.webp';
import useUserStore from '../../userStore';

const AdminSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useUserStore((state) => state.logout);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  // Check if the current path matches the link path
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <Box
      width="240px"
      bg="#0A2533"
      height="100vh"
      position="fixed"
      left={0}
      top={0}
      boxShadow="0 0 10px rgba(0, 0, 0, 0.2)"
      color="white"
    >
      {/* Logo and header section */}
      <Flex align="center" justify="center" py={6} borderBottom="1px solid rgba(255, 255, 255, 0.1)">
        <Image src={logo} alt="Logo" maxHeight="40px" />
      </Flex>
      
      {/* Navigation section */}
      <VStack spacing={0} align="stretch" mt={6}>
        <Text px={6} mb={2} color="gray.400" fontSize="xs" fontWeight="bold" textTransform="uppercase">
          Dashboard
        </Text>
        
        <NavItem 
          icon={FiHome} 
          label="Admin Central" 
          to="/admin" 
          isActive={isActive('/admin')}
        />
        
        <Divider my={4} borderColor="rgba(255, 255, 255, 0.1)" />
        
        <Text px={6} mb={2} color="gray.400" fontSize="xs" fontWeight="bold" textTransform="uppercase">
          Account
        </Text>
        
        <NavItem 
          icon={FiUser} 
          label="Edit Profile" 
          to="/admin/edit-profile" 
          isActive={isActive('/admin/profile')}
        />
        
        <NavItem 
          icon={FiSettings} 
          label="Settings" 
          to="/admin" 
          isActive={isActive('/admin/settings')}
        />
      </VStack>
      
      {/* Logout section at bottom */}
      <Box position="absolute" bottom={6} width="100%" px={4}>
        <Button
          width="100%"
          py={6}
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          variant="outline"
          colorScheme="red"
          borderRadius="md"
          onClick={handleLogout}
          leftIcon={<Icon as={FiLogOut} mr={2} />}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

// Helper component for navigation items
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
        px={6}
        py={3}
        cursor="pointer"
        bg={isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent'}
        _hover={{ bg: 'rgba(255, 255, 255, 0.07)' }}
        transition="all 0.2s"
        borderLeft={isActive ? '3px solid #38B2AC' : '3px solid transparent'}
      >
        <Icon as={icon} mr={3} color={isActive ? '#38B2AC' : 'gray.300'} />
        <Text fontWeight={isActive ? 'medium' : 'normal'} color={isActive ? 'white' : 'gray.300'}>
          {label}
        </Text>
      </Flex>
    </Link>
  );
};

export default AdminSidebar;