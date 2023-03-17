import React, { useCallback, useEffect, useState } from "react";
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
  return (
    <Card
      title={<span style={{ fontSize: 24 }}>О гильдии</span>}
      style={{ maxWidth: 800, margin: "20px auto" }}
    >
      <div style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        Гильдия
        <span style={{ color: "#8c1616", fontFamily: "WarCraft" }}>
          ⭐ Ключик в дурку ⭐
        </span>
        возобновляет игру в World of Warcraft и собирает состав единомышленников
        для максимально позитивного времяпровождения как внутри игры (ключи,
        казуальные рейды), так и вне.
      </div>

      <div style={{ marginBottom: 20 }}>
        Мы хотим восстановить наше былое сообщество людей, которые любят эту
        игру, и хорошо в ней проводить время так же, как и мы. Основная цель
        гильдии - фарм ключей и интересное общение, с казуальным рейдингом в
        рамках небольшого РТ.
      </div>

      <div style={{ fontWeight: "bold", marginBottom: 10 }}>
        Что мы можем предложить?
      </div>

      <ul style={{ marginBottom: 20 }}>
        <li>
          Вы новичок/казуальный игрок? - Постараемся передать свои знания,
          помочь в начинаниях
        </li>
        <li>
          С более опытными игроками - было бы интересно пытаться взять р1
          ключей, со стабильной игрой в обговоренное время
        </li>
        <li>
          Казуальные рейды, 1-2 дня в неделю, пт+суб 20 00 - 23 00 мск. Цель -
          фармить героик и легких боссов мифика мейнами/альтами
        </li>
        <li>
          Открытые логи. записи рейдов/ивентов, котлы, руны, еда, ремонт.
          Атмосфера добра и счастья. Закрываем всем рейдерам ключи.
        </li>
        <li>Совместное выполнение достижений вроде "Слава рейдеру ..."</li>
        <li>Внутриигровая помощь другим игрокам за внутриигровую валюту</li>
      </ul>
      <div style={{ fontWeight: "bold", marginBottom: 10 }}>Наши контакты:</div>
      <div style={{ marginBottom: 10 }}>
        <span style={{ marginRight: 5 }}>Discord (Канал гильдии):</span>
        <a href="https://discord.gg/fjVkeJaKjc">Ключик в дурку</a>
      </div>
      <div style={{ marginBottom: 10 }}>
        <span style={{ marginRight: 5 }}>Discord (Представители):</span>
        <span>Peksal1#0974</span>
      </div>
      <div>
        <span style={{ marginRight: 5 }}>В игре (Представители):</span>
        <span>Хамингодк, Хамингвуд, Бродерман</span>
      </div>
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
