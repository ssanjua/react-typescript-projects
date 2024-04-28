import Task from "./Task";
import TaskForm from "./TaskForm";
import '../../styles/todoApp/TaskList.css';
import { useState } from 'react';


interface TaskType {
  id: string;
  text: string;
  isCompleted: boolean;
}

function TaskList() {
  // 2. Usar la interfaz para definir el tipo del estado de tareas.
  const [tasks, setTasks] = useState<TaskType[]>([]);

  // 3. Tipar las funciones que interactúan con las tareas.
  const addTask = (task: TaskType) => {
    if (task.text.trim()) {
      task.text = task.text.trim();
      const updatedTasks = [task, ...tasks];
      setTasks(updatedTasks);
    }
  };

  const deleteTask = (id: string) => {
    const taskUpdated = tasks.filter(task => task.id !== id);
    setTasks(taskUpdated);
  };

  const completeTask = (id: string) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, isCompleted: !task.isCompleted }; // Evitar mutar el objeto de tarea directamente.
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <>
      <TaskForm onSubmit={addTask} />
      
      <div className="task-list-container">
        {tasks.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            text={task.text}
            isCompleted={task.isCompleted}
            completeTask={completeTask}
            deleteTask={deleteTask}
          />
        ))}
      </div>
    </>
  );
}

export default TaskList;
