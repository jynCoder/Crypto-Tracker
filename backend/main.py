from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

COINGECKO_API = "https://api.coingecko.com/api/v3/simple/price"

# Hardcoded coins and currencies
DEFAULT_COINS = ["bitcoin", "ethereum", "dogecoin", "solana"]
DEFAULT_CURRENCIES = ["usd", "eur", "cny"]

@app.get("/prices")
def get_default_crypto_prices():
    ids = ",".join(DEFAULT_COINS)
    vs_currencies = ",".join(DEFAULT_CURRENCIES)
    params = {
        "ids": ids,
        "vs_currencies": vs_currencies
    }
    try:
        response = requests.get(COINGECKO_API, params=params)
        return response.json()
    except Exception as e:
        return {"error": str(e)}
