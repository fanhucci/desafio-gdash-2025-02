
import { useEffect, useState } from "react";
import CrudUsuarios from "../components/crudUsuarios";
import type { UsuarioType } from "../components/tabelaUsuarios";
import TabelaUsuarios from "../components/tabelaUsuarios";
import { useAuth } from "./../../contexts/AuthContext";
import useApi from "@/utils/useApi";

export default function Usuarios() {
  const {usuario} = useAuth();
   const {fazerRequisicao} = useApi();
  const [usuarios, setUsuarios] = useState<UsuarioType[]>([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<UsuarioType | null>(null);
  const [atualizaView, setAtualizaView] = useState<boolean>(false);

  async function pegarUsuarios() {

   
    if(!usuario)return
    
    const req = await fazerRequisicao("GET", "/usuario", true) as [];
   
    setUsuarios(req);
  }

  useEffect(() => {
    pegarUsuarios();
    console.log(JSON.stringify(usuarios))
    if (atualizaView) setAtualizaView(false);
  }, [atualizaView]);

  return (
    <div className="flex h-full w-full p-6 gap-6 bg-gray-50">

      <div className="flex flex-1 flex-col rounded-2xl bg-white shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200 font-semibold text-lg text-gray-700">
          Usuários
        </div>
        <div className="flex-1 overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <TabelaUsuarios
            dados={usuarios}
            setter={setUsuarioSelecionado}
            selecionado={usuarioSelecionado}
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col rounded-2xl bg-white shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200 font-semibold text-lg text-gray-700">
          Gerenciar Usuário
        </div>
        <div className="flex-1 p-4">
          <CrudUsuarios selecionado={usuarioSelecionado}/>
        </div>
      </div>
    </div>
  );
}