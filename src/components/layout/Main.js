import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import ProjectContext from '../../context/projects/ProjectContext';


const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        minHeight: "100vh",
        backgroundColor: theme.palette.grey[100],
    },
}));

const Main = () => {
    const classes = useStyles();

    const { activeProject } = useContext(ProjectContext);

    return (
        <div className={classes.content}>
            <div className={classes.toolbar} />
            {activeProject ? 
                <div>{activeProject}</div>
            :
                <Typography 
                    color="primary" 
                    variant="h5" 
                    style={{ fontWeight: "bold", textAlign: "center"}}
                >
                    Selecciona un proyecto
                </Typography>
            }
        </div>
    );
};

export default Main;