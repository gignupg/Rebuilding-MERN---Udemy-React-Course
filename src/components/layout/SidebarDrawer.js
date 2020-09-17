import React, { useState, useContext } from 'react';
import Divider from '@material-ui/core/Divider';
import { Box, Button, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ProjectContext from '../../context/projects/ProjectContext';

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
}));

const SidebarDrawer = () => {
    const classes = useStyles();
    const [newProject, setNewProject] = useState(false);
    const [projects, setProjects] = useState([]);
    const [newInput, setNewInput] = useState("");
    const [inputError, setInputError] = useState("");
    
    const { setActiveProject } = useContext(ProjectContext);


    const projectHandler = (e) => {
        e.preventDefault();

        // empty project name
        if (!newInput) {
            return setInputError("El nombre del proyecto es obligatorio!")
        }

        let double = false;

        // project already exists
        if (projects) {
            double = projects.some(e => e === newInput);
        }

        if (double) {
            setInputError("Ya existe un proyecto con ese nombre!");
        } else {
            setProjects([
                ...projects,
                newInput
            ]);
            setInputError("");
            setNewInput("");
            setNewProject(false);
        }
    };

    return (
        <div>
            <Box className={classes.toolbar} display="flex" alignItems="center" justifyContent="center">
                <Typography color="primary" variant="h5"><span style={{ fontWeight: "bold" }}>MERN</span>Tasks</Typography>
            </Box>
            <Divider />
            <Button onClick={() => setNewProject(true)} className="mx-auto mt-4 d-block col-10" size="large" variant="contained" color="primary">
                Nuevo Proyecto
            </Button>
            {newProject &&
                <form onSubmit={projectHandler}>
                    <TextField value={newInput} onChange={e => setNewInput(e.target.value)} size="small" className="mx-auto mt-5 d-block col-10" label="Nombre Proyecto" variant="outlined"></TextField>
                    <Button onClick={() => setNewProject(true)} className="mx-auto mt-2 d-block col-10" size="large" variant="contained" color="primary">
                        Agregar Proyecto
                    </Button>
                </form>
            }
            {inputError && 
                <Typography className="mt-2 mx-4" color="error">{inputError}</Typography>
            }
            <Typography className="mt-5 mb-3" align="center" variant="h6" color="primary">Tus Proyectos</Typography>
            { projects && projects.map(elem => (
                <Button onClick={() => setActiveProject(elem)} key={elem} color="primary" className="mb-2 mx-auto d-block text-left col-10">{elem}</Button>
            ))}
        </div>
    );
};

export default SidebarDrawer;