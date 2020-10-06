import React from 'react';

const Task = ({ text, task, tasks, setTasks }) => {

    // Event Actions
    const deleteHandler = () => {
        setTasks(tasks.filter((el) => el.id !== task.id));
    };
    const completedHandler = () => {
        setTasks(tasks.map(item =>  {
            if(item.id === task.id){
                return{
                    ...item, completed: !item.completed
                }
            }            
            return item;
        }))
    }

    return(
        <div className="task">
            <li className={`task-item ${task.completed ? "completed" : ""}`}>{text}</li>
            <button onClick={completedHandler} className="complete-btn">
                <i className="far fa-plus-square"></i>
            </button>
            <button onClick={deleteHandler} className="trash-btn">
                <i className="far fa-trash-alt"></i>
            </button>
        </div>
    )
};

export default Task;