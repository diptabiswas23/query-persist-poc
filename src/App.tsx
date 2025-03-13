import { Route, Router, Routes } from "react-router-dom"
import Products from "./products"
import InfiniteQuery from "./products/infiniteQuery"
import PaginatedProducts from "./products/paginated"
import Product from "./products/product"
import { Suspense } from "react"

function App() {

  return (
    // <Suspense fallback={<div>Loading...</div>}>
    <Routes>
     
       <Route path="/" element={<Products/>}/>
       <Route path="/infinite" element={<InfiniteQuery/>}/>
       <Route path="/id/:id" element={<Product/>}/>
       <Route path="/paginated" element={<PaginatedProducts/>}/>
    </Routes>
    // </Suspense>
  )
}

export default App
