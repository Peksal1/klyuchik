import React from "react";
import { Row, Col, Avatar, Typography, Card, Button } from "antd";
import sanitar from "./sanitar.jpg";

const { Title } = Typography;

const Home: React.FC = () => {
  return (
    <Row>
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
        <Card
          style={{
            height: "60vh",
            background: "#36393F",
            width: "70%",
            marginBottom: "24px",
            marginLeft: "auto",
            marginRight: "40px",
            marginTop: "60px",
          }}
          cover={
            <div style={{ display: "flex", alignItems: "center" }}>
              <Avatar
                size={64}
                src={sanitar}
                style={{
                  marginLeft: "24px",
                  marginTop: "24px",
                  marginRight: "24px",
                }}
              />
              <Title
                level={3}
                style={{ color: "white", display: "inline-block" }}
              >
                Ключик в Дурку
              </Title>
            </div>
          }
        >
          <Title style={{ color: "white" }} level={4}>
            Заходите в Discord, пообщаемся!
          </Title>
          <Button
            type="primary"
            href="https://discord.gg/fjVkeJaKjc"
            target="_blank"
            rel="noopener noreferrer"
          >
            Join Discord
          </Button>
        </Card>
      </Col>
    </Row>
  );
};

export default Home;
