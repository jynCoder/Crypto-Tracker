import React from "react";
import { Container, Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { ResponsiveLine } from "@nivo/line";

// Function to generate random data for the chart
function generateDummyData(coin) {
  const now = Date.now();
  // We'll show price at 10 time points (1 hour apart)
  const data = [];
  let price = Math.random() * 100 + 20; // start price
  for (let i = 0; i < 10; i++) {
    // simulate price movement
    price = Math.max(1, price + (Math.random() - 0.5) * 10);
    data.push({
      x: new Date(now - (9 - i) * 3600 * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      y: Number(price.toFixed(2)),
    });
  }
  return [
    {
      id: coin,
      color: "hsl(181, 70%, 50%)",
      data,
    },
  ];
}

function CoinPage() {
  const { coin } = useParams();

  // Generate dummy data for the chart
  const chartData = generateDummyData(coin);

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" align="center" color="#00ffcc" gutterBottom>
        {coin?.toUpperCase()} Info Page
      </Typography>
      <Box sx={{ height: 400, background: "#18181a", borderRadius: 2, p: 2 }}>
        <ResponsiveLine
          data={chartData}
          margin={{ top: 30, right: 40, bottom: 50, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{ type: "linear", min: "auto", max: "auto", stacked: false, reverse: false }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 6,
            tickPadding: 10,
            tickRotation: 0,
            legend: "Time",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            orient: "left",
            tickSize: 6,
            tickPadding: 10,
            tickRotation: 0,
            legend: "Price",
            legendOffset: -55,
            legendPosition: "middle",
          }}
          colors={["#ff9900"]}
          pointSize={8}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          useMesh={true}
          theme={{
            axis: {
              ticks: {
                text: { fill: "#eee" },
              },
              legend: {
                text: { fill: "#eee" },
              },
            },
            legends: {
              text: { fill: "#eee" },
            },
            tooltip: {
              container: {
                background: "#222",
                color: "#00ffcc",
              },
            },
          }}
        />
      </Box>
    </Container>
  );
}

export default CoinPage;
