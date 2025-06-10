import React from "react";
import { Box } from "@mui/material";

function CryptoScroller({ prices, currentCurrency, currencySymbols }) {
  const entries = Object.entries(prices);
  const visibleEntries = [...entries, ...entries];

  return (
    <Box
      className="scroller"
      data-animated="true"
      sx={{
        width: "100%",
        maxWidth: 600,
        height: "100%",
        mx: "auto",
        my: 3,
        py: 1.5,
        overflow: "hidden",
        background: "#111",
      }}
    >
      <ul className="tag-list scroller_inner">
        {visibleEntries.map(([coin, data], idx) => (
          <li key={coin + idx} aria-hidden={idx >= entries.length}>
            <span>{coin.toUpperCase()}</span>
            <span>
              {currencySymbols[currentCurrency]}
              {data[currentCurrency].toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default CryptoScroller;
