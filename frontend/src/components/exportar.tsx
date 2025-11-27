

import { Calendar } from "./ui/calendar";
import type { DateRange } from "react-day-picker";
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemSeparator, ItemTitle } from "./ui/item";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";

type exportarProps = {
  getter: DateRange | undefined;
  setter: (value: DateRange | undefined) => void;
  previsao: { probabilidade: string; vai_chover: string };
};

export default function Exportar({ setter, getter, previsao }: exportarProps) {

  const url = "http://localhost:3000/clima";

  function exportarDados(tipo: string) {
    const link = document.createElement("a");
    link.href = `${url}/exportar/${tipo}`;
    link.click();
  }

  return (
    <ItemGroup className="bg-green-50 rounded-2xl m-3 p-4 shadow-lg flex flex-col gap-4">

      {/* Menu de exportação */}
      <Item className="bg-white rounded-lg shadow-sm p-3">
        <ItemContent className="font-semibold text-gray-700">Exportar Registros</ItemContent>
        <ItemActions>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full">Exportar</Button>
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

      {/* Calendário */}
      <Item className="bg-white rounded-lg shadow-sm p-3">
        <ItemContent className="font-semibold text-gray-400 mb-2">Selecionar período</ItemContent>
        <ItemActions className="w-full">
          <Calendar
            mode="range"
            defaultMonth={getter?.from}
            selected={getter}
            onSelect={setter}
            numberOfMonths={1}
            className="rounded-lg border shadow-sm w-full"
          />
        </ItemActions>
      </Item>

      <ItemSeparator />

      {/* Previsão de chuva */}
      <Item className="bg-white rounded-lg shadow-sm p-3">
        <ItemContent>
          <ItemTitle className="text-gray-800 font-semibold text-base">Probabilidade de chuva</ItemTitle>
          <ItemDescription className="text-gray-600 mt-1">
            {previsao.probabilidade}% - {previsao.vai_chover}
          </ItemDescription>
        </ItemContent>
      </Item>

    </ItemGroup>
  );
}
