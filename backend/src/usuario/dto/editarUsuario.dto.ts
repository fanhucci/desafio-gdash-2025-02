import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class EditarUsuarioDto{
        @ApiProperty({
            description:"Email do usuario.",
            example: "email@exemplo.com"
        })
    
        @IsEmail()
        @IsOptional()
        emailUsuario: string;
    
        @ApiProperty({
            description:"Senha do usuario."
        })
    
        @IsString()
        @MinLength(6)
        @IsOptional()
        senhaUsuario: string
}