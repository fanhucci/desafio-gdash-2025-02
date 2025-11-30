import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CriarUsuarioDto } from "src/usuario/dto/criarUsuario.dto";
import { Usuario } from "src/usuario/usuario.schema";
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService{
    constructor(@InjectModel(Usuario.name) private authModel:Model<Usuario>, private jwtService: JwtService){}

    async logar(dto:CriarUsuarioDto){
        
        const usuario = await this.authModel.findOne({ emailUsuario: dto.emailUsuario}).select("+senhaUsuario");

        if(!usuario) throw new NotFoundException("Credenciais incorretas.");

        const senhaCorreta = await bcrypt.compare(dto.senhaUsuario, usuario.senhaUsuario);

        if(!senhaCorreta) throw new NotFoundException("Credenciais incorretas.")

        const payload = {sub: usuario._id, email:usuario.emailUsuario};

        return {email: usuario.emailUsuario, access_token: this.jwtService.sign(payload)};

    }
}