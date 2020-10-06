import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './Components/Form';
import TaskList from './Components/TaskList';

function App() {
  const [inputText, setInputText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    const filterHandler = () => {
      switch(status) {
        case 'completed':
          setFilteredTasks(tasks.filter((task) => task.completed === true));
          break;
        case 'uncompleted':
          setFilteredTasks(tasks.filter((task) => task.completed === false));
          break;
          
        default:
          setFilteredTasks(tasks);
          break;
      }
    };
    
    filterHandler();
  }, [tasks, status]);

  return (
    <div className="App">
      <header>My Task List</header>

      {/* State */}
      <Form 
      inputText={inputText} 
      tasks={tasks} 
      setTasks={setTasks} 
      setInputText={setInputText}
      setStatus={setStatus}
      />

      <TaskList
      filteredTasks={filteredTasks} 
      setTasks={setTasks}
      tasks={tasks}
      />

    </div>
  );
}

export default App;
