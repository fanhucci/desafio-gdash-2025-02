
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Field, FieldLabel } from "../components/ui/field";
import { Input } from "../components/ui/input";
import { useAuth, type Usuario } from "./../../contexts/AuthContext";
import useApi from "@/utils/useApi";

export default function Login() {
  const { entrar  } = useAuth();

  const {fazerRequisicao} = useApi();
  
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");

  async function fazerLogin(): Promise<void> {

    if (!email || !senha) {
      console.log("Preencha todos os campos!");
      return;
    }

    const payload = {
      emailUsuario: email,
      senhaUsuario: senha
    }

    const req = await fazerRequisicao("POST", "/login/autenticar", false, payload ) as Usuario ;
    
    entrar(req);
  }

  return (
    <div className="flex flex-1 h-screen bg-gray-50 items-center justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Entrar na sua conta
        </h2>

        <Field className="flex flex-col space-y-2">
          <FieldLabel>E-mail</FieldLabel>
          <Input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </Field>

        <Field className="flex flex-col space-y-2">
          <FieldLabel>Senha</FieldLabel>
          <Input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="px-4 py-3 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </Field>

        <Button
          onClick={fazerLogin}
          className="w-full py-3 rounded-lg text-lg font-semibold"
          variant="secondary"
        >
          Entrar
        </Button>

       
      </div>
    </div>
  );
}