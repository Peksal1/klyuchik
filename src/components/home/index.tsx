import React from "react";
import { Row, Col } from "antd";

const Home: React.FC = () => {
  return (
    <Row style={{ background: "grey" }}>
      <Col xs={24} lg={16}>
        <div
          style={{
            marginTop: "20px",
            marginLeft: "20px",
            height: "200px",
            width: "100%",
            alignContent: "center",
            background:
              "url(https://sun9-33.userapi.com/impg/MYqMyr8dzERYTaNi-DnRkwrjpXGyyWNB5yOGtw/c8fZlY9WeMw.jpg?size=1100x688&quality=96&sign=04e4bd9009a36e430b4135c843354444&type=album) center/cover no-repeat",
          }}
        ></div>
      </Col>
      <Col xs={24} lg={8}>
        <div
          style={{
            marginTop: "60px",
            height: "43.3vh",
            width: "60%",
            marginBottom: "24px",
            background: "brown",
            marginLeft: "auto",
            marginRight: "24px",
          }}
        ></div>
        <div
          style={{
            height: "43.3vh",
            width: "60%",
            marginBottom: "24px",
            background: "brown",
            marginLeft: "auto",
            marginRight: "24px",
          }}
        ></div>
        <div
          style={{
            height: "43.3vh",
            width: "60%",
            marginBottom: "60px",
            background: "brown",
            marginLeft: "auto",
            marginRight: "24px",
          }}
        ></div>
      </Col>
    </Row>
  );
};

export default Home;
