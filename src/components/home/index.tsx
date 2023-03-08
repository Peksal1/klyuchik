import React from "react";
import { Row, Col } from "antd";

const Home: React.FC = () => {
  return (
    <Row>
      <Col span={16}>
        <div
          style={{
            marginTop: "20px",
            height: "200px",
            width: "100%",
            alignContent: "center",
            background:
              "url(https://sun9-33.userapi.com/impg/MYqMyr8dzERYTaNi-DnRkwrjpXGyyWNB5yOGtw/c8fZlY9WeMw.jpg?size=1100x688&quality=96&sign=04e4bd9009a36e430b4135c843354444&type=album) center/cover no-repeat",
          }}
        ></div>
      </Col>
      <Col span={8}>
        <div
          style={{
            marginTop: "60px",
            height: "460px",
            width: "60%",
            marginBottom: "24px",
            background: "brown",
            marginLeft: "auto",
            marginRight: 0,
          }}
        ></div>
        <div
          style={{
            height: "460px",
            width: "60%",
            marginBottom: "24px",
            background: "brown",
            marginLeft: "auto",
            marginRight: 0,
          }}
        ></div>
        <div
          style={{
            height: "460px",
            width: "60%",
            marginBottom: "60px",
            background: "brown",
            marginLeft: "auto",
            marginRight: 0,
          }}
        ></div>
      </Col>
    </Row>
  );
};

export default Home;
