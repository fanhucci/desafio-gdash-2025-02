import {  createContext, type ReactNode, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export type Usuario = {
    email:string,
    access_token:string
}

export type AuthContextType={
    usuario:Usuario|null;
    entrar:(usuario:Usuario)=>void;
    sair:()=>void;
}

const AuthContext = createContext<AuthContextType|null>(null);

export const AuthProvider = ({children}:{children: ReactNode}) =>{
    const [usuario,setUsuario] = useState<Usuario|null>(null);
    const navigate = useNavigate();

    const entrar = (dadosLogin:Usuario)=>{
        setUsuario(dadosLogin);
        navigate("/");
    }

    const sair = () => {
        setUsuario(null);
        navigate("/login");
    }

    return (
        <AuthContext.Provider value={{usuario ,entrar ,sair}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=>{
    const context = useContext(AuthContext);
    if(!context) throw new Error("useAuth must be used within an AuthProvider");
    return context
}