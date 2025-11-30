import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext"
import { type JSX } from "react";

export default function RotaProtegida({children}:{children:JSX.Element}){
    const {usuario} = useAuth();

    if(!usuario)return <Navigate to="/login" replace/>

    return children
}