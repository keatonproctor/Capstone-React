import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './Components/Form';
import TaskList from './Components/TaskList';

function App() {
  const [inputText, setInputText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTasks, setFilteredTasks] = useState([]);

  var gapi = window.gapi
  var CLIENT_ID = "831076834116-l2u8v917pgk0lehmumj0qfcldvfoebd8.apps.googleusercontent.com";
  var API_KEY = "AIzaSyDUBBgjpjKYmvZR2F7gIGByPQ1W3PPZpeo";
  var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
  var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

  useEffect(() => {
    getLocalTasks()
  }, []);
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
    saveLocalTasks();
  }, [tasks, status]);


  const handleClick = () => {
    gapi.load('client:auth2', () => {
      console.log('Loaded Client')

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })

      gapi.client.load('calendar', 'v3', () => console.log('Boom!'))

      gapi.auth2.getAuthInstance().signIn()
      .then(() => {
        
        var event = {
          'summary': 'Awesome Event!',
          'location': '800 Howard St., San Francisco, CA 94103',
          'description': 'Really great refreshments',
          'start': {
            'dateTime': '2020-06-28T09:00:00-07:00',
            'timeZone': 'America/Los_Angeles'
          },
          'end': {
            'dateTime': '2020-06-28T17:00:00-07:00',
            'timeZone': 'America/Los_Angeles'
          },
          'recurrence': [
            'RRULE:FREQ=DAILY;COUNT=2'
          ],
          'attendees': [
            {'email': 'lpage@example.com'},
            {'email': 'sbrin@example.com'}
          ],
          'reminders': {
            'useDefault': false,
            'overrides': [
              {'method': 'email', 'minutes': 24 * 60},
              {'method': 'popup', 'minutes': 10}
            ]
          }
        }

        var request = gapi.client.calendar.events.insert({
          'calendarId': 'primary',
          'resource': event,
        })

        request.execute(event => {
          console.log(event)
          window.open(event.htmlLink)
        })

      })
    })
  }


  // Save to LocalStorage
  const saveLocalTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const getLocalTasks = () => {
    if (localStorage.getItem('tasks') === null) {
      localStorage.setItem('tasks', JSON.stringify([]));
    } else {
      let taskLocal = JSON.parse(localStorage.getItem('tasks'));
      setTasks(taskLocal);
    }
  }

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

      <button onClick={handleClick} className="addEvent">Add Event</button>
    </div>
  );
}

export default App;
