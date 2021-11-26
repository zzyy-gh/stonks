import * as React from "react";
import MainLayout from "../templates/MainLayout";
import { Table, Row, Col, Typography } from "antd";
import { row2ColStyles, highlightColor } from "../styles/styles";
import { AdvancedChart, CompanyProfile } from "react-tradingview-embed";
import moment from "moment";
const { Title } = Typography;

const involved = "involved";
const columns = [
  {
    title: "Ticker",
    dataIndex: "tkr",
    sorter: (a, b) => a["tkr"].localeCompare(b["tkr"]),
  },
  {
    title: "Daily Change %",
    dataIndex: "dayc",
    render: (text, row) => {
      if (row[involved].includes("day")) {
        return {
          props: {
            style: { background: highlightColor },
          },
          children: text,
        };
      } else {
        return text;
      }
    },
    filters: [
      {
        text: "> 80",
        value: 80,
      },
    ],
    onFilter: (value, record) => record.dayc >= value,
    sorter: (a, b) => a["dayc"] - b["dayc"],
  },
  {
    title: "Weekly Change %",
    dataIndex: "weekc",
    render: (text, row) => {
      if (row[involved].includes("week")) {
        return {
          props: {
            style: { background: highlightColor },
          },
          children: text,
        };
      } else {
        return text;
      }
    },
    filters: [
      {
        text: "> 100",
        value: 100,
      },
    ],
    onFilter: (value, record) => record.weekc >= value,
    sorter: (a, b) => a["weekc"] - b["weekc"],
  },
  {
    title: "Monthly Change %",
    dataIndex: "monc",
    render: (text, row) => {
      if (row[involved].includes("month")) {
        return {
          props: {
            style: { background: highlightColor },
          },
          children: text,
        };
      } else {
        return text;
      }
    },
    filters: [
      {
        text: "> 100",
        value: 100,
      },
    ],
    onFilter: (value, record) => record.monc >= value,
    sorter: (a, b) => a["monc"] - b["monc"],
  },
  {
    title: "Date",
    dataIndex: "date",
    render: (text) => {
      if (text != null) {
        return moment(text, "YYYYMMDD").format("YYYY MMM DD");
      } else {
        return text;
      }
    },
    sorter: (a, b) => a["date"] - b["date"],
  },
];

const TestAPIPage = ({ location }) => {
  const [perfStocks, setPerfStocks] = React.useState([]);
  const [tkr, setTkr] = React.useState("AAPL");

  React.useEffect(() => {
    fetch(
      "https://asia-southeast2-stonks-810ca.cloudfunctions.net/getPerfStock"
    )
      .then((x) => x.json())
      .then((x) => {
        var cleanedData = [];
        for (const [key, value] of Object.entries(x)) {
          value.forEach((item) => {
            var index = cleanedData.findIndex(
              (x) => x["tkr"] === item["tkr"] && x["date"] === item["date"]
            );
            if (index !== -1 || index === 0) {
              cleanedData[index][involved].push(key);
            } else {
              item[involved] = [];
              item[involved].push(key);
              cleanedData.push(item);
            }
          });
        }
        setPerfStocks(cleanedData);
      });
  }, []);

  return (
    <MainLayout path={location.pathname}>
      <title>Stonks - Test API</title>
      <Title>High Flyers</Title>
      <Row gutter={[8, 8]} style={row2ColStyles}>
        <Col span={24} xl={{ span: 12 }}>
          <Table
            columns={columns}
            dataSource={perfStocks}
            pagination={{ pageSize: 6 }}
            scroll={{ x: 300 }}
            onRow={(record) => {
              return {
                onClick: () => {
                  setTkr(record["tkr"]);
                }, // click row
              };
            }}
          />
          <CompanyProfile
            widgetPropsAny={{
              symbol: tkr,
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
              symbol: tkr,
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
    </MainLayout>
  );
};

export default TestAPIPage;
