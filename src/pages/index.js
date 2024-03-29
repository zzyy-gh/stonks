import * as React from "react";
import moment from "moment";
import { Col, Row, Table, Typography, DatePicker, Divider } from "antd";
import {
  AdvancedChart,
  CompanyProfile,
  Timeline,
} from "react-tradingview-embed";
import AntList from "../components/AntList";
import MainLayout from "../templates/MainLayout";
import {
  highlightColor,
  tickerNewsStyles,
  row2ColStyles,
} from "../styles/styles";

const { Title } = Typography;

// format
const columns = [
  {
    title: "Ticker",
    dataIndex: "tkr",
    key: "tkr",
  },
  {
    title: "Daily Change %",
    dataIndex: "dayc",
    render: (text, row) => {
      if (row["involvement"].includes("day")) {
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
    sorter: (a, b) => a["dayc"] - b["dayc"],
  },
  {
    title: "Weekly Change %",
    dataIndex: "weekc",
    render: (text, row) => {
      if (row["involvement"].includes("week")) {
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
    sorter: (a, b) => a["weekc"] - b["weekc"],
  },
  {
    title: "Monthly Change %",
    dataIndex: "monc",
    render: (text, row) => {
      if (row["involvement"].includes("month")) {
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
    sorter: (a, b) => a["monc"] - b["monc"],
  },
  {
    title: "Insti. Own. (%)",
    dataIndex: "sti",
    key: "sti",
    sorter: (a, b) => a["sti"] - b["sti"],
  },
  {
    title: "Insi. Own. (%)",
    dataIndex: "si",
    key: "si",
    sorter: (a, b) => a["si"] - b["si"],
  },
  {
    title: "Float",
    dataIndex: "f",
    render: (text) => {
      if (text != null) {
        return text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      } else {
        return text;
      }
    },
    sorter: (a, b) => a["f"] - b["f"],
  },
  {
    title: "Float Short (%)",
    dataIndex: "fsh",
    key: "fsh",
    sorter: (a, b) => a["fsh"] - b["fsh"],
  },
];

const IndexPage = ({ location }) => {
  const [latestDate, setLatest] = React.useState();
  const [earliestDate, setEarliest] = React.useState();
  const [date, setDate] = React.useState();
  const [tkr, setTkr] = React.useState("AAPL");
  const [perfData, setPerfData] = React.useState();
  const involved = "involvement";

  // get date range on initial load
  React.useEffect(() => {
    fetch(
      "https://asia-southeast2-stonks-810ca.cloudfunctions.net/getDateRange"
    )
      .then((x) => x.json())
      .then((x) => {
        setLatest(x.latest);
        setEarliest(x.earliest);
      });
  }, []);

  // set initial date
  React.useEffect(() => {
    setDate(latestDate);
  }, [latestDate]);

  // fetch content on date change
  React.useEffect(() => {
    fetch(
      "https://asia-southeast2-stonks-810ca.cloudfunctions.net/getPerfData?date=" +
        date
    )
      .then((x) => x.json())
      .then((x) => {
        var cleanedData = [];
        for (const [key, value] of Object.entries(x)) {
          value.forEach((item) => {
            var index = cleanedData.findIndex((x) => x["tkr"] === item["tkr"]);
            if (index !== -1 || index === 0) {
              cleanedData[index][involved].push(key);
            } else {
              item[involved] = [];
              item[involved].push(key);
              cleanedData.push(item);
            }
          });
        }
        setPerfData(cleanedData);
      });
  }, [date]);

  // set date range
  function disabledDate(current) {
    var dateInInt = parseInt(moment(current).format("YYYYMMDD"));
    return (
      dateInInt < earliestDate ||
      dateInInt > latestDate ||
      moment(current).day() === 0 ||
      moment(current).day() === 6
    );
  }

  // datepicker's
  function onChange(date) {
    var dateInInt = parseInt(moment(date).format("YYYYMMDD"));
    setDate(dateInInt);
  }

  return (
    <MainLayout path={location.pathname}>
      <title>Stonks</title>
      <Title>Leaderboard</Title>
      <div>
        <DatePicker
          value={moment(date, "YYYYMMDD")}
          disabledDate={disabledDate}
          onChange={onChange}
        />
      </div>
      <br />
      <Table
        columns={columns}
        dataSource={perfData}
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
      <Divider />
      <Title>Ticker Information</Title>
      <Row gutter={[8, 8]} style={row2ColStyles}>
        <Col span={24} xl={{ span: 12 }}>
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
          <AntList
            tkr={tkr}
            earliestDate={earliestDate}
            style={tickerNewsStyles}
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
      <Divider />
      <Title>Market News</Title>
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
    </MainLayout>
  );
};

export default IndexPage;
