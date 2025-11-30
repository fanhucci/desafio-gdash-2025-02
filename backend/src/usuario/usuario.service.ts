import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Usuario } from "./usuario.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { EditarUsuarioDto } from "./dto/editarUsuario.dto";
import { CriarUsuarioDto } from "./dto/criarUsuario.dto";

@Injectable()
export class UsuarioService{
    constructor(@InjectModel(Usuario.name) private usuarioModel:Model<Usuario>){}

    async listarUsuarios():Promise<Usuario[]>{   

        return await this.usuarioModel.find();
    }

    async salvarUsuario(usuario:CriarUsuarioDto):Promise<Usuario>{

        const resposta = new this.usuarioModel(usuario);
        
        return await resposta.save();

    }

    async editarUsuario(id:string,camposAlterados:EditarUsuarioDto):Promise<Usuario>{

        const velhoUsuario = await this.usuarioModel.findById(id);

        if(!velhoUsuario) throw new NotFoundException(`Usuário com id ${id} não encontrado.`);
        
        if(camposAlterados.emailUsuario!=undefined) velhoUsuario.emailUsuario = camposAlterados.emailUsuario;
        if(camposAlterados.senhaUsuario!=undefined) velhoUsuario.senhaUsuario = camposAlterados.senhaUsuario;

        return await velhoUsuario.save()
    }

    async deletarUsuario(id:string):Promise<{}>{

        const resultado = await this.usuarioModel.findByIdAndDelete(id);

        if(!resultado) throw new NotFoundException(`Usuário com id ${id} não encontrado.`);

        const mensagem = { mensagem:"Usuário deletado com sucesso."};

        return mensagem ;
    }
     

}