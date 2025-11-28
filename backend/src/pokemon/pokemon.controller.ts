import { Controller, Get, Param } from "@nestjs/common";
import { PokemonDto } from "./pokemon.dto";
import { ListaPokemons, PokemonService } from "./pokemon.service";

@Controller("pokemon")
export class PokemonController{
    constructor(private readonly pokemonService:PokemonService){}

    @Get("/:pagina")
    async listarPokemons(@Param("pagina") pagina: number):Promise<ListaPokemons>{
        return await this.pokemonService.listarPokemons(pagina);
    }

    @Get("/:nome")
    async detalhePokemon(@Param("nome") nome:string):Promise<PokemonDto>{
        return await this.pokemonService.detalhesPokemon(nome)
    }
}