import { Clima } from "./clima.schema";
import { Model } from "mongoose";
import { ClimaDto } from "./clima.dto";
export declare class ClimaService {
    private readonly climaModel;
    constructor(climaModel: Model<Clima>);
    salvarNoBanco(dados: ClimaDto): Promise<(import("mongoose").Document<unknown, {}, Clima, {}, {}> & Clima & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | undefined>;
    read(): Promise<void>;
    update(): Promise<void>;
    delete(): Promise<void>;
}
