import { keepPreviousData, QueryClient } from "@tanstack/react-query";
import PRODUCT_API from "../api/products";

export const getAllProducts = () => ({
  queryKey: ["products"],
  queryFn: PRODUCT_API.all,
  // staleTime: 1000 * 10,
  // gcTime: 1000 * 5,
  refetchOnWindowFocus: false,
});

export const getProductById = (id: number , client?: QueryClient) => {
  return {
    queryKey: [...getAllProducts().queryKey, id],
    queryFn: () => PRODUCT_API.getById(id),
    refetchOnWindowFocus: false,
    // initialData: () => {
    //   return client.getQueryData(getAllProducts().queryKey)?.[0];
    // },
    // staleTime: 1000 * 20,
    // initialDataUpdatedAt: 1000 * 20
  }
};

export const getProductWithPagination = (page: number) => ({
  ...getAllProducts(),
  queryKey: [...getAllProducts().queryKey, page],
  queryFn: () => PRODUCT_API.getByPagination(page),
  gcTime: 1000 * 60 * 5, // 5 minutes
  placeholderData: keepPreviousData,
});

export const getProductInfilite = () => ({
  ...getAllProducts(),
  queryFn: ({ pageParam }: { pageParam: number }) => {
    return getProductWithPagination(pageParam).queryFn();
  },
  placeholderData: undefined,
  initialPageParam: 1,
  getNextPageParam: (
    lastPage: Record<string, any>,
    _allPages: any,
    lastPageParams: number
  ) => {
    console.log("lastPage", lastPage);
    const hasNext = lastPage.limit + lastPage.skip < lastPage.total;

    if (hasNext) return lastPageParams + 1;

    return null;
  },
});
