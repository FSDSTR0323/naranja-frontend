import React from 'react';
import {Navigate} from "react-router-dom";


// Redirecciona de login a dashboard si tienes token
const PrivateRoute = ({children}) =>{
    const token = window.localStorage.getItem("token");
 
        return token ? <Navigate to="/dashboard"/> : children;
};
export default PrivateRoute;