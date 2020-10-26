import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { Box, Typography, TextField, Button, Grid } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import axiosClient from '../../config/axios';

const Registration = () => {

    const theme = useTheme();

    const [inputValues, setInputValues] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    });

    const [error, setError] = useState(null);

    const { name, email, password, password2 } = inputValues;

    const changeHandler = e => {
        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value
        });
    };

    const submitHandler = async e => {
        e.preventDefault();

        if (!name.trim() || !email.trim() || !password.trim() || !password2.trim()) {
            setError("Fields can not be left empty!");
        } else if (password.length < 6) {
            setError("Passwords must be at least 6 characters long!");
        } else if (password !== password2) {
            setError("Passwords don't match");
        } else {
            setError(null);
            console.log(inputValues);

            // Add User to database
            try {
                await axiosClient.post('/api/auth/registration', {name, email, password})
            } catch (error){
                setError(error.response.data.msg)
            }

            // Log them in automatically after successful registration!
        }

    };

    return (
        <Box height="100vh" bgcolor="primary.main" display="flex" justifyContent="center" alignItems="center">
            <Paper style={{ width: "400px" }} elevation={3}>
                <form onSubmit={submitHandler} style={{ margin: theme.spacing() * 0 }}>
                    <Grid container direction="column" alignItems="center" spacing={4}>
                        <Grid item className="my-3">
                            <Typography variant="h4" color="primary">Create new Account</Typography>
                        </Grid>
                        {error && <Typography
                            color="error"
                            style={{ marginBottom: theme.spacing() * 2, marginTop: -theme.spacing() * 2 }}
                        >{error}</Typography>}
                        <TextField
                            type="text"
                            className="col-8"
                            label="Name"
                            name="name"
                            variant="outlined"
                            color="primary"
                            style={{ width: "80%", marginBottom: theme.spacing() * 2 }}
                            value={name}
                            onChange={changeHandler}
                        />
                        <TextField
                            type="email"
                            className="col-8"
                            label="Email"
                            name="email"
                            variant="outlined"
                            color="primary"
                            style={{ width: "80%", marginBottom: theme.spacing() * 2 }}
                            value={email}
                            onChange={changeHandler}
                        />
                        <TextField
                            type="password"
                            className="col-8"
                            label="Password"
                            name="password"
                            variant="outlined"
                            color="primary"
                            style={{ width: "80%", marginBottom: theme.spacing() * 2 }}
                            value={password}
                            onChange={changeHandler}
                        />
                        <TextField
                            type="password"
                            className="col-8"
                            label="Confirm password"
                            name="password2"
                            variant="outlined"
                            color="primary"
                            style={{ width: "80%", marginBottom: theme.spacing() * 2 }}
                            value={password2}
                            onChange={changeHandler}
                        />
                        <Grid item>
                            <Button type="submit" color="primary" size="large" variant="contained">Register</Button>
                        </Grid>
                        <Grid container item justify="flex-start" className="ml-3 mb-2">
                            <Link to={'/login'} color='primary'>
                                Go back to Login
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
};

export default Registration;