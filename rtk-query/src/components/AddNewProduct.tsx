import { useAddNewProductMutation } from "../app/service/dummyData"

const AddNewProduct = () => {
    const [addNewProduct, {isLoading, isError, data}] = useAddNewProductMutation();

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error</div>

    const handleAddProduct = async () => {
        try {
            await addNewProduct({title: "New Product", description: "New Description"})
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
        <button onClick={handleAddProduct} disabled={isLoading}>AddNewProduct</button>
    </div>
  )
}

export default AddNewProduct