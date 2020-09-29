export default (state, action) => {
    switch(action.type) {
        case "CREATE_NEW_TASK":
            return {
                ...state,
                tasks: [action.payload, ...state.tasks],
                taskInput: "",
                activeTask: {},
                inputError: ""
            }
        case "EDIT_TASK_NAME":
            return {
                ...state,
                activeTask: action.payload,
                taskInput: action.payload.name,
                submitButtonName: "Change task name"
            }
        case "UPDATE_INPUT_ERROR":
            return {
                ...state,
                inputError: action.payload
            }
        case "UPDATE_ACTIVE_TASKS":
            return {
                ...state,
                activeTasks: state.tasks.filter(task => task.projectId === action.payload.id ? task : null)
            }
        case "UPDATE_TASK_INPUT":
            return {
                ...state,
                taskInput: action.payload
            }
        case "UPDATE_TASK_NAME":  
            return {
                ...state,
                tasks: state.tasks.map(task => task.id === action.payload.id ? action.payload : task),
                submitButtonName: "Add a task",
                taskInput: "",
                activeTask: {},
                inputError: ""
            }
        case "UPDATE_TASK_STATUS":
            return {
                ...state,
                tasks: state.tasks.map(task => task.id === action.payload.id ? action.payload : task)
            }
        case "UPDATE_SUBMIT_BUTTON_NAME":
            return {
                ...state,
                submitButtonName: action.payload
            }
        case "DELETE_TASK":
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id === action.payload.id ? null : task)
            }
        default:
            return state;
    }
}