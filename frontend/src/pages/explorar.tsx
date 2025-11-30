import { Button } from "@/components/ui/button";
import { Item , ItemContent, ItemDescription, ItemSeparator, ItemTitle } from "@/components/ui/item";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import useApi from "@/utils/useApi";
import { useEffect, useState } from "react"

export interface detalhePokemon {
    idPokemon:number,
    nomePokemon:string,
    spritePokemon:string,
    tiposPokemon:string[]
}

interface listaPokemonType {
    pokemons:string[]
}

export default function Explorar(){
    const numeroPaginas = Math.trunc(1330/9);
    const maxPagina = numeroPaginas;

    const {fazerRequisicao} = useApi();

    const [paginaAtual,setPaginaAtual] = useState<number>(1);
    const [paginasDisponiveis,setPaginasDisponiveis] = useState<number[]>([]);
    const [listaPokemon,setListaPokemon] = useState<string[]>([]);
    const [detalhePokemon,setDetalhePokemon] = useState<detalhePokemon|null>(null);

    useEffect(()=>{
        calcularPaginas(1);
        pegarListagemPokemons(1);
    },[])

    async function pegarListagemPokemons(numero:number):Promise<void>{
        
        const req = await fazerRequisicao("GET", `/pokemon/${numero}`, false) as listaPokemonType;

        setListaPokemon(req.pokemons);
    }

    async function pegarDetalhePokemon(pokemon:string):Promise<void> {
        const req = await fazerRequisicao("GET", `/pokemon/detalhes/${pokemon}`, false) as detalhePokemon;
        setDetalhePokemon(req);
    }

    function calcularPaginas(paginaRef:number) {
 
        if(paginaRef<=0) paginaRef = 1;
    
        const paginas = [];

        for(let i=0; i<5;i++){
            if(paginaRef+i>maxPagina) break;
            paginas.push(paginaRef+i);
            
        }
        setPaginaAtual(paginas[0])
        setPaginasDisponiveis(paginas)
    }

    function avancarPaginas(){
        calcularPaginas(paginaAtual+5)
        console.log(paginaAtual)
        console.log(maxPagina)
    }

    function voltarPaginas(){
        calcularPaginas(paginaAtual-5)
    }

    return(
        <div className="flex flex-1 flex-col rounded-2xl m-5 bg-red-500">
            <ItemTitle className="text-5xl text-white p-5">Pokemons</ItemTitle>   
            <ItemSeparator/>
            <Item className="flex flex-1 flex-row m-5">
                
                <ItemContent className="flex flex-col h-full justify-around border-3 rounded-2xl p-5 " >
                    {listaPokemon.map((pokemon, indice)=>(
                        <ItemDescription className="text-3xl text-white cursor-pointer rounded p-5 hover:bg-red-300" key={indice} onClick={()=>pegarDetalhePokemon(pokemon)}>{pokemon.charAt(0).toUpperCase()+pokemon.slice(1)}</ItemDescription>
                    ))}
                </ItemContent>
                
                  
                <ItemContent className="flex flex-1 h-full rounded-2xl m-3 gap-5">
                    <div className="flex flex-col items-center bg-red-300 rounded-2xl p-2 m-5 g-4">
                        <ItemDescription className="text-white text-3xl p-4 ">{detalhePokemon? `N° ${detalhePokemon?.idPokemon} - ${detalhePokemon?.nomePokemon.charAt(0).toUpperCase()+detalhePokemon?.nomePokemon.slice(1)}`:"Nenhum pokemon selecionado."}</ItemDescription>
                        <img 
                            src={detalhePokemon?.spritePokemon} 
                            alt={detalhePokemon?.nomePokemon}
                            className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain border-3 bg-red-50 rounded-2xl"
                        />
                        {
                        <div className="flex flex-row gap-5 justify-center p-2 m-2 rounded w-full ">
                                {
                                    detalhePokemon?.tiposPokemon.map((t,indice)=>(
                                        <ItemDescription className="text-2xl bg-amber-100 p-2 rounded"  key={indice}>{t.toUpperCase()}</ItemDescription>
                                    ))
                                }
                        </div>
                        }
                        <Button variant={"default"} onClick={()=>setDetalhePokemon(null)}>Limpar seleção</Button>
                    </div>
                </ItemContent>
              
                
            </Item>

        
            <Pagination className="m-3">
                <PaginationContent className="bg-red-300 rounded">

                    {   
                        paginaAtual<=1?
                            <></>
                        :
                            <PaginationItem className="cursor-pointer">
                                <PaginationPrevious onClick={voltarPaginas}/>
                            </PaginationItem>   
                    }

                    {
                        paginasDisponiveis.map((pagina,indice)=>(
                            <PaginationItem key={indice}>
                                <PaginationLink className="cursor-pointer" onClick={()=>pegarListagemPokemons(pagina)}>{pagina}</PaginationLink>
                            </PaginationItem>
                        ))
                    }

                    {
                        paginasDisponiveis.length > 0 && paginasDisponiveis.at(-1)! < maxPagina ?
                            <PaginationItem>
                                <PaginationEllipsis/>
                            </PaginationItem>

                        :
                            <></>

                    }

                    {   
                        paginasDisponiveis.length > 0 && paginasDisponiveis.at(-1)! < maxPagina ?
                            <PaginationItem className="cursor-pointer">
                                <PaginationNext onClick={avancarPaginas}/>
                            </PaginationItem>
                        :
                            <></>
                    }

                </PaginationContent>
            </Pagination>
       
        </div>
    )
}