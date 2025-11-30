import { toast } from "sonner";
import { useAuth } from "./../../contexts/AuthContext";
import ApiService from "./apiService";

export default function useApi(){

    const {usuario} = useAuth();

    const apiBackend = new ApiService("http://localhost:3000");

    if(usuario) apiBackend.setToken(usuario.access_token);

    return {

        async fazerRequisicao(metodo: "GET" | "POST" | "PATCH" | "DELETE", endpoint:string, needAuth:boolean, payload?:unknown){

            const metodosFetch = {
                "GET": ()=> apiBackend.get(endpoint, needAuth),
                "POST": ()=> apiBackend.post(endpoint, payload, needAuth),
                "PATCH": ()=> apiBackend.patch(endpoint, payload, needAuth),
                "DELETE": ()=> apiBackend.delete(endpoint, needAuth),
            };

            try{
                const resultado = await metodosFetch[metodo]();

                toast.success("Requisição realizada com sucesso.");

                return resultado;
            }
            catch(erro:any){
                toast.error(erro.message);
                throw erro;
            }
        }
    }
}