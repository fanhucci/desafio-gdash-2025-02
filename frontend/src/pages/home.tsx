import { useEffect, useState } from "react";
import type { climaType } from "../components/clima";
import Carrossel from "../components/carrossel";
import Exportar from "../components/exportar";
import useApi from "@/utils/useApi";

type previsaoType = {
  probabilidade: string;
  vai_chover: string;
};

export default function Home() {
  const { fazerRequisicao } = useApi();

  const [climas, setClimas] = useState<climaType[]>([]);
  const [previsao, setPrevisao] = useState<previsaoType>({
    probabilidade: "",
    vai_chover: "",
  });

  async function pegaClimas(): Promise<void> {
    const req = await fazerRequisicao("GET", "/clima", false) as climaType[] | null;
    setClimas(req ?? []);
  }

  async function pegaPrevisao(): Promise<void> {
    const req = await fazerRequisicao("GET", "/clima/previsao", false) as previsaoType | null;

    if (req) {
      setPrevisao(req);
    } else {
      setPrevisao({
        probabilidade: "0",
        vai_chover: "0",
      });
    }
  }

  useEffect(() => {
    pegaClimas();
    pegaPrevisao();
  }, []);

  return (
    <div className="flex h-full w-full gap-4 p-4 bg-gray-50">
      
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex-1 overflow-hidden rounded-2xl bg-green-100 p-4 shadow-lg">
          <Carrossel dados={climas} />
        </div>
      </div>

      <div className="w-80 flex flex-col gap-4">
        <div className="bg-white rounded-2xl p-4 shadow-lg flex flex-col gap-4 border border-gray-200">
          <Exportar previsao={previsao} />
        </div>
      </div>

    </div>
  );
}
