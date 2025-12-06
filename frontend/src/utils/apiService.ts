

export default class ApiService{

    private url:string;
    private acess_token:string|null;

    constructor(url:string){
        this.url = url;
        this.acess_token = null;
    }

    setToken(token:string|null){
        this.acess_token = token;
    }

    private async gerarRequisicao( endpoint:string, precisaAuth:boolean, metodo:string, payload?:unknown, ):Promise<unknown>{ 

        const opcoes: RequestInit = {
            method:metodo,
            headers:{"Content-Type":"application/json"}
        };

        if(precisaAuth){

            if(!this.acess_token) throw new Error("Nenhum token de autorização fornecido.");

            opcoes.headers  = {
                ...opcoes.headers as Record<string,string>,
                "Authorization":`Bearer ${this.acess_token}`
            } 
        };

        if(payload !== undefined) {
            opcoes.body = JSON.stringify(payload);
        };

        const requisicao = await fetch(this.url+endpoint,opcoes);


        const tipoConteudo = requisicao.headers.get("content-type") || "";
        

        if(!tipoConteudo.includes("application/json")){

            if (!requisicao.ok) throw new Error(`Erro HTTP ${requisicao.status}`);

            return requisicao;
        }

        const resposta = await requisicao.json();

        if(!requisicao.ok) throw new Error(`${resposta.statusCode} - ${resposta.message}`);

        return resposta;
    }

    async get(endpoint:string, needAuth:boolean):Promise<unknown>{
        const method = "GET";
        return await this.gerarRequisicao(endpoint, needAuth, method);
    }

    async post(endpoint:string, payload:unknown ,needAuth:boolean):Promise<unknown>{
        const method = "POST";
        return await this.gerarRequisicao(endpoint, needAuth, method, payload);
    }

    async patch(endpoint:string, payload:unknown ,needAuth:boolean):Promise<unknown>{
        const method= "PATCH";
        return await this.gerarRequisicao(endpoint, needAuth, method, payload);
    }

    async delete(endpoint:string, needAuth:boolean):Promise<unknown>{
        const method= "DELETE";
        return await this.gerarRequisicao(endpoint, needAuth, method);
    }

}