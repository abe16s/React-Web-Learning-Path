import { useDeleteProductMutation } from "../app/service/dummyData"

const DeleteProduct = ({productId}: {productId: number}) => {
  const [deleteProduct, {isLoading, isError, data}] = useDeleteProductMutation();

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error</div>

    const handleDeleteProduct = async () => {
        try {
            await deleteProduct(productId)
        }
        catch (error) {
            console.error(error)
        }
    }

    return (
    <div>
        <h1>{data?.title ? `${data.title} successfully deleted`: ""}</h1>
        <button onClick={handleDeleteProduct}>Delete Product</button>
    </div>
  )
}

export default DeleteProduct