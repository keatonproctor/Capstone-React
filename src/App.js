import React from 'react';
import './App.css';
import Form from './Components/Form';
import TaskList from './Components/TaskList';

function App() {
  return (
    <div className="App">
      <header>My Task List</header>

      <Form />
      <TaskList />
    </div>
  );
}

export default App;
