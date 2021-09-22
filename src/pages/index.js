import * as React from "react";
import { AdvancedChart, CompanyProfile } from "react-tradingview-embed";

// styles
const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
};

// markup
const IndexPage = () => {
  return (
    <main style={pageStyles}>
      <title>Stonks</title>
      <CompanyProfile />
      <AdvancedChart />
    </main>
  );
};

export default IndexPage;
