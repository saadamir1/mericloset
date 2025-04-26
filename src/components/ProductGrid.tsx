import { useState } from "react";
import { 
  Button, 
  SimpleGrid, 
  Text, 
  Flex, 
  Box, 
  HStack,
  IconButton,
  Center,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon, ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import useProducts from "../hooks/useProducts";
import Product from "../entities/Product";
import ProductCard from "./ProductCard";
import ProductCardContainer from "./ProductCardContainer";
import ProductCardSkeleton from "./ProductCardSkeleton";

const ProductGrid = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  
  // Using the existing useProducts hook which returns an infinite query result
  const { 
    data, 
    error, 
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching 
  } = useProducts();

  const skeletons = Array(itemsPerPage).fill(0).map((_, i) => i + 1);
  
  // Calculate derived values from the infinite query data
  const allProducts: Product[] = data?.pages.flatMap(page => page.results) || [];
  const totalProducts = allProducts.length;
  
  // Calculate total pages based on product count and items per page
  // If we have hasNextPage, add one more page to account for additional items
  const calculatedTotalPages = Math.ceil(totalProducts / itemsPerPage) + (hasNextPage ? 1 : 0);
  const totalPages = Math.max(1, calculatedTotalPages); // Ensure at least 1 page
  
  // Get products for current page
  const paginatedProducts = allProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // Handle errors
  if (error) return (
    <Center p={10}>
      <Text color="red.500" fontSize="lg">Error loading products: {error.message}</Text>
    </Center>
  );
  
  // Handle page changes
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      
      // If we're moving to a page that might need more data to be fetched
      const productsNeeded = page * itemsPerPage;
      if (productsNeeded > allProducts.length && hasNextPage) {
        fetchNextPage();
      }
      
      // Scroll to top of product list
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages are less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Show first page, current page and surrounding pages, and last page
      if (currentPage <= 3) {
        // Near the beginning
        for (let i = 1; i <= 5; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // In the middle
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };
  
  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newItemsPerPage = parseInt(e.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };
  
  const startItem = Math.min((currentPage - 1) * itemsPerPage + 1, totalProducts);
  const endItem = Math.min(currentPage * itemsPerPage, totalProducts);
  
  // Loading states
  const isInitialLoading = isLoading;
  const isPageLoading = isFetching && !isInitialLoading;
  
  return (
    <Box>
      {/* Header with filters and product count */}
{/* Header with filters and product count */}
<Flex 
  justify="space-between" 
  align="center" 
  px={6} 
  py={3} 
  bg="gray.100" 
  _dark={{ bg: "gray.700" }}
  borderRadius="md"
  mb={4}
>
  <Text fontWeight="medium" _dark={{ color: "white" }}>
    {totalProducts > 0 ? (
      <>Showing {startItem}-{endItem} of {totalProducts} products</>
    ) : (
      isInitialLoading ? 'Loading products...' : 'No products found'
    )}
  </Text>
  <Flex align="center" gap={2}>
    <Text fontSize="sm" _dark={{ color: "gray.200" }}>Items per page:</Text>
    <Select 
  size="sm" 
  width="80px" 
  value={itemsPerPage}
  onChange={handleItemsPerPageChange}
  _dark={{ 
    bg: "gray.600",
    color: "white",
    borderColor: "gray.500"
  }}
  sx={{
    "& option": {
      bg: "white",
      color: "black",
      _dark: {
        bg: "gray.700",
        color: "white"
      }
    }
  }}
>
  <option value={12}>12</option>
  <option value={24}>24</option>
  <option value={36}>36</option>
  <option value={48}>48</option>
</Select>
  </Flex>
</Flex>
      
      {/* Show skeleton loading state while initial loading */}
      {isInitialLoading ? (
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} spacing={5} padding="10px">
          {skeletons.map((skeleton) => (
            <ProductCardContainer key={skeleton}>
              <ProductCardSkeleton />
            </ProductCardContainer>
          ))}
        </SimpleGrid>
      ) : (
        <>
          {/* Display product grid once data is loaded */}
          <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} spacing={5} padding="10px">
            {paginatedProducts.map((product: Product) => (
              <ProductCardContainer key={product.id}>
                <ProductCard product={product} />
              </ProductCardContainer>
            ))}
            
            {/* Show skeletons for additional items being loaded */}
            {isPageLoading && (
              Array(itemsPerPage - paginatedProducts.length).fill(0).map((_, index) => (
                <ProductCardContainer key={`loading-${index}`}>
                  <ProductCardSkeleton />
                </ProductCardContainer>
              ))
            )}
          </SimpleGrid>
          
          {/* No results message */}
          {paginatedProducts.length === 0 && !isPageLoading && (
            <Center py={10}>
              <Text fontSize="lg" color="gray.500">No products found</Text>
            </Center>
          )}
          
          {/* Pagination controls */}
          {(totalPages > 1 || totalProducts > 0) && (
            <Flex 
              justifyContent="space-between" 
              alignItems="center" 
              mt={8} 
              mb={4} 
              px={4}
            >
              {/* Items per page and page info on desktop */}
              <Box display={{ base: 'none', md: 'block' }}>
                <Text fontSize="sm" color="gray.600">
                  Page {currentPage} of {totalPages}
                </Text>
              </Box>
              
              {/* Pagination controls */}
              <Flex justifyContent="center" flex={1}>
                <HStack spacing={2}>
                  {/* First page button */}
                  <IconButton
                    aria-label="First page"
                    icon={<ArrowLeftIcon />}
                    size="sm"
                    onClick={() => goToPage(1)}
                    isDisabled={currentPage === 1 || isPageLoading}
                  />
                  
                  {/* Previous page button */}
                  <IconButton
                    aria-label="Previous page"
                    icon={<ChevronLeftIcon />}
                    size="sm"
                    onClick={() => goToPage(currentPage - 1)}
                    isDisabled={currentPage === 1 || isPageLoading}
                  />
                  
                  {/* Page numbers */}
                  <HStack spacing={1} display={{ base: 'none', sm: 'flex' }}>
                    {getPageNumbers().map((page, index) => (
                      page === '...' ? (
                        <Text key={`ellipsis-${index}`} px={2}>...</Text>
                      ) : (
                        <Button
                          key={`page-${page}`}
                          size="sm"
                          variant={currentPage === page ? "solid" : "outline"}
                          colorScheme={currentPage === page ? "blue" : "gray"}
                          onClick={() => goToPage(page as number)}
                          isDisabled={isPageLoading}
                        >
                          {page}
                        </Button>
                      )
                    ))}
                  </HStack>
                  
                  {/* Page number input for mobile */}
                  <Box display={{ base: 'block', sm: 'none' }} w="70px">
                    <NumberInput
                      size="sm"
                      min={1}
                      max={totalPages}
                      value={currentPage}
                      onChange={(_, value) => value && goToPage(value)}
                      isDisabled={isPageLoading}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Box>
                  
                  {/* Next page button */}
                  <IconButton
                    aria-label="Next page"
                    icon={<ChevronRightIcon />}
                    size="sm"
                    onClick={() => goToPage(currentPage + 1)}
                    isDisabled={currentPage === totalPages || isPageLoading}
                    isLoading={isFetchingNextPage && currentPage === totalPages - 1}
                  />
                  
                  {/* Last page button */}
                  <IconButton
                    aria-label="Last page"
                    icon={<ArrowRightIcon />}
                    size="sm"
                    onClick={() => goToPage(totalPages)}
                    isDisabled={currentPage === totalPages || isPageLoading}
                  />
                </HStack>
              </Flex>
              
              {/* Jump to page - desktop only */}
              <Box display={{ base: 'none', md: 'block' }}>
                <Flex align="center" gap={2}>
                  <Text fontSize="sm">Jump to:</Text>
                  <NumberInput
                    size="sm"
                    min={1}
                    max={totalPages}
                    value={currentPage}
                    onChange={(_, value) => value && goToPage(value)}
                    w="70px"
                    isDisabled={isPageLoading}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Flex>
              </Box>
            </Flex>
          )}
        </>
      )}
    </Box>
  );
};

export default ProductGrid;