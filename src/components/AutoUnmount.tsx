import React, { useEffect, useState } from 'react'
import Products from '../products';

const AutoUnmount = () => {

    const [isUnmounted, setUnmounted] = useState(false);

    useEffect(() => {
        const time = setTimeout(() => {
            setUnmounted(true)
        } , 1000 * 20)

        return () => {
            clearTimeout(time)
        }
    } , [])

  return (
    <div>
        <h3>Auto Unmount</h3>
        {isUnmounted ? null : <Products/>}
    </div>
  )
}

export default AutoUnmount