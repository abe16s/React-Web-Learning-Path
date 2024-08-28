import { FaClipboardList, FaPen } from "react-icons/fa"
import TodoList from "./components/TodoList"
import './CSS/App.css'

function App() {

  return (
    <div className="Ap">
        <div className="header">
          <div className="logoside">
            <FaPen/>
            <h1>What To Do</h1>
            <FaClipboardList/>
          </div>
        </div>
        <TodoList/>
    </div>
  )
}

export default App
