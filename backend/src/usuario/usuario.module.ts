import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Usuario, UsuarioSchema } from "./usuario.schema";
import { UsuarioController } from "./usuario.controller";
import { UsuarioService } from "./usuario.service";
import { SeederService } from "./seeder.service";

@Module({
    imports:[
        MongooseModule.forFeature([{name: Usuario.name, schema: UsuarioSchema}]),
    ],
    controllers:[UsuarioController],
    providers:[UsuarioService,SeederService],
    exports:[MongooseModule]
})

export class UsuarioModule{}
