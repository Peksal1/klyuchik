import React, { useCallback, useEffect, useState } from "react";
import { Card, Row, Col } from "antd";

const AboutGuildContext = React.createContext<{
  name: string;
  server: string;
  faction: string;
  mythicPlusScore: string;
}>({
  name: "Loading...",
  server: "Loading...",
  faction: "Loading...",
  mythicPlusScore: "Loading...",
});

const AboutGuildProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [guildInfo, setGuildInfo] = useState({
    name: "Loading...",
    server: "Loading...",
    faction: "Loading...",
    mythicPlusScore: "Loading...",
  });

  const handleSetGuildInfo = useCallback((data) => {
    console.log("data", data.name);
    setGuildInfo({
      name: data.name,
      server: data.realm,
      faction: data.faction.toLowerCase(),
      mythicPlusScore: data.mythic_plus_scores.all,
    });
  }, []);

  useEffect(() => {
    async function fetchGuildInfo() {
      console.log("request sent");
      const response = await fetch("http://localhost:3001/guild");
      const data = await response.json();
      console.log(data);
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

const AboutGuild: React.FC = () => {
  const guildInfo = React.useContext(AboutGuildContext);
  console.log("guildinfo", guildInfo);

  return (
    <Card title="О гильдии" style={{ maxWidth: 600 }}>
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
        <Col span={24}>
          <Card>
            <div>Рейтинг в Мифик+:</div>
            <div>{guildInfo.mythicPlusScore}</div>
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

export default React.memo(AboutGuildPage);
