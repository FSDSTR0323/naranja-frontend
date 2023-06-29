import React from 'react';
import {Navigate} from "react-router-dom";
import jwt_decode from 'jwt-decode';
const jwtSecret = process.env.JWT_SECRET;

// Redirecciona de login a dashboard si tienes token
const PrivateRoute = ({children}) =>{
    const token = window.localStorage.getItem("token");
    try {
        var tokenAuth = jwt_decode(token, jwtSecret)
    }
    catch(error){console.log("invalid token")}
        return tokenAuth ? <Navigate to="/dashboard"/> : children;
};
export default PrivateRoute;