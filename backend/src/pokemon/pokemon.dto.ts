import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsNumber, IsString, IsUrl } from "class-validator"

export class PokemonDto{
    @ApiProperty({ description: "Id do pokemon.", example:'1'})
    @IsNumber()
    idPokemon: number

    @ApiProperty({ description: "Nome do pokemon.", example:'bulbasaur'})
    @IsString()
    nomePokemon: string

    @ApiProperty({ description: "Url da imagem do pokemon.", example:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'})
    @IsUrl()
    spritePokemon: string

    @ApiProperty({ description: "Array com nomes dos tipos do pokemon.", example:'["grass", "poison"]'})
    @IsArray()
    @IsString({ each: true })
    tiposPokemon: string[]
}