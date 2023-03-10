import React, { useCallback, useContext, useEffect, useState } from "react";
import { Row, Col, Avatar, Typography, Card, Button } from "antd";

const { Title } = Typography;

const AboutGuildProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [guildInfo, setGuildInfo] = useState({
    name: "Loading...",
    server: "Loading...",
    faction: "Loading...",
  });
  const handleSetGuildInfo = useCallback((data) => {
    setGuildInfo({
      name: data.name,
      server: data.realm, // Update key name to 'realm'
      faction: data.faction, // Use lowercase key name
    });
  }, []);

  useEffect(() => {
    async function fetchGuildInfo() {
      const response = await fetch(
        "https://klyuchik-v-durku-backend.herokuapp.com/guild"
      );
      const data = await response.json();
      handleSetGuildInfo(data);
    }

    fetchGuildInfo();
  }, [handleSetGuildInfo]);

  return (
    <AboutGuildContext.Provider value={guildInfo}>
      {children}
    </AboutGuildContext.Provider>
  );
};
const AboutGuildContext = React.createContext<{
  name: string;
  server: string;
  faction: string;
}>({
  name: "",
  server: "",
  faction: "",
});

const AboutGuild: React.FC = () => {
  const guildInfo = useContext(AboutGuildContext);
  return (
    <Card title="О гильдии" style={{ maxWidth: 600, marginTop: "20px" }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <div>Название гильдии:</div>
            <div>{guildInfo.name}</div>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <div>Сервер:</div>
            <div>{guildInfo.server}</div>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <div>Фракция:</div>
            <div>{guildInfo.faction}</div>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

const Home: React.FC = () => {
  return (
    <Row>
      <Col xs={24} lg={16}>
        <AboutGuildProvider>
          <AboutGuild />
        </AboutGuildProvider>
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
                src="/sanitar2.jpg"
                style={{
                  marginLeft: "24px",
                  marginTop: "24px",
                  marginRight: "24px",
                }}
              />
              <Title
                level={3}
                style={{
                  color: "white",
                  display: "inline-block",
                }}
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

export default React.memo(Home);
