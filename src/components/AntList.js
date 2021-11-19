import { List } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";

const AntList = ({ tkr, earliestDate, style }) => {
  const [data, setData] = useState();
  useEffect(() => {
    var currentDate = moment(new Date()).format("YYYY-MM-DD");
    var earliest = moment(earliestDate, "YYYYMMDD").format("YYYY-MM-DD");
    // console.log(earliest);
    // console.log(typeof earliest);
    fetch(
      "https://finnhub.io/api/v1/company-news?symbol=" +
        tkr +
        "&from=" +
        earliest +
        "&to=" +
        currentDate +
        "&token=br1aovvrh5reisn51fq0"
    )
      .then((x) => x.json())
      .then((x) => setData(x));
  }, [tkr, earliestDate]);
  return (
    <List
      style={style}
      itemLayout="horizontal"
      dataSource={data}
      header={tkr + " News"}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            title={
              <a href={item.url}>
                <strong>{item.headline}</strong>
                {" ("}
                {moment.unix(item.datetime).format("DD-MM-YYYY")}
                {")"}
              </a>
            }
            description={item.summary}
          />
        </List.Item>
      )}
    />
  );
};

export default AntList;
