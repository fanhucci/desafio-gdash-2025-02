"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClimaDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ClimaDto {
    tipoClima;
    nomeClima;
    descricaoClima;
    temperatura;
    sensacao;
    tempMin;
    tempMax;
    pressaoAr;
    umidade;
    velocidadeVento;
    direcaoVento;
    chuva;
    neve;
    nuvens;
    data;
}
exports.ClimaDto = ClimaDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Id correspondente ao tipo do clima." }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ClimaDto.prototype, "tipoClima", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Tipo do clima." }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ClimaDto.prototype, "nomeClima", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Descrição sobre o clima." }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ClimaDto.prototype, "descricaoClima", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Temperatura atual." }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ClimaDto.prototype, "temperatura", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Sensação termica." }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Object)
], ClimaDto.prototype, "sensacao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Temperatura mínima." }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Object)
], ClimaDto.prototype, "tempMin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Temperatura máxima" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Object)
], ClimaDto.prototype, "tempMax", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Pressão do ar." }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Object)
], ClimaDto.prototype, "pressaoAr", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Umidade do ar." }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ClimaDto.prototype, "umidade", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Velocidade do vento." }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Object)
], ClimaDto.prototype, "velocidadeVento", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Direção do vento." }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Object)
], ClimaDto.prototype, "direcaoVento", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Precipitação da chuva." }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Object)
], ClimaDto.prototype, "chuva", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Precipitação de neve." }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Object)
], ClimaDto.prototype, "neve", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Porcetagem de nuvens." }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Object)
], ClimaDto.prototype, "nuvens", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Data do registro." }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ClimaDto.prototype, "data", void 0);
//# sourceMappingURL=clima.dto.js.map