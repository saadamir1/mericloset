import { SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useProducts from "../hooks/useProducts";
import Product from "../entities/Product";
import ProductCard from "./ProductCard";
import ProductCardContainer from "./ProductCardContainer";
import ProductCardSkeleton from "./ProductCardSkeleton";

const ProductGrid = () => {
  const { data, error, isLoading, fetchNextPage, hasNextPage } = useProducts();
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  if (error) return <Text>{error.message}</Text>;

  const fetchedProductsCount =
    data?.pages?.reduce((total, page) => total + page.results.length, 0) || 0;

  return (
    <>
      {isLoading && (
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} spacing={5} padding="10px">
          {skeletons.map((skeleton) => (
            <ProductCardContainer key={skeleton}>
              <ProductCardSkeleton />
            </ProductCardContainer>
          ))}
        </SimpleGrid>
      )}

      {data && data.pages && (
        <InfiniteScroll
          dataLength={fetchedProductsCount}
          hasMore={!!hasNextPage}
          next={() => fetchNextPage()}
          loader={<Spinner />}
        >
          <SimpleGrid
            columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
            spacing={5}
            padding="20px"
          >
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
        </InfiniteScroll>
      )}
    </>
  );
};

export default ProductGrid;