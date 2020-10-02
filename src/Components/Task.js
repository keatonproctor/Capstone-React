import React from 'react';

const Task = ({ text }) => {
    return(
        <div className="task">
            <li className="task-item">{text}</li>
            <button className="complete-btn">
                <i className="far fa-plus-square"></i>
            </button>
            <button className="trash-btn">
                <i className="far fa-trash-alt"></i>
            </button>
        </div>
    );
};

export default Task;