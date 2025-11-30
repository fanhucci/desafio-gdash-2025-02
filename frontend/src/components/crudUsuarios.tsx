import { User } from "lucide-react";
import type { UsuarioType } from "./tabelaUsuarios";


import { Input } from "./ui/input";
import { useState, useEffect } from "react";

import { Button } from "./ui/button";
import { Field, FieldLabel } from "./ui/field";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

import useApi from "@/utils/useApi";

interface CrudUsuariosProps {
  selecionado: UsuarioType | null;
}

type usuarioCrud = {
  emailUsuario?:string;
  senhaUsuario?:string;
}

export default function CrudUsuarios({ selecionado }: CrudUsuariosProps) {
  const {fazerRequisicao} = useApi();
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [cadastroEmail, setCadastroEmail] = useState<string>("");
  const [cadastroSenha, setCadastroSenha] = useState<string>("");

  useEffect(() => {
    if (selecionado) {
      setEmail(selecionado.emailUsuario);
    } else {
      setEmail("");
      setSenha("");
    }
  }, [selecionado]);

  async function atualizarUsuario() {

    const payload:usuarioCrud = {}
    if(email.trim()!="") payload.emailUsuario = email;
    if(senha.trim()!="") payload.senhaUsuario = senha;

    if(Object.keys(payload).length<1) return alert("Pelo menos 1 campo tem de estar preenchido.")
    
    await fazerRequisicao("PATCH", `/usuario/${selecionado?._id}`, true, payload);
  }

  async function excluirUsuario() {
    console.log(selecionado?._id)
    await fazerRequisicao("DELETE", `/usuario/${selecionado?._id}`, true);
    alert("Usuário excluído");
  }

  async function cadastrarUsuario() {
    const payload:usuarioCrud = {
      emailUsuario: cadastroEmail,
      senhaUsuario: cadastroSenha
    }

    await fazerRequisicao("POST", "/usuario", true, payload);

  }

  return (
    <Field className="flex justify-center items-start p-6 bg-gray-50 rounded-2xl shadow-md w-full max-w-md">
      <Tabs className="flex flex-col w-full gap-6" defaultValue="cadastro">
        <TabsList className="bg-gray-100 rounded-lg p-1 flex justify-between">
          <TabsTrigger value="cadastro" className="flex-1 text-center">
            Cadastrar
          </TabsTrigger>
          <TabsTrigger value="alterar" className="flex-1 text-center">
            Alterar
          </TabsTrigger>
          <TabsTrigger value="excluir" className="flex-1 text-center">
            Excluir
          </TabsTrigger>
        </TabsList>

      
        <TabsContent value="cadastro" className="flex flex-col gap-4">
          <FieldLabel className="flex items-center gap-2"><User /> E-mail</FieldLabel>
          <Input
            className="w-full px-4 py-3 rounded-lg text-lg"
            placeholder="Digite um e-mail..."
            value={cadastroEmail}
            onChange={(e) => setCadastroEmail(e.target.value)}
          />
          <FieldLabel className="flex items-center gap-2"><User /> Senha</FieldLabel>
          <Input
            className="w-full px-4 py-3 rounded-lg text-lg"
            placeholder="Digite a senha..."
            value={cadastroSenha}
            onChange={(e) => setCadastroSenha(e.target.value)}
          />
          <Button className="w-full mt-2" onClick={cadastrarUsuario}>
            Cadastrar
          </Button>
        </TabsContent>

       
        <TabsContent value="alterar" className="flex flex-col gap-4">
          <FieldLabel className="flex items-center gap-2"><User /> E-mail</FieldLabel>
          <Input
            readOnly={!selecionado}
            placeholder="Selecione um usuário."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg text-lg"
          />
          <FieldLabel className="flex items-center gap-2"><User /> Senha</FieldLabel>
          <Input
            readOnly={!selecionado}
            className="w-full px-4 py-3 rounded-lg text-lg"
            placeholder="Digite a senha..."
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <Button className="w-full mt-2" onClick={atualizarUsuario} disabled={!selecionado}>
            Alterar
          </Button>
        </TabsContent>


        <TabsContent value="excluir" className="flex flex-col gap-4">
          <FieldLabel className="flex items-center gap-2"><User /> E-mail</FieldLabel>
          <Input
            readOnly={!selecionado}
            placeholder="Selecione um usuário."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg text-lg"
          />
          <Button
            variant="destructive"
            className="w-full mt-2"
            onClick={excluirUsuario}
            disabled={!selecionado}
          >
            Excluir
          </Button>
        </TabsContent>
      </Tabs>
    </Field>
  );
}
