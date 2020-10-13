import React from 'react';

const Form = ({ setInputText, tasks, setTasks, inputText, setStatus }) => {
    const inputTextHandler = (e) => {
        setInputText(e.target.value);
    };

    const submitTaskHandler = (e) => {
        e.preventDefault();
        setTasks([
            ...tasks, { text: inputText, completed:false, id: Math.random() * 10 }
        ]);
        setInputText("");
    };

    const statusHandler = (e) => {
        setStatus(e.target.value);
    };
    return(
        <form>
            <input value={inputText} onChange={inputTextHandler} type="text" className="task-input" />

            <button onClick={submitTaskHandler} className="task-button" type="submit">
                <i className="far fa-plus-square"></i>
            </button>

            <div className="select">
                <select onChange={statusHandler} name="tasks" className="filter-task">
                    <option value="all" className="all-tasks">All</option>
                    <option value="completed" className="completed-tasks">Completed</option>
                    <option value="uncompleted" className="uncompleted-tasks">Uncompleted</option>
                </select>
            </div>
            
        </form>
    );
}

export default Form;