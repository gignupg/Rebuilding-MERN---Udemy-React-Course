import React, { useContext } from 'react';
import Tasks from './Tasks';
import ProjectContext from '../../context/projects/ProjectContext';
import TaskContext from '../../context/tasks/TaskContext';
import { Box, Button, TextField, Typography } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';

const ProjectPage = () => {

    const { activeProject, projectDispatcher } = useContext(ProjectContext);
    const { tasks, taskInput, activeTask, submitButtonName, inputError, taskDispatcher} = useContext(TaskContext);

    const taskSubmitHandler = e => {
        e.preventDefault();

        if (!taskInput) {
            taskDispatcher({type: "UPDATE_INPUT_ERROR", payload: "The task name cannot be left empty!"});

        } else if (tasks.some(task => (task.name === taskInput && task.projectId === activeProject.id && activeTask.name !== taskInput))) {
            taskDispatcher({type: "UPDATE_INPUT_ERROR", payload: "This task already exists. Please choose a different name!"});

        } else if (submitButtonName === "Add a task") {
            const newTask = { name: taskInput, status: "incomplete", id: uuidv4(), projectId: activeProject.id }
            taskDispatcher({type: "CREATE_NEW_TASK", payload: newTask})

        } else if (submitButtonName === "Change task name") {
            const updatedTask = { ...activeTask, name: taskInput}
            taskDispatcher({type: "UPDATE_TASK_NAME", payload: updatedTask})
        }
    };

    return (
        <>
            <Box py={6} bgcolor="primary.light" style={{ margin: "0 -24px", marginTop: "-24px" }}>
                <form onSubmit={taskSubmitHandler} className="mx-auto col-10 col-sm-8 col-lg-6">
                    <TextField
                        id="task-input-field"
                        size="small"
                        label="Task name..."
                        variant="filled"
                        value={taskInput}
                        onChange={e => taskDispatcher({type: "UPDATE_TASK_INPUT", payload: e.target.value})}
                        style={{ backgroundColor: "white", borderRadius: "4px", marginBottom: "8px" }}
                        fullWidth
                    ></TextField>
                    <Button
                        type="submit"
                        size="large"
                        variant="contained"
                        color="primary"
                        fullWidth
                    >{submitButtonName}
                    </Button>
                </form>
            </Box>
            {inputError &&
                <Typography 
                    className="mt-3" 
                    align="center" 
                    color="error"
                >
                    {inputError}
                </Typography>
            }
            <Typography
                variant="h5"
                align="center"
                color="primary"
                style={{ fontWeight: "bold" }}
                className="my-5"
            >
                Project: {activeProject.name}
            </Typography>
            <Tasks
            />
            <Button 
                onClick={() => projectDispatcher({type: "DELETE_PROJECT", payload: activeProject})} 
                style={{ marginTop: "32px" }} 
                variant='outlined'
            >
                Delete Project
            </Button>
        </>
    );
};

export default ProjectPage;