import React, { useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { drawerWidth } from '../../values/defaults';
import { Button } from '@material-ui/core';
import authContext from '../../context/auth/authContext';
import tokenInHeader from '../../config/tokenInHeader';

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

    const { setToken, setAuth, tokenValid } = useContext(authContext)

    const classes = useStyles();

    useEffect( () => {
        tokenValid()
    }, [tokenValid])

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const logoutHandler = () => {
        setToken("")
        setAuth(false)
        tokenInHeader("")
    }

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
                <Button onClick={logoutHandler} style={{ color: "white"}}>
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default MainHeader;