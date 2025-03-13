import {useInfiniteQuery } from "@tanstack/react-query"
import { getProductInfilite } from "./queries"

const InfiniteQuery = () => {
    const query = useInfiniteQuery(getProductInfilite())

    const {isLoading , isError , isFetching} = query

    const nextPage = () => {
        if(isLoading || isFetching) return;
        query.fetchNextPage()
    }

    // console.log("query", query)

    if(isError) return <div>Error fetching products</div>

  return (
    <div>
        <h6>List of Products (InfiniteQuery)</h6>
        

         {isLoading ? <p>Loading...</p> : null}
      
        {!isLoading ? <ul>
             {query?.data?.pages?.map(group => (
                group?.products?.map(product => {
                    return <li key={product.id}>{product.title}</li>
                })
        ))}
        </ul> : null}

        <button onClick={nextPage} disabled={!query.hasNextPage || isLoading}>Next</button>

        {isFetching ? <span>Fetching...</span> : null}
        
    </div>
  )
}

export default InfiniteQuery