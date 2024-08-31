import { useUpdateProductMutation } from "../app/service/dummyData"

const UpdateProduct = ({productId}: {productId: number}) => {
    const [updateProduct, {isLoading, isError, data}] = useUpdateProductMutation();

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error</div>

    const handleUpdateProduct = async () => {
        try {
            await updateProduct({id: productId, updateProduct: {title: "Updated Product"}})
        }
        catch (error) {
            console.error(error)
        }
    }
  return (
    <div>
        <h1>{data?.id}</h1>
        <p>{data?.title}</p>
        <p>{data?.description}</p>

        <button onClick={handleUpdateProduct} disabled={isLoading}>Update Product</button>
    </div>
  )
}

export default UpdateProduct