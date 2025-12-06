import type { climaType } from "./clima";
import Clima from "./clima";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";

export default function Carrossel({ dados }: { dados: climaType[] }) {
  return (
    <Carousel
      opts={{ startIndex: dados.length - 1 }}
      className="flex flex-col  h-full w-full min-w-0 "
    >
      <div className="flex justify-around items-center w-full">
        <CarouselPrevious className="static translate-x-0 translate-y-0" />
        <CarouselNext className="static translate-x-0 translate-y-0" />
      </div>

      <CarouselContent className="flex flex-1 justify-center min-w-0">
        {dados.map((clima, indice) => (
          <CarouselItem
            key={indice}
            className="basis-auto"  
          >
            <Clima dados={clima} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}