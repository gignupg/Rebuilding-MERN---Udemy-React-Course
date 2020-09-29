import React, { useEffect, useContext } from 'react';
import { Button, Paper, Typography } from '@material-ui/core';
import TaskContext from '../../context/tasks/TaskContext';
import ProjectContext from '../../context/projects/ProjectContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Tasks = () => {
    const { activeProject } = useContext(ProjectContext);
    const { tasks, activeTasks, taskDispatcher } = useContext(TaskContext);

    useEffect(() => {
        taskDispatcher({ type: "UPDATE_ACTIVE_TASKS", payload: activeProject });
    }, [tasks, activeProject, taskDispatcher]);

    const statusHandler = (activeTask) => {
        const changedStatus = activeTask.status === "incomplete" ? "complete" : "incomplete";
        const changedTask = { ...activeTask, status: changedStatus };
        taskDispatcher({ type: "UPDATE_TASK_STATUS", payload: changedTask });
    };

    const editTaskHandler = (task) => {
        window.scrollTo(0, 0);
        document.getElementById("task-input-field").focus();
        taskDispatcher({ type: "EDIT_TASK_NAME", payload: task });
    };

    return (
        <>
            {activeTasks.length === 0
                ?
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
                <TransitionGroup>
                    {activeTasks.map(task => (
                        <CSSTransition
                            key={task.id}
                            timeout={{
                                enter: 100,
                                exit: 500,
                            }}
                        >
                            <Paper
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
                                                onClick={() => statusHandler(task)}
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
                                            onClick={() => taskDispatcher({ type: "DELETE_TASK", payload: task })}
                                            className="col m-auto"
                                            size="small"
                                            variant="contained"
                                        >
                                            delete
                                        </Button>
                                    </div>
                                </div>
                            </Paper>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            }
        </>
    );
};

export default Tasks;