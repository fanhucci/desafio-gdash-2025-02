import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Clima extends Document{

    @Prop({ required: true })
    iconeClima: string;

    @Prop({ required: true })
    nomeClima: string;

    @Prop({ required: true })
    descricaoClima: string;

    @Prop({ required: true })
    temperatura: number;

    @Prop({ required:true  })
    sensacao: number ;

    @Prop({ required:true })
    tempMin: number ;

    @Prop({  required:true})
    tempMax: number ;

    @Prop({ required:true })
    pressaoAr: number ;

    @Prop({ required: true })
    umidade: number;

    @Prop({ required:true })
    velocidadeVento: number ;

    @Prop({ required:true  })
    direcaoVento: number;

    @Prop({ type:Number, default: null })
    chuva: number | null;

    @Prop({type:Number, default: null })
    neve: number | null;

    @Prop({  required:true })
    nuvens: number ;

    @Prop({ required: true })
    data: string;

}

export const ClimaSchema = SchemaFactory.createForClass(Clima);