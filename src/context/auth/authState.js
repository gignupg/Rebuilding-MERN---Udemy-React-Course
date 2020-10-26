import React, { useState, useEffect } from 'react';
import authContext from './authContext';
import axiosClient from '../../config/axios';
import tokenInHeader from '../../config/tokenInHeader';

const ProjectState = props => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth")));
    const [user, setUser] = useState(); // Reminder

    const updateUser = async () => {
        try {
            const info = await axiosClient.get('/api/auth/user-info');

            console.log(info)

            setAuth(true);

        } catch (err) {
            console.log("caught an error: ", err);

            setAuth(false);
        }
    };

    useEffect(() => {
        localStorage.setItem('token', token);
        tokenInHeader(token)
    }, [token]);

    useEffect(() => {
        localStorage.setItem('auth', JSON.stringify(auth));
    }, [auth]);

    return (
        <authContext.Provider
            value={{
                token,
                auth,
                setToken,
                setAuth,
                tokenValid: updateUser
            }}
        >
            {props.children}
        </authContext.Provider>
    );
};

export default ProjectState;