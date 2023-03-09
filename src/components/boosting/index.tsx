import React from "react";
import { Card, Row, Col, Layout } from "antd";
import {
  KeyOutlined,
  FundOutlined,
  TrophyOutlined,
  GiftOutlined,
  RocketOutlined,
} from "@ant-design/icons";

const { Sider, Content } = Layout;

const BoostingPricesContext = React.createContext<{
  [key: string]: number;
}>({
  // Default values for boosting prices
  keys: 0,
  raid: 0,
  pvp: 0,
  achievements: 0,
  mounts: 0,
});

interface BoostingPricesProviderProps {
  children: React.ReactNode;
}

const BoostingPricesProvider: React.FC<BoostingPricesProviderProps> = ({
  children,
}) => {
  const boostingPrices = {
    keys: 50,
    raid: 100,
    pvp: 30,
    achievements: 20,
    mounts: 200,
  };

  return (
    <BoostingPricesContext.Provider value={boostingPrices}>
      {children}
    </BoostingPricesContext.Provider>
  );
};

const BoostingPrices: React.FC = () => {
  const prices = React.useContext(BoostingPricesContext);

  return (
    <Content style={{ maxWidth: 600 }}>
      <Card title="Цены на бустинг">
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card>
              <div>Mythic+</div>
              <div>{prices.keys} золота</div>
            </Card>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card>
              <div>Рейды</div>
              <div>{prices.raid} золота</div>
            </Card>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card>
              <div>ПвП</div>
              <div>{prices.pvp} золота</div>
            </Card>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card>
              <div>Ачивы</div>
              <div>{prices.achievements} золота</div>
            </Card>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card>
              <div>Маунты</div>
              <div>{prices.mounts} золота</div>
            </Card>
          </Col>
        </Row>
      </Card>
    </Content>
  );
};

const BoostingPricesPage: React.FC = () => {
  return (
    <BoostingPricesProvider>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider>
          <Card title="Категории">
            <div>
              <KeyOutlined /> Ключи
            </div>
            <div>
              <FundOutlined /> Рейд
            </div>
            <div>
              <TrophyOutlined /> ПвП
            </div>
            <div>
              <GiftOutlined /> Ачивы
            </div>
            <div>
              <RocketOutlined /> Маунты
            </div>
          </Card>
        </Sider>
        <Layout>
          <BoostingPrices />
        </Layout>
      </Layout>
    </BoostingPricesProvider>
  );
};

export default BoostingPricesPage;
