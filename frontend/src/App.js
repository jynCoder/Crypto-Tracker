import React, { useEffect, useState } from "react";
import {
  createTheme,
  ThemeProvider,
} from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import MainPage from "./components/MainPage";
import CoinPage from "./components/CoinPage";
import "./App.css";

const theme = createTheme({
  typography: {
    fontFamily: "'Montserrat', sans-serif",
  },
});

function App() {
  const [prices, setPrices] = useState({
    bitcoin:      { usd: 69420,  eur: 63000,  cny: 500000 },
    ethereum:     { usd: 3000,   eur: 2700,   cny: 22000 },
    dogecoin:     { usd: 0.22,   eur: 0.20,   cny: 1.6 },
    solana:       { usd: 155,    eur: 140,    cny: 1100 },
    cardano:      { usd: 0.42,   eur: 0.38,   cny: 3.0 },
    polkadot:     { usd: 6.7,    eur: 6.1,    cny: 49 },
    litecoin:     { usd: 85,     eur: 77,     cny: 600 },
    chainlink:    { usd: 16.5,   eur: 15,     cny: 120 },
    avalanche:    { usd: 28,     eur: 25,     cny: 205 },
    ripple:       { usd: 0.53,   eur: 0.48,   cny: 3.9 },
    tron:         { usd: 0.12,   eur: 0.11,   cny: 0.9 },
    stellar:      { usd: 0.11,   eur: 0.10,   cny: 0.8 },
    vechain:      { usd: 0.031,  eur: 0.028,  cny: 0.23 },
    tezos:        { usd: 0.85,   eur: 0.78,   cny: 6.2 },
    aptos:        { usd: 7.1,    eur: 6.5,    cny: 54 },
  });

  const [currentCurrencyIndex, setCurrentCurrencyIndex] = useState(0);
  const currencySymbols = { usd: "$", eur: "€", cny: "¥" };
  const currencies = ["usd", "eur", "cny"];
  const currentCurrency = currencies[currentCurrencyIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCurrencyIndex((prev) => (prev + 1) % currencies.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currencies.length]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <MainPage
                prices={prices}
                currentCurrency={currentCurrency}
                currencySymbols={currencySymbols}
                currencies={currencies}
              />
            }
          />
          <Route path="/coin/:coin" element={<CoinPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
