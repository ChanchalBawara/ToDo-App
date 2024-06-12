
// export default App;
import React from 'react';
import TaskInput from './components/TaskInput'; // Capitalize the import
import TaskList from './components/TaskList';   // Capitalize the import
import './App.css';

const App = () => {
  return (
    <div className="app">
      <h1>To-Do List</h1>
      <TaskInput />  {/* Use the component with a capital letter */}
      <TaskList />   {/* Use the component with a capital letter */}
    </div>
  );
};

export default App;
