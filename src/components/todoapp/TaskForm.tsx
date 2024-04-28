import { useState } from "react";
import "../../styles/todoApp/TaskForm.css";
import { v4 as uuidv4 } from "uuid";
import { IoMdAddCircleOutline } from "react-icons/io";

interface NewTask {
  id: string;
  text: string;
  completed: boolean;
}

// Definir una interfaz para las props
interface TaskFormProps {
  onSubmit: (task: NewTask) => void;
}

// Usar la interfaz TaskFormProps para tipar las props del componente
function TaskForm({ onSubmit }: TaskFormProps) {
  const [input, setInput] = useState('');

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newTask = {
      id: uuidv4(),
      text: input,
      completed: false,
    };
    onSubmit(newTask); // Usar directamente onSubmit ya que es destructurado de props
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        className="task-input"
        type="text"
        placeholder="write your task"
        name="text"
        onChange={handleInput}
      />
      <button className="task-button">
        <IoMdAddCircleOutline /> task
      </button>
    </form>
  )
}

export default TaskForm;