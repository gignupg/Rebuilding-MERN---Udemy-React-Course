import React, { useState, useEffect, useContext } from 'react';
import { Button, Paper, Typography } from '@material-ui/core';
import TaskContext from '../../context/tasks/TaskContext';
import ProjectContext from '../../context/projects/ProjectContext';

const Tasks = ({setTaskInput, setOldTaskName, setTaskButtonName}) => {
    const { activeProject } = useContext(ProjectContext);
    const { tasks, setTasks } = useContext(TaskContext);

    const [activeTasks, setActiveTasks] = useState([]);

    useEffect(() => {
        setActiveTasks(tasks.filter(task => task.id === activeProject.id ? task : null));
    }, [tasks, activeProject])

    const completionHandler = (activeTask) => {
        // Changing the status of a task
        const changedStatus = activeTask.status === "incomplete" ? "complete" : "incomplete";
        const changedTask = {name: activeTask.name, status: changedStatus, id: activeTask.id}

        setTasks(tasks.map(task => task.name !== activeTask.name ? task : changedTask));
    };

    const editTaskHandler = (task) => {
        window.scrollTo(0, 0);
        document.getElementById("task-input-field").focus();
        setOldTaskName(task.name);
        setTaskInput(task.name);
        setTaskButtonName("Change task name");

    };

    const deleteTaskHandler = deletedTask => {
        setTasks(tasks.filter(task => task.name !== deletedTask.name ? task : null));
    };

    return (
        <>
            {activeTasks.length === 0 ?
                (
                    <Paper
                        elevation={3}
                        className="mx-auto p-0 col-10 col-sm-8 col-lg-6"
                    >
                        <div className="container">
                            <div className="row">
                                <div className="col-12 col-lg-5 my-auto px-0">
                                    <Typography
                                        className="m-1 ml-2"
                                    ><strong>There are no tasks</strong></Typography>
                                </div>
                            </div>
                        </div>
                    </Paper>
                )
                :
                (activeTasks.map(task => {

                    return (
                        <Paper
                            key={task.name}
                            elevation={3}
                            className="mx-auto mb-3 p-2 col-10 col-sm-8 col-lg-6"
                        >
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 col-lg-5 my-auto px-0">
                                        <Typography
                                            className="m-1 align-task-title"
                                        ><strong>{task.name}</strong></Typography>
                                    </div>
                                    <div className="col m-auto px-0">
                                        <Typography
                                            onClick={() => completionHandler(task)}
                                            align="center"
                                            className={`m-1 ${task.status}`}
                                            variant="body2"
                                            style={{ borderRadius: "4px", cursor: "pointer" }}
                                        >
                                            {task.status}
                                        </Typography>
                                    </div>
                                    <Button
                                        onClick={() => editTaskHandler(task)}
                                        className="col m-auto"
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                    >
                                        edit
                                </Button>
                                    <Button
                                        onClick={() => deleteTaskHandler(task)}
                                        className="col m-auto"
                                        size="small"
                                        variant="contained"
                                    >
                                        delete
                                    </Button>
                                </div>
                            </div>
                        </Paper>
                    );
                })
                )
            }
        </>
    );
};

export default Tasks;