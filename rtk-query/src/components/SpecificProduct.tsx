import { useGetProductByIdQuery } from "../app/service/dummyData"

const SpecificProduct = () => {
  const {data, isError, isLoading} = useGetProductByIdQuery(1);
  console.log(data)
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  return (
    <div>
      <h1>{data?.title}</h1>
      <p>{data?.description}</p>
    </div>
  )
}

export default SpecificProduct