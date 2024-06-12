import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, editTask, toggleTask } from '../redux/taskSlice';

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks); // Select tasks from the Redux store
  const dispatch = useDispatch(); // Hook to dispatch actions to the Redux store
  const [editId, setEditId] = useState(null); // State to manage the task being edited
  const [editText, setEditText] = useState(''); // State to manage the text of the task being edited

  // Handler to enable edit mode for a task
  const handleEdit = (task) => {
    setEditId(task.id); // Set the task ID being edited
    setEditText(task.text); // Set the current text of the task being edited
  };

  // Handler to save the edited task
  const handleSave = (id) => {
    if (editText.trim()) { // Ensure the edited text is not empty or just whitespace
      dispatch(editTask({ id, newText: editText })); // Dispatch editTask action to Redux store
      setEditId(null); // Exit edit mode
      setEditText(''); // Clear the edit text state
    }
  };

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
          {editId === task.id ? (
            <div>
              <input
                type="text"
                value={editText} // Bind input value to editText state
                onChange={(e) => setEditText(e.target.value)} // Update editText state on input change
              />
              <button onClick={() => handleSave(task.id)}>Save</button> {/* Button to save the edited task */}
            </div>
          ) : (
            <div>
              <span onClick={() => dispatch(toggleTask(task.id))}>
                {task.text}
              </span>
              <button onClick={() => handleEdit(task)}>Edit</button> {/* Button to enable edit mode */}
              <button onClick={() => dispatch(deleteTask(task.id))}>Delete</button> {/* Button to delete the task */}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
