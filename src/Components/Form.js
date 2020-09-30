import React from 'react';

const Form = ({ setInputText, tasks, setTasks, inputText }) => {
    const inputTextHandler = (e) => {
        console.log(e.target.value);
        setInputText(e.target.value);
    };

    const submitTaskHandler = (e) => {
        e.preventDefault();
        setTasks([
            ...tasks, { text: inputText, completed:false, id: Math.random() * 1000 }
        ]);
        setInputText("");
    };
    return(
        <form>
            <input value={inputText} onChange={inputTextHandler} type="text" className="task-input" />

            <button onClick={submitTaskHandler} className="task-button" type="submit">
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