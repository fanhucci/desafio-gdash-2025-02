import { Test, TestingModule } from "@nestjs/testing";
import { UsuarioService } from "./usuario.service";
import { getModelToken } from "@nestjs/mongoose";
import { Usuario } from "./usuario.schema";

describe("UsuarioService",()=>{
    let mockModel: any;
    let service:any;

    beforeEach(async ()=>{
        mockModel = {
            find: jest.fn(),
            findById: jest.fn(),
            findByIdAndDelete: jest.fn(),
            save: jest.fn()
        }

        const module: TestingModule = await Test.createTestingModule({
            providers:[
                UsuarioService,
                {provide: getModelToken(Usuario.name), useValue: mockModel},
            ],
        }).compile();

        service = module.get<UsuarioService>(UsuarioService);
    });

    afterEach(()=>{
        jest.clearAllMocks();
    })

    //listarUsuarios

    it("retorna um lista com todos os usuarios cadastrados", async ()=>{
        const usuarios = [{emailUsuario: "a@a.com"}];
        mockModel.find.mockResolvedValue(usuarios);

        const resultado = await service.listarUsuarios();
        expect(resultado).toEqual(usuarios);
        expect(mockModel.find).toHaveBeenCalled();
    })

    it("salva um novo usuario no banco de dados", async ()=>{
        
    })
})