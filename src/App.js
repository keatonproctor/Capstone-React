import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './Components/Form';
import TaskList from './Components/TaskList';

function App() {
  const [inputText, setInputText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTasks, setFilteredTasks] = useState([]);

  // API Info
  var gapi = window.gapi
  //

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

  // API Info
  var CLIENT_ID = "142624838575-ba60ci3fj5vn8joessj4rej23jfok0le.apps.googleusercontent.com"
  var API_KEY = "AIzaSyCU_3_cOwn5ySoJPCBNwIllv1PM8t8Tm70"
  var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
  var SCOPES = "https://www.googleapis.com/auth/calendar.events"

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
          'summary': 'Title',
          'location': 'Location',
          'description': 'Description',
          'start': {
            'dateTime': '2020-06-28T09:00:00-07:00',
            'timeZone': 'America/Los_Angeles'
          },
          'end': {
            'dateTime': '2020-06-28T17:00:00-07:00',
            'timeZone': 'America/Los_Angeles'
          },
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
        
        // Get API Events
        gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 10,
          'orderBy': 'startTime'
        }).then(response => {
          const events = response.result.items
          console.log('EVENTS: ', events)
        })
        //

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

      <div className="event-wrapper">
        <div className="addEvent">
        <button className="event-btn" onClick={handleClick}>Add Event</button>
        </div>
      </div>
    </div>
  );
}

export default App;
