import React, { useState, useContext } from 'react';
import Tasks from './Tasks';
import ProjectContext from '../../context/projects/ProjectContext';
import TaskContext from '../../context/tasks/TaskContext';
import { Box, Button, TextField, Typography } from '@material-ui/core';

const ProjectPage = () => {

    const { projects, activeProject, setProjects, setActiveProject } = useContext(ProjectContext);
    const { tasks, setTasks } = useContext(TaskContext);

    const [inputError, setInputError] = useState("");
    const [taskInput, setTaskInput] = useState("");
    const [oldTaskName, setOldTaskName] = useState("");
    const [taskButtonName, setTaskButtonName] = useState("Add a task");

    const taskSubmitHandler = e => {
        e.preventDefault();

        if (!taskInput) {
            return setInputError("The task name cannot be left empty!");

        } else if (tasks.some(task => (task.name === taskInput && task.id === activeProject.id && taskButtonName === "Add a task"))) {
            return setInputError("This task already exists. Please choose a different name!");

        } else if (taskButtonName === "Add a task") {
            setTasks([
                { name: taskInput, status: "incomplete", id: activeProject.id },
                ...tasks
            ]);

        } else if (taskButtonName === "Change task name") {
            setTasks(tasks.map(task => {
                if (task.name === oldTaskName && task.id === activeProject.id) {
                    return { name: taskInput, status: task.status, id: task.id };
                } else {
                    return task;
                }
            }));

            setTaskButtonName("Add a task");
        }

        // Resetting everything
        setTaskInput("");
        setOldTaskName("");
        setInputError("");
    };

    const deleteProjectHandler = () => {
        // Filtering out the current project
        setProjects(projects.filter(project => project.id !== activeProject.id ? project : null));

        // Since we're deleting the project in can not longer be active. A project that doesn't exist cannot be active...
        setActiveProject({});
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
                        onChange={e => setTaskInput(e.target.value)}
                        style={{ backgroundColor: "white", borderRadius: "4px", marginBottom: "8px" }}
                        fullWidth
                    ></TextField>
                    <Button
                        type="submit"
                        size="large"
                        variant="contained"
                        color="primary"
                        fullWidth
                    >{taskButtonName}
                    </Button>
                </form>
            </Box>
            {inputError &&
                <Typography className="mt-3" align="center" color="error">{inputError}</Typography>
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
                setTaskInput={setTaskInput}
                setOldTaskName={setOldTaskName}
                setTaskButtonName={setTaskButtonName}
            />
            <Button onClick={deleteProjectHandler} style={{ marginTop: "32px" }} variant='outlined'>Delete Project</Button>
        </>
    );
};

export default ProjectPage;