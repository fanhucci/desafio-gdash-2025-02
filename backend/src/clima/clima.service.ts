import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Clima } from './clima.schema';
import { ClimaDto } from './clima.dto';
import { Parser as Json2CsvParser } from "json2csv";
import * as XLSX from "xlsx";

@Injectable()
export class ClimaService {
    constructor(@InjectModel(Clima.name) private climaModel: Model<Clima>){}

    pegaClima(){
        return this.climaModel.find()
    }

    async pegaPrevisao(){
        const urlIa = `${process.env.IA_URL}/prever`
        if(!urlIa)return

        const clima = await this.climaModel.findOne().sort({_id:-1}).lean().exec();
        if(!clima)return
        console.log(JSON.stringify(clima))
        const req = await fetch(urlIa,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(clima)
        })

        return req.json()
    }

    salvarClima(clima:ClimaDto){
        if(!clima) return
        const climaSalvo = new this.climaModel(clima)
        return climaSalvo.save()
    }

    async geraArquivo(tipo: string) {
        if (!tipo) return;

        const clima = await this.climaModel.find().lean();
        if (!clima || clima.length < 1) return;

        switch (tipo.toLowerCase()) {
            case "csv": {
                const parser = new Json2CsvParser();
                const csvString = parser.parse(clima);
                const buffer = Buffer.from(csvString, "utf-8");
                return buffer;
            }
            case "xlsx": {
                const worksheet = XLSX.utils.json_to_sheet(clima);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, "Clima");

                const buffer = XLSX.write(workbook, {
                    bookType: "xlsx",
                    type: "buffer",
                });

                return buffer;
            }

            default:
                return null;
        }
    }
}
