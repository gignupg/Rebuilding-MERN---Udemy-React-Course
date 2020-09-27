import React, { useState } from 'react';
import taskContext from './TaskContext';

const TaskState = props => {
    const [tasks, setTasks] = useState([]);

    return (
        <taskContext.Provider
            value={{
                tasks,
                setTasks,
            }}
        > 
            {props.children}
        </taskContext.Provider>
    )
}

export default TaskState;