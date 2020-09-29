export default (state, action) => {
    switch (action.type) {
        case "CREATE_NEW_PROJECT":
            return {
                ...state,
                projects: [action.payload, ...state.projects],
                showInputField: false,
                projectInput: "",
                inputError: "",
            };
        case "TOGGLE_INPUT_FIELD":
            return {
                ...state,
                showInputField: action.payload
            }
        case "UPDATE_ACTIVE_PROJECT":
            return {
                ...state,
                activeProject: action.payload
            }
        case "UPDATE_PROJECT_INPUT":
            return {
                ...state,
                projectInput: action.payload
            }
        case "UPDATE_INPUT_ERROR":
            return {
                ...state,
                inputError: action.payload
            };
        case "DELETE_PROJECT":
            return {
                ...state,
                projects: state.projects.filter(project => project.id !== action.payload.id ? project : null),
                activeProject: {}
            };
        default:
            return state;
    }
}