import React, { useContext } from 'react';
import ProjectContext from '../../context/projects/ProjectContext';
import { Button, TextField } from '@material-ui/core';

const ProjectPage = () => {
    const { activeProject } = useContext(ProjectContext);

    return (
        <form >
            <TextField size="small" className="mx-auto mt-5 d-block col-10" label="Nombre Proyecto" variant="outlined"></TextField>
            <Button className="mx-auto mt-2 d-block col-10" size="large" variant="contained" color="primary">
                Agregar Tarea
            </Button>
        </form>
    );
};

export default ProjectPage;