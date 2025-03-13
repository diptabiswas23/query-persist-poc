import { useQuery } from "@tanstack/react-query"
import { getProductWithPagination } from "./queries"
import { useState } from "react"
import ListProducts from "../components/ListProducts"

const PaginatedProducts = () => {
    const [page , setPage] = useState<number>(1)
    const query = useQuery(getProductWithPagination(page))
    const {isLoading , isError , isFetching , isPending} = query


    const nextPage = () => {
        if(isLoading || isFetching) return;
        setPage(prev => prev + 1)
    }

    const prevPage = () => {
        if(isLoading || isFetching) return;
        setPage(prev => prev - 1)
    }

    console.log("query", query)

    if(isError) return <div>Error fetching products</div>

    if(isPending) return <div>Is Pending...</div>

  return (
    <div>
        <h6>List of Products</h6>
        <button onClick={prevPage} disabled={page === 1}>Previous</button>
        <button onClick={nextPage} disabled={((query?.data?.skip + query?.data?.limit) >= query?.data?.total) || isLoading}>Next</button>

        {isLoading ? <p>Loading...</p> : null}
      
        {!isLoading ? <ul>
          <ListProducts products={query?.data?.products}/>
        </ul> : null}

        {isFetching ? <span>Fetching...</span> : null}
        
    </div>
  )
}

export default PaginatedProducts