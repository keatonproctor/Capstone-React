import React from 'react';
import Task  from './Task';

const TaskList = ({ tasks, setTasks }) => {
    return(
        <div className="task-container">
            <ul className="task-list">
                {tasks.map(task => (
                    <Task 
                        key={task.id}
                        setTasks={setTasks}
                        tasks={tasks}
                        task={task}
                        text={task.text} 
                    />
                ))}
            </ul>
        </div>
    );
};

export default TaskList;