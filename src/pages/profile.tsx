import React, { useState, ChangeEvent, useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Divider,
  Stack,
  Container,
  VStack,
  HStack,
  Flex,
  Avatar,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Tag,
  useColorModeValue,
  Icon,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import userStore from '../userStore';
import axios from 'axios';
import { FiUser, FiMail, FiEdit2, FiSave, FiX, FiUserCheck } from 'react-icons/fi';
const baseURL = import.meta.env.VITE_API_BASE_URL;

interface UserProfileData {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
}

const ProfilePage: React.FC = () => {
  const { user, setUser, token } = userStore();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<UserProfileData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  const toast = useToast();
  const navigate = useNavigate();
  
  // Theme colors
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const headerBg = useColorModeValue('blue.50', 'blue.900');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedTextColor = useColorModeValue('gray.600', 'gray.400');
  const labelColor = useColorModeValue('gray.700', 'gray.300');
  const avatarBg = useColorModeValue('blue.500', 'blue.200');

  useEffect(() => {
    if (!token) {
      toast({
        title: "Authentication Required",
        description: "Please log in to access your profile.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      navigate('/login');
      return;
    }
    
    setFormData(user as UserProfileData);
  }, [token, navigate, toast, user]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => prevData ? { ...prevData, [name]: value } : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData || !user?.id) return;
    
    setIsSubmitting(true);
    
    try {
      const { data } = await axios.put(
        `${baseURL}/users/${user.id}`,
        { 
          userId: user.id, 
          role: "user", 
          profileData: formData 
        },
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          } 
        }
      );

      setUser(data.user);
      setIsEditing(false);
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.response?.data?.message || "Unable to update profile. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData(user as UserProfileData);
    setIsEditing(false);
  };

  if (!user || !formData) {
    return (
      <Container maxW="container.lg" py={16} centerContent>
        <Box textAlign="center">
          <Text fontSize="lg" color={mutedTextColor}>Loading profile information...</Text>
        </Box>
      </Container>
    );
  }

  // Get initials for avatar
  const getInitials = () => {
    return `${(user.firstName ?? '').charAt(0)}${(user.lastName ?? '').charAt(0)}`.toUpperCase();
  };

  // Get full name
  const fullName = `${user.firstName || 'New'} ${user.lastName || 'User'}`;


  return (
    <Container maxW="container.lg" py={10}>
      <Heading as="h1" size="xl" mb={8} textAlign="center" color={textColor}>
        Account Profile
      </Heading>
      
      <Card 
        borderWidth={1}
        borderColor={borderColor}
        borderRadius="xl"
        overflow="hidden"
        boxShadow="lg"
        bg={cardBg}
      >
        <CardHeader bg={headerBg} py={6}>
          <Flex 
            direction={{ base: 'column', md: 'row' }} 
            align={{ base: 'center', md: 'flex-start' }}
            justify="space-between"
          >
            <HStack spacing={6} mb={{ base: 4, md: 0 }}>
              <Avatar 
                size="xl" 
                name={getInitials()} 
                bg={avatarBg} 
                color="white"
                boxShadow="md"
              />
              <VStack align="flex-start" spacing={1}>
                <Heading size="lg" color={textColor}>{fullName}</Heading>
                <Text color={mutedTextColor}>@{user.username}</Text>
                <HStack mt={2}>
                  <Tag size="sm" colorScheme="blue" borderRadius="full">Member</Tag>
                </HStack>
              </VStack>
            </HStack>
            
            {!isEditing && (
              <Button
                leftIcon={<Icon as={FiEdit2} />}
                colorScheme="blue"
                variant="solid"
                onClick={() => setIsEditing(true)}
                alignSelf={{ base: 'stretch', md: 'flex-start' }}
                size="md"
              >
                Edit Profile
              </Button>
            )}
          </Flex>
        </CardHeader>

        <CardBody p={8}>
          {!isEditing ? (
            <VStack align="stretch" spacing={6} divider={<Divider borderColor={borderColor} />}>
              <Box>
                <Text fontWeight="semibold" fontSize="sm" color={mutedTextColor} mb={1}>
                  ACCOUNT INFORMATION
                </Text>
                <Divider borderColor={borderColor} mb={4} />
                
                <Grid columns={2} spacing={6}>
                  <GridItem label="First Name" value={user.firstName || ''} icon={FiUser} />
                  <GridItem label="Last Name" value={user.lastName || ''} icon={FiUser} />
                  <GridItem label="Username" value={user.username || ''} icon={FiUserCheck} />
                  <GridItem label="Email Address" value={user.email || ''} icon={FiMail} />
                </Grid>
              </Box>
            </VStack>
          ) : (
            <form onSubmit={handleSubmit}>
              <VStack spacing={6} align="stretch">
                <Text fontWeight="semibold" fontSize="sm" color={mutedTextColor} mb={1}>
                  EDIT PROFILE
                </Text>
                <Divider borderColor={borderColor} mb={2} />
                
                <Stack direction={{ base: "column", md: "row" }} spacing={6}>
                  <FormControl isRequired>
                    <FormLabel htmlFor="firstName" color={labelColor}>First Name</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <Icon as={FiUser} color={mutedTextColor} />
                      </InputLeftElement>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        pl={10}
                        focusBorderColor="blue.400"
                      />
                    </InputGroup>
                  </FormControl>
                  
                  <FormControl isRequired>
                    <FormLabel htmlFor="lastName" color={labelColor}>Last Name</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <Icon as={FiUser} color={mutedTextColor} />
                      </InputLeftElement>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        pl={10}
                        focusBorderColor="blue.400"
                      />
                    </InputGroup>
                  </FormControl>
                </Stack>
                
                <FormControl isRequired>
                  <FormLabel htmlFor="username" color={labelColor}>Username</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FiUserCheck} color={mutedTextColor} />
                    </InputLeftElement>
                    <Input
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      pl={10}
                      focusBorderColor="blue.400"
                    />
                  </InputGroup>
                </FormControl>
                
                <FormControl isRequired>
                  <FormLabel htmlFor="email" color={labelColor}>Email Address</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FiMail} color={mutedTextColor} />
                    </InputLeftElement>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      pl={10}
                      focusBorderColor="blue.400"
                    />
                  </InputGroup>
                </FormControl>
              </VStack>
            </form>
          )}
        </CardBody>
        
        {isEditing && (
          <CardFooter bg={useColorModeValue('gray.50', 'gray.700')} borderTop="1px" borderColor={borderColor} p={6}>
            <Stack 
              direction={{ base: "column", sm: "row" }} 
              spacing={4} 
              width="full" 
              justify="flex-end"
            >
              <Button
                leftIcon={<Icon as={FiX} />}
                onClick={resetForm}
                colorScheme="gray"
                variant="outline"
                isDisabled={isSubmitting}
                flex={{ base: "1", sm: "initial" }}
              >
                Cancel
              </Button>
              <Button
                leftIcon={<Icon as={FiSave} />}
                onClick={handleSubmit}
                colorScheme="blue"
                isLoading={isSubmitting}
                loadingText="Saving"
                flex={{ base: "1", sm: "initial" }}
              >
                Save Changes
              </Button>
            </Stack>
          </CardFooter>
        )}
      </Card>
    </Container>
  );
};

// Helper component for profile information display
interface GridItemProps {
  label: string;
  value: string;
  icon: React.ElementType;
}

const GridItem: React.FC<GridItemProps> = ({ label, value, icon }) => {
  const labelColor = useColorModeValue('gray.600', 'gray.400');
  const valueColor = useColorModeValue('gray.800', 'white');
  
  return (
    <Box mb={4}>
      <HStack spacing={2} mb={1}>
        <Icon as={icon} color="blue.500" />
        <Text fontSize="sm" fontWeight="medium" color={labelColor}>
          {label}
        </Text>
      </HStack>
      <Text fontSize="md" color={valueColor} fontWeight="medium" ml={6}>
        {value}
      </Text>
    </Box>
  );
};

// Helper layout component to replace the original Grid
const Grid: React.FC<{ children: React.ReactNode; columns: number; spacing: number }> = ({ 
  children, 
  columns,
  spacing 
}) => {
  return (
    <Box>
      <Flex 
        flexWrap="wrap" 
        mx={-spacing/2}
      >
        {React.Children.map(children, child => (
          <Box 
            width={{ base: "100%", md: `${100/columns}%` }} 
            px={spacing/2}
          >
            {child}
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default ProfilePage;