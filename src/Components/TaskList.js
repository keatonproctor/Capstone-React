import React from 'react';
import Task  from './Task';

const TaskList = ({ tasks, setTasks, filteredTasks }) => {
    return(
        <div className="task-container">
            <ul className="task-list">
                {filteredTasks.map((task) => (
                    <Task 
                        setTasks={setTasks}
                        tasks={tasks}
                        key={task.id}
                        task={task}
                        text={task.text}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TaskList;