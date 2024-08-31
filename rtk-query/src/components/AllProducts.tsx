import { useGetAllProductsQuery } from "../app/service/dummyData"

const AllProducts = () => {
  const {data, isError, isLoading} = useGetAllProductsQuery({})

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error</div>
  return (
    <div>
        {data?.products.map((product: {
            id: number;
            title: string;
        }) => (
            <div key={product.id}>
                <h1>{product.title}</h1>
            </div>
        ))}
    </div>
  )
}

export default AllProducts