import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../app/features/counter/counterSlice";
import { RootState } from "../app/store";

const Counter = () => {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()
  return (
    <>
      <h1>{count}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </>
  )
}

export default Counter