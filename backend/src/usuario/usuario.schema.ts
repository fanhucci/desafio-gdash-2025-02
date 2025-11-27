import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as bcrypt from 'bcrypt';
import { Document } from "mongoose";

@Schema()
export class Usuario extends Document{
    @Prop({required:true, unique:true})
    emailUsuario:string;

    @Prop({required:true, select:false})
    senhaUsuario:string;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario)

UsuarioSchema.pre("save", async function (next) {
    
    if(!this.isModified("senhaUsuario")){
        return next();
    }

    try{
        const salt = await bcrypt.genSalt(10);
        this.senhaUsuario = await bcrypt.hash(this.senhaUsuario,salt);
        next()
    }
    catch(erro){
        next(erro)
    }
})