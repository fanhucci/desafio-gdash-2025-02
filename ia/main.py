from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

modelo = joblib.load("modelo_chuva.pkl")
if not modelo:
    raise RuntimeError("Modelo de previsão não foi encontrado!")

colunas_modelo = ["temperatura", "sensacao", "tempMin", "tempMax",
                  "pressaoAr", "umidade", "nuvens"]

@app.route("/")
def health_check():
    return "Servidor Flask iniciado!"

@app.route("/prever", methods=["POST"])
def prever():
    clima = request.get_json()
    

    for col in colunas_modelo + ["nomeClima"]:
        if col not in clima:
            return jsonify({"erro": f"Campo '{col}' ausente no input"}), 400

    df_model = pd.DataFrame([clima])[colunas_modelo].apply(pd.to_numeric, errors="coerce")
    df_model.fillna(df_model.mean(), inplace=True)


    if clima.get("nomeClima", "").lower() == "clear" and clima.get("nuvens", 0) < 5:
        prob = 0.01  
    else:
        prob = modelo.predict_proba(df_model)[0][1]

    previsao = int(prob >= 0.5) 

    return jsonify({"vai_chover": previsao, "probabilidade": round(prob, 2)})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
