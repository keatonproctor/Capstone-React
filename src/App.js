import React, { useState } from 'react';
import './App.css';
import Form from './Components/Form';
import TaskList from './Components/TaskList';

function App() {
  const [inputText, setInputText] = useState("");
  return (
    <div className="App">
      <header>My Task List</header>

      <Form setInputText={setInputText} />
      <TaskList />
    </div>
  );
}

export default App;
