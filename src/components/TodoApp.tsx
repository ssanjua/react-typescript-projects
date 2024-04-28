import '../styles/TodoApp.css';
import TaskList from './todoapp/TaskList';
import { FaTasks } from "react-icons/fa";


const TodoApp = () => {
  return (
    <div className="todo-app">
      <div className="title">
        <h2>no one knows what to do, but write it down helps</h2>
      </div>
      <div className='todo-app-tasks'>
        <div className='display-text'>
          <h1 className='display'>
            <FaTasks style={{ marginRight: "8px", height:"1.2rem"}}/>
            My tasks
          </h1>
        </div>
        <TaskList />
      </div>
    </div>
  );
}


export default TodoApp;