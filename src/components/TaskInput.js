import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/taskSlice';

const TaskInput = () => {
  // Local state to manage the input task text
  const [task, setTask] = useState('');
  const dispatch = useDispatch(); // Hook to dispatch actions to the Redux store

  // Handler to add a new task
  const handleAddTask = () => {
    if (task.trim()) { // Ensure the task is not empty or just whitespace
      dispatch(addTask(task)); // Dispatch addTask action to Redux store
      setTask(''); // Clear the input field
    }
  };

  // Handler to check for Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask(); // Call handleAddTask on Enter key press
    }
  };

  return (
    <div className="task-input">
      <input
        type="text"
        value={task} // Bind input value to task state
        onChange={(e) => setTask(e.target.value)} // Update task state on input change
        onKeyPress={handleKeyPress} // Handle Enter key press
        placeholder="Enter a new task" // Placeholder text
      />
      <button onClick={handleAddTask}>Add Task</button> {/* Button to add the task */}
    </div>
  );
};

export default TaskInput;
