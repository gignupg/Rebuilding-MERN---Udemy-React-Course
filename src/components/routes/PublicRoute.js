import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import authContext from '../../context/auth/authContext';

const PublicRoute = ({ component: Component }) => {

    const { auth } = useContext(authContext);

    return (
        <Route render={() => auth ? (
            <Redirect to="/" />
        ) : (
                <Component />
            )} />
    );
};

export default PublicRoute;

