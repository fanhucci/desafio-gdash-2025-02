import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Usuario } from "./usuario.schema";
import { Model } from "mongoose";
import { CriarUsuarioDto } from "./dto/criarUsuario.dto";

@Injectable()
export class SeederService implements OnApplicationBootstrap{
    constructor(@InjectModel(Usuario.name) private usuarioModel:Model<Usuario>,){}

    async onApplicationBootstrap() {
        const emailPadrao = process.env.EMAIL_USUARIO_PADRAO || null;
        const senhaPadrao = process.env.SENHA_USUARIO_PADRAO || null;
        if(!emailPadrao || !senhaPadrao){
            console.log("Credenciais padroes nao fornecidas.");
            return
        }
        const usuarioPadrao:CriarUsuarioDto =  {emailUsuario: emailPadrao, senhaUsuario: senhaPadrao};
      
        const existe = await this.usuarioModel.findOne({emailUsuario: usuarioPadrao.emailUsuario});

        if (existe){
            console.log("Usuario padrão já existe.");
            return;
        }

        const novoUsuarioPadrao = new this.usuarioModel(usuarioPadrao);
        await novoUsuarioPadrao.save();
        console.log("Usuario padrão criado.");
    }
}