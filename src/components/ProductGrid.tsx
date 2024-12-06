import React from "react";
import { Button, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import useProducts from "../hooks/useProducts";
import Product from "../entities/Product";
import ProductCard from "./ProductCard";
import ProductCardContainer from "./ProductCardContainer";
import ProductCardSkeleton from "./ProductCardSkeleton";

const ProductGrid = () => {
  const { data, error, isLoading, fetchNextPage, hasNextPage, isFetching } = useProducts();
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  // Handle errors
  if (error) return <Text>{error.message}</Text>;

  // Calculate the total count of fetched products
  const fetchedProductsCount =
    data?.pages?.reduce((total, page) => total + page.results.length, 0) || 0;

  return (
    <>
      {/* Show skeleton loading state while fetching */}
      {isLoading && (
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} spacing={5} padding="10px">
          {skeletons.map((skeleton) => (
            <ProductCardContainer key={skeleton}>
              <ProductCardSkeleton />
            </ProductCardContainer>
          ))}
        </SimpleGrid>
      )}

      {/* Display product grid once data is loaded */}
      {data && data.pages && (
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} spacing={5} padding="20px">
          {/* Loop through each page of products */}
          {data.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.results.map((product: Product) => (
                <ProductCardContainer key={product.id}>
                  <ProductCard product={product} />
                </ProductCardContainer>
              ))}
            </React.Fragment>
          ))}
        </SimpleGrid>
      )}

      {/* Show total count of products */}
      {fetchedProductsCount && <Text>Total Products: {fetchedProductsCount}</Text>}

      {/* Display "Load More" button to load next page */}
      {hasNextPage && (
        <Button onClick={() => fetchNextPage()} isLoading={isFetching} width="full" mt={4}>
          {isFetching ? "Loading..." : "Load More"}
        </Button>
      )}
    </>
  );
};

export default ProductGrid;
