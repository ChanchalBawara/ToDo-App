import { createSlice } from '@reduxjs/toolkit';

// Helper function to load tasks from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('tasks');
    return serializedState ? JSON.parse(serializedState) : []; // Parse stored tasks or return an empty array
  } catch (e) {
    console.warn("Could not load tasks from localStorage", e);
    return []; // Return an empty array if there's an error
  }
};

// Helper function to save tasks to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state); // Serialize the state
    localStorage.setItem('tasks', serializedState); // Save serialized state to localStorage
  } catch (e) {
    console.warn("Could not save tasks to localStorage", e);
  }
};

// Create a slice for tasks with Redux Toolkit
const taskSlice = createSlice({
  name: 'tasks',
  initialState: loadState(), // Load initial state from localStorage
  reducers: {
    // Reducer to add a new task
    addTask: (state, action) => {
      state.push({ id: Date.now(), text: action.payload, completed: false }); // Add new task to the state
      saveState(state); // Save updated state to localStorage
    },
    // Reducer to delete a task
    deleteTask: (state, action) => {
      const newState = state.filter(task => task.id !== action.payload); // Remove task from the state
      saveState(newState); // Save updated state to localStorage
      return newState; // Return updated state
    },
    // Reducer to edit a task
    editTask: (state, action) => {
      const { id, newText } = action.payload;
      const task = state.find(task => task.id === id); // Find the task to be edited
      if (task) {
        task.text = newText; // Update task text
        saveState(state); // Save updated state to localStorage
      }
    },
    // Reducer to toggle task completion
    toggleTask: (state, action) => {
      const task = state.find(task => task.id === action.payload); // Find the task to be toggled
      if (task) {
        task.completed = !task.completed; // Toggle task completion
        saveState(state); // Save updated state to localStorage
      }
    },
  },
});

// Export actions and reducer
export const { addTask, deleteTask, editTask, toggleTask } = taskSlice.actions;
export default taskSlice.reducer;
