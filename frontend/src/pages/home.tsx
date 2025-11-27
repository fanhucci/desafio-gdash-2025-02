import { useEffect, useState } from "react";
import type { climaType } from "../components/clima";
import Carrossel from "../components/carrossel";
import Exportar from "../components/exportar";
import type { DateRange } from "react-day-picker";

export default function Home() {
  const url = "http://localhost:3000/clima";

  const [climas, setClimas] = useState<climaType[]>([]);
  const [previsao, setPrevisao] = useState<{ probabilidade: string; vai_chover: string }>({
    probabilidade: "",
    vai_chover: "",
  });
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });

  async function pegaClimas(): Promise<void> {
    const de = dateRange?.from?.toISOString();
    const ate = dateRange?.to?.toISOString();
    const urlClima = de && ate ? `${url}?from=${de}&to=${ate}` : url;

    const req = await fetch(urlClima);
    const res = await req.json();
    setClimas(res ?? []);
  }

  async function pegaPrevisao() {
    const req = await fetch(`${url}/previsao`);
    const res = await req.json();
    setPrevisao(res ?? {});
  }

  useEffect(() => {
    pegaPrevisao();
  }, []);

  useEffect(() => {
    pegaClimas();
  }, [dateRange]);

  return (
    <div className="flex h-full w-full gap-4 p-4 bg-gray-50">
   
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex-1 overflow-hidden rounded-2xl bg-green-100 p-4 shadow-lg">
          <Carrossel dados={climas} />
        </div>
      </div>


      <div className="w-80 flex flex-col gap-4">
        <div className="bg-green-50 rounded-2xl p-4 shadow-lg flex flex-col gap-4">
          <Exportar setter={setDateRange} getter={dateRange} previsao={previsao} />
        </div>
      </div>
    </div>
  );
}
