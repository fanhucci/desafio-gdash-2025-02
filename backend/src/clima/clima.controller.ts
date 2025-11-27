import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ClimaService } from './clima.service';
import { ClimaDto } from './clima.dto';
import type { Response } from 'express';



@Controller("clima")
export class ClimaController {
  constructor(private readonly climaService: ClimaService) {}

    @Get("")
    async retornaClimas(){
      return await this.climaService.pegaClima();
    }

    @Post("")
    async registrarClima(@Body() clima: ClimaDto){
      return await this.climaService.salvarClima(clima);
    }

    @Get("/previsao")
    async retornaPrevisao(){
      return await this.climaService.pegaPrevisao();
    }

    @Get("/arquivo/:tipo")
    async exportar(@Param("tipo") tipo: "csv" | "xlsx", @Res() res: Response) {
        const buffer = await this.climaService.geraArquivo(tipo);

        if (!buffer) return res.status(400).send("Tipo inválido");

        if (tipo === "csv") {
            res.setHeader("Content-Type", "text/csv");
            res.setHeader("Content-Disposition", 'attachment; filename="clima.csv"');
        } else {
            res.setHeader("Content-Type",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            res.setHeader("Content-Disposition", 'attachment; filename="clima.xlsx"');
        }

        return res.send(buffer);
    }


    
}
