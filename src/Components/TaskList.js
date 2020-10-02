import React from 'react';
import Task  from './Task';

const TaskList = ({ tasks }) => {
    return(
        <div className="task-container">
            <ul className="task-list">
                {tasks.map(task => (
                    <Task key={task.id} text={task.text} />
                ))}
            </ul>
        </div>
    );
};

export default TaskList;