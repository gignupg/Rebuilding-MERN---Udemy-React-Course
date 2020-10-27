import React, { useEffect, useContext } from 'react';
import Divider from '@material-ui/core/Divider';
import { Box, Button, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ProjectContext from '../../context/projects/ProjectContext';
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';
import axiosClient from '../../config/axios';

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
}));

const SidebarDrawer = () => {
    const classes = useStyles();
    const { projects, projectInput, inputError, showInputField, projectDispatcher } = useContext(ProjectContext);

    // Puts the cursor into the input field, so you can start typing
    useEffect(() => {
        if (showInputField) {
            document.getElementById("project-input-field").focus();
        }
    }, [showInputField]);

    const projectSubmitHandler = async e => {
        e.preventDefault();

        if (!projectInput) {
            projectDispatcher({ type: "UPDATE_INPUT_ERROR", payload: "The project name cannot be left empty" });

        } else if (projects.some(project => project.name === projectInput)) {
            projectDispatcher({ type: "UPDATE_INPUT_ERROR", payload: "A project with this name already exists" });

        } else {
            const response = await axiosClient.post('/api/projects', { name: projectInput });
            projectDispatcher({ type: "CREATE_NEW_PROJECT", payload: response.data });
        }
    };

    return (
        <div>
            <Box
                className={classes.toolbar}
                display="flex"
                alignItems="center"
                justifyContent="center">
                <Typography
                    color="primary"
                    variant="h5">
                    <span
                        style={{ fontWeight: "bold" }}
                    >
                        MERN
                    </span>
                    Tasks
                </Typography>
            </Box>
            <Divider />
            <Button
                onClick={() => projectDispatcher({ type: "TOGGLE_INPUT_FIELD", payload: true })}
                className="mx-auto mt-4 d-block col-10"
                size="large"
                variant="contained"
                color="primary"
            >
                New Project
            </Button>
            {showInputField &&
                <form onSubmit={projectSubmitHandler}>
                    <TextField
                        id="project-input-field"
                        value={projectInput}
                        onChange={e => projectDispatcher({ type: "UPDATE_PROJECT_INPUT", payload: e.target.value })}
                        size="small"
                        className="mx-auto mt-5 d-block col-10"
                        label="Project name"
                        variant="outlined"
                    >
                    </TextField>
                    <Button
                        type="submit"
                        className="mx-auto mt-2 d-block col-10"
                        size="large"
                        variant="contained"
                        color="primary"
                    >
                        Add this Project
                    </Button>
                </form>
            }
            {inputError &&
                <Typography
                    className="mt-2 mx-4"
                    color="error"
                >
                    {inputError}
                </Typography>
            }
            <Typography
                className="mt-5 mb-3"
                align="center"
                variant="h6"
                color="primary"
            >
                Your projects
            </Typography>
            <TransitionGroup>
                {projects && projects.map(project => (
                    <CSSTransition
                        key={project._id}
                        timeout={200}
                    >
                        <Button
                            onClick={() => projectDispatcher({ type: "UPDATE_ACTIVE_PROJECT", payload: project })}
                            color="primary"
                            className="mb-2 mx-auto d-block text-left col-10"
                        >
                            {project.name}
                        </Button>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </div>
    );
};

export default SidebarDrawer;