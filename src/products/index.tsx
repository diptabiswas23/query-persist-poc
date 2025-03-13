import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllProducts } from "./queries";
import ListProducts from "../components/ListProducts";
import PRODUCT_API from "../api/products";
import ProductById from "./productById";

const Products = () => {
  const queryClient = useQueryClient();
  const query = useQuery(getAllProducts());
  // const isRestoring = useIsRestoring()

  // const prefetch = (id : number) => {
  //   return queryClient.prefetchQuery({
  //     queryKey: ["products", id],
  //     queryFn: ({signal}) => PRODUCT_API.getById(id, signal),
  //   })
  // }

  const { mutate } = useMutation({
    mutationFn: (id: number) => PRODUCT_API.getById(id),
    onSuccess: (data) => {
      console.log("data", data);
      queryClient.setQueriesData(
        {
          queryKey: getAllProducts().queryKey,
        },
        (cacheData: any) => {
          if (cacheData) return [...cacheData, data];

          return cacheData;
        }
      );
    },
    mutationKey: ["addProducts"],
  });

  // const mutationState = useMutationState({
  //   filters: {mutationKey : ['addProducts'], }
  // })

  // console.log("query", query);
  // console.log("queryFn", {
  //   loading: query.isLoading,
  //   // error: query.error,
  //   data: query.data,
  //   isFetching: query.isFetching,
  //   // isStale: query.isStale,
  //   isError: query.isError,
  //   // isSuccess: query.isSuccess,
  //   isLoadingError: query.isLoadingError,
  //   isPaused: query.isPaused,
  //   isPending: query.isPending,
  //   isPlaceholderData: query.isPlaceholderData,
  //   isRefetching: query.isRefetching,
  //   fetchStatus: query.fetchStatus,
  //   status: query.status,
  // });

  // console.log("isRestoring", isRestoring)

  const handleInvalidate = () => {
    queryClient
      .invalidateQueries({
        queryKey: ["products"],
        exact: true,
      })
      .then(() => {
        console.log("Invalidate Query");
      });
  };

  // console.log("mutationState", mutationState)

  if (query.isPending) return <>Pending...</>;
  if (query.isLoading) return <>Loading...</>;
  // if(query.isFetching) return <>Fetching...</>

  

  return (
    <div style={{ display: "flex" }}>
      Products
      <div>
        <button onClick={handleInvalidate}>Invalidate Query</button>
        <ul>
          <ListProducts products={query?.data} />
        </ul>
        <button onClick={() => mutate(query?.data.length + 1)}>Add Products</button>
      </div>
      <div>
        <ProductById />
      </div>
    </div>
  );
};

export default Products;
