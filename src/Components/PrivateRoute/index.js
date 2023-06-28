import React from 'react';
import {Navigate} from "react-router-dom";
import jwt_decode from 'jwt-decode';
const jwtSecret = process.env.JWT_SECRET;

// Protege a las rutas y redirecciona a "/" (login) al no tener token o al tener token no válido
const PrivateRoute = ({children}) =>{
    const token = window.localStorage.getItem("token");
    try {
        var tokenAuth = jwt_decode(token, jwtSecret)
    }
    catch(error){console.log("invalid token")}
        return tokenAuth ? children : <Navigate to="/"/>;
};
export default PrivateRoute;