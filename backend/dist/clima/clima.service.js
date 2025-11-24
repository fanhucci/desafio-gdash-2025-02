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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClimaService = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const clima_schema_1 = require("./clima.schema");
const mongoose_2 = require("mongoose");
let ClimaService = class ClimaService {
    climaModel;
    constructor(climaModel) {
        this.climaModel = climaModel;
    }
    async salvarNoBanco(dados) {
        if (!dados) {
            return;
        }
        const dadosClima = new this.climaModel({ ...dados });
        return await dadosClima.save();
    }
    async read() {
    }
    async update() {
    }
    async delete() {
    }
};
exports.ClimaService = ClimaService;
exports.ClimaService = ClimaService = __decorate([
    __param(0, (0, mongoose_1.InjectModel)(clima_schema_1.Clima.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ClimaService);
//# sourceMappingURL=clima.service.js.map