import { Body, Controller, Post } from "@nestjs/common";
import { CriarUsuarioDto } from "src/usuario/dto/criarUsuario.dto";
import { AuthService } from "./auth.service";

@Controller("/login")
export class AuthController{
    constructor(private readonly authService:AuthService){}

    @Post("/autenticar")
    async logar(@Body() usuario:CriarUsuarioDto){
        return await this.authService.logar(usuario)
    }
}