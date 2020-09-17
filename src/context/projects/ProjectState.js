import React, { useState } from 'react';
import projectContext from './ProjectContext';

const ProjectState = props => {
    const [activeProject, setActiveProject] = useState("");

    return (
        <projectContext.Provider
            value={{
                activeProject,
                setActiveProject
            }}
        > 
            {props.children}
        </projectContext.Provider>
    )
}

export default ProjectState;