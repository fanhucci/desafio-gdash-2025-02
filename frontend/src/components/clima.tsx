

import { AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";
import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "./ui/item";
import { Accordion } from "./ui/accordion";

export type climaType = {
  iconeClima:string;
  nomeClima:string; 
  descricaoClima:string;
  temperatura:number;
  sensacao:number;
  tempMin:number;
  tempMax:number;
  pressaoAr:number;
  umidade:number;
  velocidadeVento:number;
  direcaoVento:number;
  chuva?:number;
  neve?:number;
  nuvens:number; 
  data:string;
}

type climaProps = {
  dados: climaType;
}

export default function Clima({dados}:climaProps){
  const iconUrl = `https://openweathermap.org/img/wn/${dados.iconeClima}@2x.png`;
  const data = new Date(dados.data);
  const hora = data.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  const dia = data.toLocaleDateString("pt-BR");

  const bgColor = dados.temperatura >= 30 
    ? "bg-yellow-200" 
    : dados.temperatura >= 20 
      ? "bg-green-200" 
      : "bg-blue-200";

  return (
    <Item variant="outline" className={`flex flex-col m-4 w-64 ${bgColor} rounded-2xl shadow-lg overflow-hidden border border-gray-200`}>
      
      <ItemContent className="flex flex-col gap-3 p-4">

        
        <ItemTitle className="text-center">
        <span className="text-2xl font-bold text-gray-900">{hora}</span>
        <span className="block text-sm text-gray-500">{dia}</span>
        </ItemTitle>


        <ItemGroup className="flex flex-col gap-3">

          {/* Bloco principal com ícone e descrição */}
          <Item className="flex flex-col items-center text-center bg-white rounded-xl p-4 shadow-inner">
            <ItemMedia className="w-full h-24">
              <img src={iconUrl} alt={dados.nomeClima} className="w-full h-full object-contain"/>
            </ItemMedia>

            <ItemDescription className="text-gray-700 font-semibold mt-2">
              {dados.descricaoClima}
            </ItemDescription>

            <Accordion type="single" collapsible className="w-full mt-3">
              <AccordionItem value="temp-info">
                <AccordionTrigger className="flex justify-between font-medium text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <span>Temperatura</span>
                  <span>{dados.temperatura}°C</span>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-1 px-3 py-2 text-gray-600">
                  <p>Sensação: {dados.sensacao}°C</p>
                  <p>Máxima: {dados.tempMax}°C</p>
                  <p>Mínima: {dados.tempMin}°C</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Item>

          {/* Detalhes adicionais */}
          <Item className="flex flex-col gap-1 p-3 bg-white rounded-xl shadow-inner text-gray-700 text-sm">
            <ItemContent>
              <ItemDescription>Nuvens: {dados.nuvens}%</ItemDescription>
              <ItemDescription>Umidade: {dados.umidade}%</ItemDescription>
              <ItemDescription>Vento: {dados.velocidadeVento} m/s</ItemDescription>
              <ItemDescription>Direção: {dados.direcaoVento}°</ItemDescription>
              {dados.chuva !== null && <ItemDescription>Chuva: {dados.chuva} mm</ItemDescription>}
              {dados.neve !== null && <ItemDescription>Neve: {dados.neve} mm</ItemDescription>}
            </ItemContent>
          </Item>

        </ItemGroup>

      </ItemContent>
    </Item>
  );
}
