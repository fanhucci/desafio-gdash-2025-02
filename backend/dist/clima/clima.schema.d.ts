import { Document } from "mongoose";
export declare class Clima extends Document {
    tipoClima: number;
    nomeClima: string;
    descricaoClima: string;
    temperatura: number;
    sensacao?: number;
    tempMin?: number;
    tempMax?: number;
    pressaoAr?: number;
    umidade: number;
    velocidadeVento?: number;
    direcaoVento?: number;
    chuva?: number;
    neve?: number;
    nuvens?: number;
    data: Date;
}
export declare const ClimaSchema: import("mongoose").Schema<Clima, import("mongoose").Model<Clima, any, any, any, Document<unknown, any, Clima, any, {}> & Clima & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Clima, Document<unknown, {}, import("mongoose").FlatRecord<Clima>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Clima> & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>;
