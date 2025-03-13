export default {
    all: () => fetch("https://dummyjson.com/products").then(async res => await res.json()).then(data => data.products),
    getById: (id:number, signal?: any) => fetch(`https://dummyjson.com/products/${id}` , {signal}).then(async res => await res.json()),
    getByPagination: async (page:number) => {
        const LIMIT = 10
        const skip = (page - 1) * LIMIT
        return fetch(`https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`).then(async res => await res.json())
    },
}