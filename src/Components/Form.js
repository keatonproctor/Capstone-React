import React from 'react';

const Form = () => {
    return(
        <form>
            <input type="text" className="task-input" />

            <button className="task-button" type="submit">
                <i className="far fa-plus-square"></i>
            </button>

            <div className="select">
                <select name="tasks" className="filter-task">
                    <option value="all" className="all-tasks">All</option>
                    <option value="completed" className="completed-tasks">Completed</option>
                    <option value="deleted" className="deleted-tasks">Deleted</option>
                </select>
            </div>

        </form>
    );
}

export default Form;