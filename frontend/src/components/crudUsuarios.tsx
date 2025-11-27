// interface CrudUsuariosProps {
//   selecionado: UsuarioType | null;
//   atualiza: React.Dispatch<React.SetStateAction<boolean>>;
// }

// async function atualizarUsuario() {
//   const payload = {
//     emailUsuario: email,
//     senhaUsuario: senha,
//   };

//   const req = await fetch(`${url}/${selecionado?._id}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload),
//   });

//   const res = await req.json();
//   alert(JSON.stringify(res));

//   atualiza(true); // dispara refresh da lista
// }

// async function excluirUsuario() {
//   const req = await fetch(`${url}/${selecionado?._id}`, { method: "DELETE" });
//   const res = await req.json();

//   alert(JSON.stringify(res));
//   atualiza(true);
// }

// async function cadastrarUsuario() {
//   const payload = {
//     emailUsuario: cadastroEmail,
//     senhaUsuario: cadastroSenha,
//   };

//   const req = await fetch(url, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload),
//   });

//   const res = await req.json();
//   alert(JSON.stringify(res));
//   atualiza(true);
// }



import { User } from "lucide-react";
import type { UsuarioType } from "./tabelaUsuarios";


import { Input } from "./ui/input";
import { useState, useEffect } from "react";

import { Button } from "./ui/button";
import { Field, FieldLabel } from "./ui/field";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface CrudUsuariosProps {
  selecionado: UsuarioType | null;
}

export default function CrudUsuarios({ selecionado }: CrudUsuariosProps) {
  const [email, setEmail] = useState<string>("");
  const [cadastroEmail, setCadastroEmail] = useState<string>("");
  const [cadastroSenha, setCadastroSenha] = useState<string>("");

  useEffect(() => {
    if (selecionado) {
      setEmail(selecionado.emailUsuario);
    } else {
      setEmail("");
    }
  }, [selecionado]);

  async function atualizarUsuario() {
    alert(`E-mail alterado para: ${email}`);
  }

  async function excluirUsuario() {
    alert("Usuário excluído");
  }

  async function cadastrarUsuario() {
    alert("Usuário cadastrado");
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

        {/* CADASTRAR */}
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

        {/* ALTERAR */}
        <TabsContent value="alterar" className="flex flex-col gap-4">
          <FieldLabel className="flex items-center gap-2"><User /> E-mail</FieldLabel>
          <Input
            readOnly={!selecionado}
            placeholder="Selecione um usuário."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg text-lg"
          />
          <Button className="w-full mt-2" onClick={atualizarUsuario} disabled={!selecionado}>
            Alterar
          </Button>
        </TabsContent>

        {/* EXCLUIR */}
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
