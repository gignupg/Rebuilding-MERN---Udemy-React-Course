import React, { useReducer } from 'react';
import taskContext from './TaskContext';
import TaskReducer from './TaskReducer';

const TaskState = props => {
    const initialState = {
        tasks: [],
        taskInput: "",
        activeTask: {},
        activeTasks: [],
        submitButtonName: "Add a task",
        inputError: ""
    }

    const [state, taskDispatcher] = useReducer(TaskReducer, initialState);

    return (
        <taskContext.Provider
            value={{
                tasks: state.tasks,
                taskInput: state.taskInput,
                activeTask: state.activeTask,
                activeTasks: state.activeTasks,
                submitButtonName: state.submitButtonName,
                inputError: state.inputError,
                taskDispatcher
            }}
        >
            {props.children}
        </taskContext.Provider>
    );
};

export default TaskState;