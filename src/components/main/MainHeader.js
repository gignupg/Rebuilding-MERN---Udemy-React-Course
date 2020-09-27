import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { drawerWidth } from '../../values/defaults';

const useStyles = makeStyles((theme) => ({
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
}));

const MainHeader = ({ mobileOpen, setMobileOpen }) => {

    const classes = useStyles();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
                <Typography style={{ flexGrow: 1 }} variant="body1" noWrap>
                    Hi <span style={{ fontWeight: "bold" }}>Juan</span>
                </Typography>
                <Typography variant="body1" noWrap>
                    Logout
            </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default MainHeader;