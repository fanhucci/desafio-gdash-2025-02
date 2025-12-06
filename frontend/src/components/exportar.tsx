import { Item, ItemActions, ItemContent, ItemGroup, ItemSeparator, ItemTitle } from "./ui/item";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import useApi from "@/utils/useApi";
import { CloudRain, CloudSun } from "lucide-react";

type exportarProps = {
  previsao: { probabilidade: string; vai_chover: string };
};

export default function Exportar({ previsao }: exportarProps) {
  const { fazerRequisicao } = useApi();

  async function exportarDados(tipo: "csv" | "xlsx") {
    const req = await fazerRequisicao("GET", `/clima/arquivo/${tipo}`, true) as Response; 

    const arquivo = await req.blob();
    const urlArquivo = window.URL.createObjectURL(arquivo);

    const link = document.createElement("a");
    link.href = urlArquivo;
    link.download = `climas.${tipo}`;
    link.click();

    URL.revokeObjectURL(urlArquivo);
  }

  const probabilidadeFormatada = Math.round(parseFloat(previsao.probabilidade) * 100) || 0;
  const chovendo = previsao.vai_chover === "1";

  return (
    <ItemGroup className="bg-green-50 rounded-2xl m-3 p-5 shadow-lg flex flex-col gap-5 border border-green-100">
      
      <Item className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between">
        <ItemContent className="font-semibold text-gray-700">Registros</ItemContent>

        <ItemActions>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline"  className="w-full">Exportar</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              <DropdownMenuLabel>Tipo de arquivo</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => exportarDados("csv")}>CSV</DropdownMenuItem>
              <DropdownMenuItem onClick={() => exportarDados("xlsx")}>XLSX</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ItemActions>
      </Item>

      <ItemSeparator />

  
      <Item className="bg-white rounded-xl shadow-sm p-4">
        <ItemContent className="space-y-3">


          {chovendo && (
            <div className="flex items-center gap-2 text-blue-700">
              <CloudRain className="w-5 h-5" />
              <ItemTitle className="font-semibold text-base">Está chovendo agora</ItemTitle>
            </div>
          )}

          <div className="flex items-center gap-2 text-gray-800">
            {!chovendo && <CloudSun className="w-5 h-5 text-yellow-500" />}
            <ItemTitle className="font-semibold text-base">
              Chance de chuva: {probabilidadeFormatada}%
            </ItemTitle>
          </div>

        </ItemContent>
      </Item>

    </ItemGroup>
  );
}
