import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ClimaModule } from './clima/clima.module';
import { usuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://banco_backend:27017/clima"),
    ClimaModule,
    usuarioModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
