import { useQueryClient } from '@tanstack/react-query'
import { getAllProducts } from './queries';
import { memo } from 'react';

const ProductById = () => {

    const queryClient = useQueryClient();

    const query: any = queryClient.getQueryData(getAllProducts().queryKey)


    console.log('ProductById -- Rendered', query.length)


  return (
    <div style={{marginLeft : '20px' , padding : "10px" , border: "1px solid red"}}>
        <p>Product By Id</p>
        <h6>Product Title</h6>
      <p>{query?.[query.length - 1]?.title}</p>
      <span>{query?.[query.length - 1]?.description}</span>
    </div>
  )
}

export default memo(ProductById);