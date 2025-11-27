import os 
from dotenv import load_dotenv
import requests;
import schedule
import time
import pika
import json
from datetime import datetime, timezone
load_dotenv()

apiKey = os.getenv("OPENWEATHER_KEY")
cidade = "PRESIDENTE PRUDENTE"

lat = "-22.1225167"

lon = "-51.3882528"


def chama_requisicao(latitute,longitude,chave):

    if not chave:
        raise ValueError("Chave da api OpenWeather não fornecida")
    
    url = f"https://api.openweathermap.org/data/2.5/weather?lat={latitute}&lon={longitude}&appid={chave}&units=metric&lang=pt_br"

    try:
        return requests.get(url)
    except requests.exceptions.RequestException as erro:
        print(f"Erro na requisição: {erro}")
        return None

    
def verifica_resposta(requisicao):
    
    
    if requisicao is None:
        return None
    
    status = requisicao.status_code
    
    if status != 200:
        print(f"Erro da Api: {status}")
        return None
    
    return requisicao.json()

def prepara_resposta(dados):

    if dados is None:
        return None
    
    resposta = {
        "iconeClima":dados.get("weather", [{}])[0].get("icon"),
        "nomeClima":dados.get("weather", [{}])[0].get("main"),
        "descricaoClima":dados.get("weather", [{}])[0].get("description"),
        
        "temperatura":dados.get("main", {}).get("temp"),
        "sensacao":dados.get("main", {}).get("feels_like"),
        "tempMin":dados.get("main", {}).get("temp_min"),
        "tempMax":dados.get("main", {}).get("temp_max"),
        "pressaoAr":dados.get("main", {}).get("pressure"),
        "umidade":dados.get("main", {}).get("humidity"),

        "velocidadeVento":dados.get("wind", {}).get("speed"),
        "direcaoVento":dados.get("wind", {}).get("deg"),

        "chuva":dados.get("rain",{}).get("1h"),
        "neve":dados.get("snow",{}).get("1h"),

        "nuvens":dados.get("clouds", {}).get("all"),

        "data": datetime.fromtimestamp(dados.get("dt"), tz=timezone.utc).isoformat()
    }

    return resposta
    

def obter_clima():

    dados = chama_requisicao(lat,lon,apiKey)

    resposta = verifica_resposta(dados)

    resultado = prepara_resposta(resposta)

    return resultado


def envia_para_fila():

    dados = obter_clima()
    print(dados)
    if dados is None:
        return

    retry_count = 0
    while True:
        try:
            connection = pika.BlockingConnection(
                pika.ConnectionParameters(host='rabbitmq') 
            )
            break
        except Exception as erro:
            retry_count += 1
            print(f"RabbitMQ não pronto ainda, tentando novamente em 5s... (tentativa {retry_count})")
            time.sleep(5)
          
    
    channel = connection.channel()

    channel.queue_declare(queue='clima', durable=True)

    mensagem = json.dumps(dados)


    channel.basic_publish(exchange='',
                          routing_key='clima',
                          body=mensagem)

    print(f"Mensagem enviada para RabbitMQ: {mensagem}")
    connection.close()

schedule.every(1).hour.do(envia_para_fila)

envia_para_fila()
while True:
    
    schedule.run_pending()
    time.sleep(1)