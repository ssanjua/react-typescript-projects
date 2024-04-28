import { AiOutlineCloseCircle } from "react-icons/ai";
import '../../styles/todoApp/Task.css';

interface TaskProps {
  id: number; // o string si tus IDs son cadenas de texto
  text: string;
  isCompleted: boolean;
  completeTask: (id: number) => void; // Ajusta el tipo de 'id' según corresponda
  deleteTask: (id: number) => void; // Ajusta el tipo de 'id' según corresponda
}

function Task({ id, text, isCompleted, completeTask, deleteTask }: TaskProps) {
  return (
    <div className={isCompleted ? 'task-container completed' : 'task-container'}>
      <div
        onClick={() => completeTask(id)}
        className='task-text'>
        {text}
      </div>
      <div 
        onClick={() => deleteTask(id)}
        className='task-icon-container'>
        <AiOutlineCloseCircle className='task-icon' />
      </div>
    </div>
  )
}

export default Task;