import { useIsFetching, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductById } from "./queries";
import { useParams } from "react-router-dom";

const Product = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const query = useQuery(getProductById(Number(id), queryClient));

  const isFetching = useIsFetching();

  console.log("One Product", query.data);

  if (isFetching) return <>Is fetching....</>;

  return (
    <div>
      <h6>Product Title</h6>
      <p>{query.data?.title}</p>
      <span>{query.data?.description}</span>
    </div>
  );
};

export default Product;
