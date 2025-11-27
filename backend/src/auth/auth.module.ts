import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { UsuarioModule } from "src/usuario/usuario.module";


@Module({
    imports:[
        UsuarioModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET || "segredo_default",
            signOptions:{expiresIn: "1d"}
        })
    ],
    controllers:[AuthController],
    providers:[AuthService,JwtStrategy],
    exports:[AuthService]
})

export class AuthModule{}