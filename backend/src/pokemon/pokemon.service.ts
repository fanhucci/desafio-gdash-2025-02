import { Injectable, NotFoundException } from "@nestjs/common";
import { PokemonDto } from "./pokemon.dto";

export interface ListaPokemons{
    pokemons: string[];
}

@Injectable()
export class PokemonService{


    async listarPokemons(numero:number):Promise<ListaPokemons>{
        let pagina = 0;
        if(!isNaN(numero) && numero>0) pagina = (numero-1)*9
        const urlPokemonPagina = `https://pokeapi.co/api/v2/pokemon/?offset=${pagina}&limit=9`;

        const req = await fetch(urlPokemonPagina);

        if(!req.ok) throw new NotFoundException(`Erro ao procurar pokemons na pagina ${pagina}`)
        const resp = await req.json();

        const listaPokemons = {
            pokemons: resp.results.map(p=>p.name)
        }

        return listaPokemons;

    }

    async detalhesPokemon(pokemon:string):Promise<PokemonDto>{
        const urlPokemonDetalhes = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

        const req = await fetch(urlPokemonDetalhes);

        if(!req.ok) throw new NotFoundException(`Pokemon ${pokemon} não encontrado.`);

        const res = await req.json();

        const detalhesPokemon = {
            idPokemon: res.id,
            nomePokemon: res.name,
            spritePokemon: res.sprites.front_default,
            tiposPokemon: res.types.map(t => (t.type.name ))
        };

        return detalhesPokemon;
    }   
}