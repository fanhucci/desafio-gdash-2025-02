import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { EditarUsuarioDto } from "./dto/editarUsuario.dto";
import { CriarUsuarioDto } from "./dto/criarUsuario.dto";
import { UsuarioService } from "./usuario.service";
import { Usuario } from "./usuario.schema";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller("usuario")
@ApiBearerAuth("acess-token")
export class UsuarioController{
    constructor(private readonly usuarioService:UsuarioService){}

    
    @Get("")
    @UseGuards(JwtAuthGuard)
    async retornarUsuarios():Promise<Usuario[]>{
        return await this.usuarioService.listarUsuarios();
    }

    @Post("")
    @UseGuards(JwtAuthGuard)
    async registrarUsuario(@Body() usuario:CriarUsuarioDto):Promise<Usuario>{
        return await this.usuarioService.salvarUsuario(usuario);
    }

    @Patch("/:id")
    @UseGuards(JwtAuthGuard)
    async alterarUsuario(@Param("id") id:string, @Body() usuario:EditarUsuarioDto):Promise<Usuario>{
        return await this.usuarioService.editarUsuario(id,usuario)
    }

    @Delete("/:id")
    @UseGuards(JwtAuthGuard)
    async deletarUsuario(@Param("id") id:string):Promise<string>{
        return await this.usuarioService.deletarUsuario(id);
    }

}