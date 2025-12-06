import { useEffect, useState } from "react";
import CrudUsuarios from "../components/crudUsuarios";
import type { UsuarioType } from "../components/tabelaUsuarios";
import TabelaUsuarios from "../components/tabelaUsuarios";
import { useAuth } from "./../../contexts/AuthContext";
import useApi from "@/utils/useApi";

export default function Usuarios() {
  const { usuario } = useAuth();
  const { fazerRequisicao } = useApi();
  const [usuarios, setUsuarios] = useState<UsuarioType[]>([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<UsuarioType | null>(null);
  
  function attView(){
    pegarUsuarios()
  }
  async function pegarUsuarios() {
    if (!usuario) return;
    const req = await fazerRequisicao("GET", "/usuario", true);
    setUsuarios(req as []);
  }

  useEffect(() => {
    pegarUsuarios();
  }, []);

  return (
    <div className="flex h-full w-full p-8 gap-8 bg-gray-100">


      <div className="flex flex-1 flex-col rounded-3xl bg-white border border-gray-200 shadow-sm">

        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Lista de Usuários</h2>
          <p className="text-sm text-gray-500">Gerencie e visualize todos os usuários cadastrados.</p>
        </div>

        <div className="flex-1 overflow-auto p-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <TabelaUsuarios
            dados={usuarios}
            setter={setUsuarioSelecionado}
            selecionado={usuarioSelecionado}
          />
        </div>
      </div>


      <div className="w-[380px] flex flex-col rounded-3xl bg-white border border-gray-200 shadow-sm">

        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Gerenciar Usuário</h2>
          <p className="text-sm text-gray-500">Crie, edite ou remova usuários do sistema.</p>
        </div>

        <div className="flex-1 p-6">
          <CrudUsuarios setter={attView} selecionado={usuarioSelecionado} />
        </div>
      </div>

    </div>
  );
}
