import React from "react";
import { Container, Typography, Box, Paper } from "@mui/material";
import CryptoScroller from "./CryptoScroller";
import { useNavigate } from "react-router-dom";

function MainPage({ prices, currentCurrency, currencySymbols, currencies }) {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ py: 5 }} disableGutters>
      <Typography
        variant="h2"
        align="center"
        gutterBottom
        sx={{
          color: "#00ffcc",
          fontSize: { xs: "1.3rem", md: "2rem" },
        }}
      >
        🪙Crypto Tracker🪙
      </Typography>
      <CryptoScroller
        prices={prices}
        currentCurrency={currentCurrency}
        currencySymbols={currencySymbols}
      />
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="stretch"
        gap={3}
        sx={{ mt: 4 }}
      >
        {Object.entries(prices).map(([coin, data]) => (
          <Paper
            elevation={6}
            key={coin}
            onClick={() => navigate(`/coin/${coin}`)}
            sx={{
              minWidth: 180,
              flex: "1 1 160px",
              background: "#222",
              boxShadow: "0 8px 2px 0 #0009, 0 2px 8px 0 #000",
              border: "2.5px solid #111",
              borderRadius: 2,
              px: 3,
              py: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              cursor: "pointer",
              transition: "box-shadow 0.2s, border-color 0.2s, transform 0.22s cubic-bezier(0.4,0,0.2,1)",
              "&:hover": {
                boxShadow: "0 0 18px #000",
                borderColor: "#000",
                transform: "scale(1.2)",
                rotate: "-3deg",
                userSelect: "none",
              },
            }}
            className="price-card"
          >
            <Typography
              variant="h5"
              sx={{
                color: "#00ffcc",
                mb: 1,
                fontSize: "1.1rem",
              }}
            >
              {coin.toUpperCase()}
            </Typography>
            {currencies.map((currency) => (
              <Typography
                variant="body1"
                key={currency}
                sx={{
                  color: "#fff",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  fontSize: "1.06rem",
                }}
              >
                {currencySymbols[currency]}
                {data?.[currency]?.toLocaleString?.() ?? "N/A"} {currency.toUpperCase()}
              </Typography>
            ))}
          </Paper>
        ))}
      </Box>
    </Container>
  );
}

export default MainPage;
