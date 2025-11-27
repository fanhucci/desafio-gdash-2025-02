from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)


modelo = joblib.load("modelo_chuva.pkl")

colunas_modelo = ["temperatura", "sensacao", "tempMin", "tempMax", 
                  "pressaoAr", "umidade", "velocidadeVento", 
                  "direcaoVento", "nuvens"]

if not modelo:
    raise RuntimeError("Modelo de previsão não foi encontrado!")

@app.route("/")
def health_check():
    return "Servidor flask iniciado!"

@app.route("/prever", methods=["POST"])
def prever():
    clima = request.get_json()
    print(clima)

    df_model = pd.DataFrame([clima])[colunas_modelo].apply(pd.to_numeric, errors="coerce")
    df_model.fillna(df_model.mean(), inplace=True)
    prob = modelo.predict_proba(df_model)[0][1]  
    previsao = int(prob >= 0.5)  

    return jsonify({"vai_chover": previsao, "probabilidade": round(prob, 2)})


if __name__ == "__main__":
    app.run(host="0.0.0.0",port=5000)