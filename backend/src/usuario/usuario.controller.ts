import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { EditarUsuarioDto } from "./dto/editarUsuario.dto";
import { CriarUsuarioDto } from "./dto/criarUsuario.dto";
import { UsuarioService } from "./usuario.service";
import { Usuario } from "./usuario.schema";

@Controller("usuario")
export class UsuarioController{
    constructor(private readonly usuarioService:UsuarioService){}

    @Get("")
    async retornarUsuarios():Promise<Usuario[]>{
        return await this.usuarioService.listarUsuarios();
    }

    @Post("")
    async registrarUsuario(@Body() usuario:CriarUsuarioDto):Promise<Usuario>{
        return await this.usuarioService.salvarUsuario(usuario);
    }

    @Patch("/:id")
    async alterarUsuario(@Param("id") id:string, @Body() usuario:EditarUsuarioDto):Promise<Usuario>{
        return await this.usuarioService.editarUsuario(id,usuario)
    }

    @Delete("/:id")
    async deletarUsuario(@Param("id") id:string):Promise<string>{
        return await this.usuarioService.deletarUsuario(id);
    }

}