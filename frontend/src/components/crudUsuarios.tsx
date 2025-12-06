import { UserPen, UserPlus, UserX } from "lucide-react";
import type { UsuarioType } from "./tabelaUsuarios";

import { Input } from "./ui/input";
import { useState, useEffect } from "react";

import { Button } from "./ui/button";
import { Field, FieldLabel } from "./ui/field";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

import useApi from "@/utils/useApi";

interface CrudUsuariosProps {
  selecionado: UsuarioType | null;
  setter: ()=>void
}

type usuarioCrud = {
  emailUsuario?: string;
  senhaUsuario?: string;
};

export default function CrudUsuarios({ selecionado, setter }: CrudUsuariosProps) {
  const { fazerRequisicao } = useApi();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cadastroEmail, setCadastroEmail] = useState("");
  const [cadastroSenha, setCadastroSenha] = useState("");

  useEffect(() => {
    if (selecionado) {
      setEmail(selecionado.emailUsuario);
    } else {
      setEmail("");
      setSenha("");
    }
  }, [selecionado]);

  async function atualizarUsuario() {
    const payload: usuarioCrud = {};
    if (email.trim() !== "") payload.emailUsuario = email;
    if (senha.trim() !== "") payload.senhaUsuario = senha;

    if (Object.keys(payload).length < 1) return alert("Pelo menos 1 campo tem de estar preenchido.");

    await fazerRequisicao("PATCH", `/usuario/${selecionado?._id}`, true, payload);
    setter();
  }

  async function excluirUsuario() {
    await fazerRequisicao("DELETE", `/usuario/${selecionado?._id}`, true);
    setter();
  }

  async function cadastrarUsuario() {
    const payload: usuarioCrud = {
      emailUsuario: cadastroEmail,
      senhaUsuario: cadastroSenha,
    };

    await fazerRequisicao("POST", "/usuario", true, payload);
    setter();
  }

  return (
    <Field className="flex justify-center items-start p-6 bg-linear-to-b from-gray-50 to-gray-100 rounded-2xl shadow-lg border w-full max-w-md">

      <Tabs className="flex flex-col w-full gap-6" defaultValue="cadastro">

        <TabsList className="bg-white rounded-xl p-1 flex w-full gap-1 shadow-sm">
          <TabsTrigger
            value="cadastro"
            className="flex-1 py-2 rounded-lg flex justify-center items-center gap-2 hover:bg-gray-50 transition data-[state=active]:bg-gray-100 data-[state=active]:shadow"
          >
            <UserPlus size={24} />
          </TabsTrigger>

          <TabsTrigger
            value="alterar"
            className="flex-1 py-2 rounded-lg flex justify-center items-center gap-2 hover:bg-gray-50 transition data-[state=active]:bg-gray-100 data-[state=active]:shadow"
          >
            <UserPen size={24} />
          </TabsTrigger>

          <TabsTrigger
            value="excluir"
            className="flex-1 py-2 rounded-lg flex justify-center items-center gap-2 hover:bg-gray-50 transition data-[state=active]:bg-gray-100 data-[state=active]:shadow"
          >
            <UserX size={24} />
          </TabsTrigger>
        </TabsList>


        <TabsContent value="cadastro" className="flex flex-col gap-4 bg-white p-5 rounded-xl shadow-inner border">
          <FieldLabel className="flex items-center gap-2 text-gray-700 font-medium text-sm">
             E-mail
          </FieldLabel>
          <Input
            className="w-full px-4 py-3 rounded-lg text-md"
            placeholder="Digite um e-mail..."
            value={cadastroEmail}
            onChange={(e) => setCadastroEmail(e.target.value)}
          />

          <FieldLabel className="flex items-center gap-2 text-gray-700 font-medium text-sm">
             Senha
          </FieldLabel>
          <Input
            className="w-full px-4 py-3 rounded-lg text-md"
            placeholder="Digite a senha..."
            value={cadastroSenha}
            onChange={(e) => setCadastroSenha(e.target.value)}
          />

          <Button className="w-full mt-2 py-3 text-md font-semibold" onClick={cadastrarUsuario}>
            Cadastrar
          </Button>
        </TabsContent>

        <TabsContent value="alterar" className="flex flex-col gap-4 bg-white p-5 rounded-xl shadow-inner border">
          <FieldLabel className="flex items-center gap-2 text-gray-700 font-medium text-sm">
             Novo e-mail
          </FieldLabel>
          <Input
            readOnly={!selecionado}
            placeholder="Selecione um usuário."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg text-md"
          />

          <FieldLabel className="flex items-center gap-2 text-gray-700 font-medium text-sm">
             Nova senha
          </FieldLabel>
          <Input
            readOnly={!selecionado}
            className="w-full px-4 py-3 rounded-lg text-md"
            placeholder="Digite a senha..."
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <Button
            className="w-full mt-2 py-3 text-md font-semibold"
            onClick={atualizarUsuario}
            disabled={!selecionado}
          >
            Alterar
          </Button>
        </TabsContent>


        <TabsContent value="excluir" className="flex flex-col gap-4 bg-white p-5 rounded-xl shadow-inner border">
          <FieldLabel className="flex items-center gap-2 text-gray-700 font-medium text-sm">
             E-mail
          </FieldLabel>
          <Input
            readOnly
            placeholder="Selecione um usuário."
            value={email}
            className="w-full px-4 py-3 rounded-lg text-md"
          />

          <Button
            variant="destructive"
            className="w-full mt-2 py-3 text-md font-semibold"
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
