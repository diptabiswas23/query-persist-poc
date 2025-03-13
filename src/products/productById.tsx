import { useQueryClient } from '@tanstack/react-query'
import { getAllProducts } from './queries';

const ProductById = () => {

    const queryClient = useQueryClient();

    const query: any = queryClient.getQueryData(getAllProducts().queryKey)


    console.log('ProductById -- Rendered', query.length, query)


  return (
    <div style={{marginLeft : '20px' , padding : "10px" , border: "1px solid red"}}>
        <p>Product By Id</p>
        <h6>Product Title</h6>
      <p>{query?.[31]?.title}</p>
      <span>{query?.[31]?.description}</span>
    </div>
  )
}

export default ProductById;