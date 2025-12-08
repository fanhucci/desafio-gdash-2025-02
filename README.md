## Link video de apresentação 
#### https://youtu.be/HmmPi0Brxc4

# Projeto de Registro Climático

Aplicação completa para registro e análise de dados climáticos, utilizando múltiplos serviços integrados via Docker Compose. O sistema coleta dados de clima em tempo real, processa e armazena em um banco de dados, oferecendo informações em um frontend React.

---

## Tecnologias utilizadas

- **Backend:** NestJS
- **Frontend:** React + Vite
- **Banco de dados:** MongoDB
- **Fila de mensagens:** RabbitMQ
- **Worker de coleta:** Python
- **Consumidor:** Go
- **Serviço de previsão:** Flask + Random Forest
- **APIs externas:** OpenWeather, PokeAPI
- **Containerização:** Docker + Docker Compose

---

## Funcionalidades principais

- Registro e CRUD de climas e usuários
- Coleta automática de dados climáticos da API OpenWeather a cada 1h
- Processamento e envio de dados via RabbitMQ
- Previsão de chance de chuva via modelo Random Forest
- Integração com PokeAPI para informações adicionais
- Frontend React consumindo os endpoints do backend

---

## Pré-requisitos

- Docker e Docker Compose instalados
- API key da OpenWeather
- (Opcional) Variáveis de configuração para outras APIs e serviços

---

## Iniciar o projeto

1. Copie o arquivo de exemplo `.envexample` para `.env`:

```
    cp .envexample .env
```

2. Configurar variáveis de ambiente

- Chave da API OpenWeather

- Credenciais do usuário inicial

- (Opicional) Urls dos containers docker.

3. Subir os containers
```
    docker-compose build
    docker-compose up
```
## Estrutura do projeto
```
/
    /backend       - API NestJS
    /consumidor  - Consumidor Go que envia os dados para o backend
    /frontend      - App React + Vite
    /ia     - Servidor Flask com modelo Random Forest
    /produtor - Worker Python que acessa a OpenWeather e envia mensagens à fila
    .envexample 
    .docker-compose.yaml
```

## Observações
- O worker Python coleta dados a cada 1h automaticamente.

- O consumidor Go envia os dados processados para o backend.

- O backend faz o CRUD e integra com serviços externos (PokeAPI e Flask ML).

- O frontend consome diretamente os endpoints do backend.