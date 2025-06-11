import React, { useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { ResponsiveLine } from "@nivo/line";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

function generateUsdPoints(basePrice = 50) {
  const now = Date.now();
  const data = [];
  let price = basePrice;
  for (let i = 0; i < 10; i++) {
    const changePercent = (Math.random() - 0.5) * 0.06; // -3% to +3%
    price = Math.max(0.01, price * (1 + changePercent));
    data.push({
      x: new Date(now - (9 - i) * 3600 * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      y: Number(price.toFixed(4)),
    });
  }
  return data;
}

function CoinPage({ prices }) {
  const { coin } = useParams();
  const currencySymbols = { usd: "$", eur: "€", cny: "¥" };
  const availableCurrencies = ["usd", "eur", "cny"];
  const [selectedCurrency, setSelectedCurrency] = useState("usd");
  const [usdPointsCache, setUsdPointsCache] = useState({});

  // Hamburger menu state
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleCurrencyChange = (cur) => {
    setSelectedCurrency(cur);
    handleMenuClose();
  };

  // Overlay state for Info/Trends
  const [openTab, setOpenTab] = useState(null); // null, "info", or "trends"
  const handleOpenTab = (tab) => setOpenTab(tab);
  const handleCloseTab = () => setOpenTab(null);

  // Defensive check
  if (!prices || !prices[coin]) {
    return (
      <Container sx={{ py: 5 }}>
        <Typography variant="h4" align="center" color="#00ffcc" gutterBottom>
          {coin ? coin.toUpperCase() : "Coin"} not found!
        </Typography>
        <Typography align="center" sx={{ color: "#fff" }}>
          No price data available for this coin.
        </Typography>
      </Container>
    );
  }

  // Cache USD points per coin
  let usdPoints = usdPointsCache[coin];
  if (!usdPoints) {
    const usdBase = prices[coin]?.usd || 50;
    usdPoints = generateUsdPoints(usdBase);
    setUsdPointsCache(prev => ({ ...prev, [coin]: usdPoints }));
  }

  // Convert USD points to selected currency
  let chartPoints = usdPoints;
  if (selectedCurrency !== "usd") {
    const usd = prices[coin].usd || 1;
    const target = prices[coin][selectedCurrency] || 1;
    const rate = target / usd;
    chartPoints = usdPoints.map(pt => ({
      ...pt,
      y: Number((pt.y * rate).toFixed(4))
    }));
  }

  // Nivo data format
  const chartData = [
    {
      id: coin,
      color: "#ff9900",
      data: chartPoints,
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Typography variant="h4" align="center" color="#00ffcc"   gutterBottom
        sx={{
            transition: "transform 0.2s cubic-bezier(.4,2,.3,1), text-shadow 0.2s",
            textShadow: "0 3px 12px #000, 0 1.5px 0 #011, 0 0 3px #111",
            fontWeight: 800,
            fontSize: { xs: "2rem", md: "2.5rem" },
            letterSpacing: "0.08em",
            "&:hover": {
              transform: "scale(1.07)",
              textShadow: "0 3px 12px #000, 0 1.5px 0 #011, 0 0 3px #111",
            },
          }}
      >
        {coin?.toUpperCase()} Info Page
      </Typography>

      {/* Info/Trends buttons */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 2 }}>
        <Button
          variant="contained"
          sx={{
            background: "#111",
            color: "#00ffcc",
            fontWeight: 700,
            "&:hover": { background: "#222", scale:"1.20", rotate: "-3deg" }
          }}
          onClick={() => handleOpenTab("info")}
        >
          Info
        </Button>
        <Button
          variant="contained"
          sx={{
            background: "#111",
            color: "#00ffcc",
            fontWeight: 700,
            "&:hover": { background: "#222", scale:"1.20", rotate: "3deg" }
          }}
          onClick={() => handleOpenTab("trends")}
        >
          Trends
        </Button>
      </Box>

      {/* Fullscreen Dialog for Info */}
      <Dialog
        open={openTab === "info"}
        onClose={handleCloseTab}
        fullScreen
        PaperProps={{
          sx: {
            background: "rgba(17,17,17,0.96)",
            color: "#fff",
            p: { xs: 2, md: 6 },
          }
        }}
      >
        <DialogTitle sx={{ color: "#00ffcc", fontSize: "2rem", textAlign: "center" }}>
          {coin?.toUpperCase()} Info
          <IconButton
            onClick={handleCloseTab}
            sx={{ position: "absolute", right: 16, top: 16, color: "#fff" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography fontSize={35} fontWeight={500} sx={{ mt: 2 }} textAlign={"center"}>
            {coin?.toUpperCase()} is a blockchain-based digital asset. It enables secure, decentralized transactions and is widely used for smart contracts and payments.
          </Typography>
        </DialogContent>
      </Dialog>

      {/* Fullscreen Dialog for Trends */}
      <Dialog
        open={openTab === "trends"}
        onClose={handleCloseTab}
        fullScreen
        PaperProps={{
          sx: {
            background: "rgba(17,17,17,0.96)",
            color: "#111",
            p: { xs: 2, md: 6 },
          }
        }}
      >
        <DialogTitle sx={{ color: "#C1A050", fontSize: "2rem", textAlign: "center" }}>
          {coin?.toUpperCase()} Trends & Use Cases
          <IconButton
            onClick={handleCloseTab}
            sx={{ position: "absolute", right: 16, top: 16, color: "#fff" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography fontSize={35} fontWeight={500} sx={{ mt: 2 }} textAlign={"center"}>
            Trends: DeFi, NFTs, global payments, staking, and institutional adoption.<br />
            Use cases: fast cross-border transactions, programmable finance, gaming, and more.
          </Typography>
        </DialogContent>
      </Dialog>

      {/* --- Your chart remains unchanged below --- */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          height: { xs: 555, md: 777 },
          width: "100%",
          maxWidth: "1200px",
          mx: "auto",
          background: "#111",
          borderRadius: 3,
          boxShadow: "0 8px 2px 0 #0009, 0 2px 8px 0 #000",
          border: "2.5px solid #111",
          p: 10,
          overflow: "visible",
        }}
      >
        {/* Hamburger IconButton inlaid on chart */}
        <IconButton
          aria-label="select currency"
          onClick={handleMenuOpen}
          sx={{
            position: "absolute",
            top: 18,
            right: 18,
            zIndex: 10,
            background: "#111",
            color: "#00ffcc",
            "&:hover": { background: "#222" },
          }}
          size="large"
        >
          <MenuIcon fontSize="inherit" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          slotProps={{
            paper: {
              sx: {
                backgroundColor: "#111",
                color: "#00ffcc",
                borderRadius: 2,
                boxShadow: "0 4px 24px 0 #000a",
              }
            }
          }}
        >
          {availableCurrencies.map((cur) => (
            <MenuItem
              key={cur}
              selected={cur === selectedCurrency}
              onClick={() => handleCurrencyChange(cur)}
              sx={{
                color: "#00ffcc",
                fontWeight: cur === selectedCurrency ? 700 : 500,
                backgroundColor: "#111",
                "&:hover": {
                  backgroundColor: "#23232b",
                  color: "#fff",
                },
              }}
            >
              {currencySymbols[cur]} {cur.toUpperCase()}
            </MenuItem>
          ))}
        </Menu>
        <ResponsiveLine
          data={chartData}
          margin={{ top: 30, right: 40, bottom: 50, left: 80 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: false,
            reverse: false,
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 6,
            tickPadding: 10,
            tickRotation: 0,
            legend: "TIME",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            orient: "left",
            tickSize: 6,
            tickPadding: 12,
            tickRotation: 0,
            legend: `PRICE (${currencySymbols[selectedCurrency]}${selectedCurrency.toUpperCase()})`,
            legendOffset: -70,
            legendPosition: "middle",
          }}
          colors={["#C1A050"]}
          pointBorderColor={{ from: "serieColor" }}
          pointColor="#ADD8E6"
          pointBorderWidth={2}
          enableArea={false}
          areaOpacity={0.1}
          pointSize={8}
          useMesh={true}
          theme={{
            fontFamily: "Montserrat, Inter, Arial, sans-serif",
            fontSize: 12,
            crosshair: {
              line: {
                stroke: "#ff9900", // or any color you want
                strokeWidth: 2,
                strokeDasharray: "6 4", // for dashed, or "" for solid
              }},
            axis: {
              ticks: {
                text: {
                  fill: "#00ffcc",
                  fontFamily: "Montserrat, Inter, Arial, sans-serif",
                  fontSize: 11,
                  fontWeight: 500,
                },
              },
              legend: {
                text: {
                  fill: "#00ffcc",
                  fontFamily: "Montserrat, Inter, Arial, sans-serif",
                  fontSize: 16,
                  fontWeight: 600,
                },
              },
            },
            legends: {
              text: {
                fill: "#00ffcc",
                fontFamily: "Montserrat, Inter, Arial, sans-serif",
                fontSize: 11,
              },
            },
            tooltip: {
              container: {
                background: "#222",
                color: "#00ffcc",
                fontFamily: "Montserrat, Inter, Arial, sans-serif",
                fontSize: 11,
              },
            },
          }}
        />
      </Box>
    </Container>
  );
}

export default CoinPage;
