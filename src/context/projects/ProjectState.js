import React, { useReducer } from 'react';
import projectContext from './ProjectContext';
import ProjectReducer from './ProjectReducer';

const ProjectState = props => {
    const initialState = {
        projects: [],
        activeProject: {},
        projectInput: "",
        showInputField: false,
        inputError: "",
    }

    const [state, projectDispatcher] = useReducer(ProjectReducer, initialState)

    return (
        <projectContext.Provider
            value={{
                projects: state.projects,
                activeProject: state.activeProject,
                projectInput: state.projectInput,
                showInputField: state.showInputField,
                inputError: state.inputError,
                projectDispatcher
            }}
        > 
            {props.children}
        </projectContext.Provider>
    )
}

export default ProjectState;