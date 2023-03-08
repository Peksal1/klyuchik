import React, { useContext, useCallback, useEffect, useState } from "react";
import { Card, Row, Col } from "antd";

const AboutGuildContext = React.createContext<{
  name: string;
  server: string;
  faction: string;
}>({
  name: "",
  server: "",
  faction: "",
});

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

const AboutGuild: React.FC = () => {
  const guildInfo = useContext(AboutGuildContext);
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
