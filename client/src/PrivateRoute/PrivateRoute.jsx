import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const PrivateRoute = ({ children }) => {
    const { profile } = useUser();

    if (!profile) return <Navigate to='/' />;
    return children;
};


export default PrivateRoute;