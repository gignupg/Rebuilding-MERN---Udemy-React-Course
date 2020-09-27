import React, { useState } from 'react';
import projectContext from './ProjectContext';

const ProjectState = props => {
    const [projects, setProjects] = useState([]);
    const [activeProject, setActiveProject] = useState({});

    return (
        <projectContext.Provider
            value={{
                projects,
                activeProject,
                setProjects,
                setActiveProject,
            }}
        > 
            {props.children}
        </projectContext.Provider>
    )
}

export default ProjectState;