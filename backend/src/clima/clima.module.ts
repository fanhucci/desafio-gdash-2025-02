import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Clima, ClimaSchema } from "./clima.schema";
import { ClimaService } from "./clima.service";
import { ClimaController } from "./clima.controller";

@Module({
    imports:[
        MongooseModule.forFeature([{name: Clima.name, schema: ClimaSchema}]),
    ],
    controllers:[ClimaController],
    providers:[ClimaService]
})

export class ClimaModule {}