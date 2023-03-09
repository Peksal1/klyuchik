import React from "react";
import { Card, Row, Col } from "antd";

const BoostingPricesContext = React.createContext<{
  [key: string]: number;
}>({
  // Default values for boosting prices
  mythicPlus: 0,
  raid: 0,
  pvp: 0,
});

interface BoostingPricesProviderProps {
  children: React.ReactNode;
}

const BoostingPricesProvider: React.FC<BoostingPricesProviderProps> = ({
  children,
}) => {
  const boostingPrices = {
    mythicPlus: 100,
    raid: 200,
    pvp: 50,
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
    <Card title="Цены на бустинг" style={{ maxWidth: 600 }}>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card>
            <div>Mythic+</div>
            <div>{prices.mythicPlus} руб.</div>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <div>Рейды</div>
            <div>{prices.raid} руб.</div>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <div>ПвП</div>
            <div>{prices.pvp} руб.</div>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

const BoostingPricesPage: React.FC = () => {
  return (
    <BoostingPricesProvider>
      <BoostingPrices />
    </BoostingPricesProvider>
  );
};

export default BoostingPricesPage;
