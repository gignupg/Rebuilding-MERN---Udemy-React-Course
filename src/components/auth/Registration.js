import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Box, Typography, TextField, Button, Grid, Link } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

const Registration = () => {

    const theme = useTheme();

    return (
        <Box height="100vh" bgcolor="primary.main" display="flex" justifyContent="center" alignItems="center">
            <Paper style={{ width: "400px" }} elevation={3}>
                <form style={{ margin: theme.spacing() * 0 }}>
                    <Grid container direction="column" alignItems="center" spacing={4}>
                        <Grid item className="my-3">
                            <Typography variant="h4" color="primary">Obtener una Cuenta</Typography>
                        </Grid>
                        <TextField
                            className="col-8"
                            label="Nombre"
                            variant="outlined"
                            color="primary"
                            style={{ width: "80%", marginBottom: theme.spacing() * 2 }}
                        />
                        <TextField
                            className="col-8"
                            label="Correo electrónico"
                            variant="outlined"
                            color="primary"
                            style={{ width: "80%", marginBottom: theme.spacing() * 2 }}
                        />
                        <TextField
                            className="col-8"
                            label="Contraseña"
                            variant="outlined"
                            color="primary"
                            style={{ width: "80%", marginBottom: theme.spacing() * 2 }}
                        />
                        <TextField
                            className="col-8"
                            label="Confirmar Contraseña"
                            variant="outlined"
                            color="primary"
                            style={{ width: "80%", marginBottom: theme.spacing() * 2 }}
                        />
                        <Grid item>
                            <Button color="primary" size="large" variant="contained">Registrarme</Button>
                        </Grid>
                        <Grid container item justify="flex-start" className="ml-3 mb-2">
                            <Link href='/login' color='primary'>
                                Volver a Iniciar Sesión
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
};

export default Registration;