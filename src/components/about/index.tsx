import React from "react";
import { Card, Row, Col } from "antd";

const AboutGuildContext = React.createContext<{
  [key: string]: string;
}>({
  // Default values for guild information
  name: "",
  server: "",
  faction: "",
  mythicPlusScore: "",
});

const AboutGuildProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const guildInfo = {
    name: "Легенды могучего Урагана",
    server: "Свежеватель Душ",
    faction: "Альянс",
    mythicPlusScore: "2600",
  };

  return (
    <AboutGuildContext.Provider value={guildInfo}>
      {children}
    </AboutGuildContext.Provider>
  );
};

const AboutGuild: React.FC = () => {
  const info = React.useContext(AboutGuildContext);

  return (
    <Card title="О гильдии" style={{ maxWidth: 600 }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <div>Название гильдии:</div>
            <div>{info.name}</div>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <div>Сервер:</div>
            <div>{info.server}</div>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <div>Фракция:</div>
            <div>{info.faction}</div>
          </Card>
        </Col>
        <Col span={24}>
          <Card>
            <div>Рейтинг в Мифик+:</div>
            <div>{info.mythicPlusScore}</div>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

const AboutGuildPage: React.FC = () => {
  return (
    <AboutGuildProvider>
      <AboutGuild />
    </AboutGuildProvider>
  );
};

export default AboutGuildPage;