import React from 'react';
import {Navigate} from "react-router-dom";


// Protege a las rutas y redirecciona a "/" (login) al no tener token o al tener token no válido
const PrivateRoute = ({children}) =>{
    const token = window.localStorage.getItem("token");
        return token ? children : <Navigate to="/"/>;
};
export default PrivateRoute;