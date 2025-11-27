import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class CriarUsuarioDto{

    @ApiProperty({
        description:"Email do usuario.",
        example: "email@exemplo.com"
    })

    @IsEmail()
    emailUsuario: string;

    @ApiProperty({
        description:"Senha do usuario."
    })

    @IsString()
    @MinLength(6)
    senhaUsuario: string
}