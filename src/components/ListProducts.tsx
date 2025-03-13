import React, { memo } from 'react'
import { Link } from 'react-router-dom'

const ListProducts = ({products , onHover} : {products: any[]}) => {

  console.log("Rendered ListProducts", products)

  return (
    <>
        {products?.map(product => (
            <li key={product.id} onMouseOver={ () => {if(onHover) onHover(product.id)}}>
                <Link to={`/id/${product.id}`}>{product.title}</Link>
            </li>
        ))}
    </>
  )
}

export default memo(ListProducts)