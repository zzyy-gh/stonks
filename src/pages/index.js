import { Col, Row, Table, Typography, DatePicker } from "antd";
import * as React from "react";
import {
  AdvancedChart,
  CompanyProfile,
  Timeline,
} from "react-tradingview-embed";

const { Title, Text } = Typography;

// styles
const pageStyles = {
  color: "#232129",
  padding: 8,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
  background: "#e6f7ff",
};

const row2ColStyles = {
  height: "fit-content",
  minHeight: "300px",
};

const columns = [
  {
    title: "Ticker",
    dataIndex: "tkr",
    key: "tkr",
  },
  {
    title: "Performance",
    dataIndex: "perf",
    key: "perf",
  },
  {
    title: "IPO Date",
    dataIndex: "ipo",
    key: "ipo",
  },
];

// markup
const IndexPage = () => {
  return (
    <main style={pageStyles}>
      <title>Stonks</title>
      <Text>Last edit: 22Sep2021, 8292</Text>
      <Title>Leaderboard</Title>
      <div>
        <DatePicker />
      </div>
      <br />
      <Row gutter={[8, 8]}>
        <Col span={24} lg={{ span: 8 }}>
          <Title level={3}>Daily</Title>
          <Table columns={columns} />
        </Col>
        <Col span={24} lg={{ span: 8 }}>
          <Title level={3}>Weekly</Title>
          <Table columns={columns} />
        </Col>
        <Col span={24} lg={{ span: 8 }}>
          <Title level={3}>Monthly</Title>
          <Table columns={columns} />
        </Col>
      </Row>
      <Text></Text>
      <Title>Ticker Information</Title>
      <Row gutter={[8, 8]} style={row2ColStyles}>
        <Col span={24} xl={{ span: 12 }}>
          <CompanyProfile
            widgetPropsAny={{
              symbol: "AAPL",
              colorTheme: "light",
              isTransparent: false,
              locale: "en",
              width: "100%",
              height: "400",
            }}
          />
        </Col>
        <Col span={24} xl={{ span: 12 }}>
          <AdvancedChart
            widgetPropsAny={{
              symbol: "AAPL",
              width: "100%",
              interval: "D",
              timezone: "Asia/Singapore",
              theme: "light",
              style: "1",
              locale: "en",
              toolbar_bg: "#f1f3f6",
              enable_publishing: false,
              withdateranges: true,
              allow_symbol_change: true,
              show_popup_button: true,
              popup_width: "1000",
              popup_height: "650",
              hide_side_toolbar: true,
            }}
          />
        </Col>
      </Row>
      <Text></Text>
      <Title>News</Title>
      <Timeline
        widgetPropsAny={{
          feedMode: "all_symbols",
          colorTheme: "light",
          isTransparent: false,
          displayMode: "adaptive",
          width: "100%",
          height: "500",
          locale: "en",
        }}
      />
    </main>
  );
};

export default IndexPage;
