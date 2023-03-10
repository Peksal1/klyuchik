import React, { useState } from "react";
import { Card, Row, Col, Avatar } from "antd";

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
  const [selectedOption, setSelectedOption] = useState("mythicPlus");
  const prices = React.useContext(BoostingPricesContext);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <Card
      title="Цены на бустинг"
      style={{ width: "100%", marginTop: "20px", height: "inherit" }}
    >
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <div style={{ borderRight: "1px solid #d9d9d9", height: "100%" }}>
            <div
              onClick={() => handleOptionSelect("mythicPlus")}
              style={{
                padding: "12px",
                cursor: "pointer",
                background: selectedOption === "mythicPlus" ? "#f0f2f5" : "",
              }}
            >
              Ключи
            </div>
            <div
              onClick={() => handleOptionSelect("raid")}
              style={{
                padding: "12px",
                cursor: "pointer",
                background: selectedOption === "raid" ? "#f0f2f5" : "",
              }}
            >
              Рейды
            </div>
          </div>
        </Col>
        <Col span={18}>
          {selectedOption === "mythicPlus" && (
            <div>
              <Row gutter={[16, 16]} justify="start">
                <Card style={{ maxWidth: 400 }}>
                  <Avatar size={64} icon={<img src="placeholder" alt="" />} />
                  <div style={{ fontWeight: "bold", marginTop: "12px" }}>
                    Placeholder Title
                  </div>
                  <div style={{ marginTop: "8px" }}>
                    Placeholder Description
                  </div>
                  <div style={{ marginTop: "8px", color: "#1890ff" }}>
                    {prices.mythicPlus}
                  </div>
                </Card>
                <Card style={{ maxWidth: 400 }}>
                  <Avatar size={64} icon={<img src="placeholder" alt="" />} />
                  <div style={{ fontWeight: "bold", marginTop: "12px" }}>
                    Placeholder Title
                  </div>
                  <div style={{ marginTop: "8px" }}>
                    Placeholder Description
                  </div>
                  <div style={{ marginTop: "8px", color: "#1890ff" }}>
                    {prices.mythicPlus}
                  </div>
                </Card>
                <Card style={{ maxWidth: 400 }}>
                  <Avatar size={64} icon={<img src="placeholder" alt="" />} />
                  <div style={{ fontWeight: "bold", marginTop: "12px" }}>
                    Placeholder Title
                  </div>
                  <div style={{ marginTop: "8px" }}>
                    Placeholder Description
                  </div>
                  <div style={{ marginTop: "8px", color: "#1890ff" }}>
                    {prices.mythicPlus}
                  </div>
                </Card>
                <Card style={{ maxWidth: 400 }}>
                  <Avatar size={64} icon={<img src="placeholder" alt="" />} />
                  <div style={{ fontWeight: "bold", marginTop: "12px" }}>
                    Placeholder Title
                  </div>
                  <div style={{ marginTop: "8px" }}>
                    Placeholder Description
                  </div>
                  <div style={{ marginTop: "8px", color: "#1890ff" }}>
                    {prices.mythicPlus}
                  </div>
                </Card>
                <Card style={{ maxWidth: 400 }}>
                  <Avatar size={64} icon={<img src="placeholder" alt="" />} />
                  <div style={{ fontWeight: "bold", marginTop: "12px" }}>
                    Placeholder Title
                  </div>
                  <div style={{ marginTop: "8px" }}>
                    Placeholder Description
                  </div>
                  <div style={{ marginTop: "8px", color: "#1890ff" }}>
                    {prices.mythicPlus}
                  </div>
                </Card>
                <Card style={{ maxWidth: 400 }}>
                  <Avatar size={64} icon={<img src="placeholder" alt="" />} />
                  <div style={{ fontWeight: "bold", marginTop: "12px" }}>
                    Placeholder Title
                  </div>
                  <div style={{ marginTop: "8px" }}>
                    Placeholder Description
                  </div>
                  <div style={{ marginTop: "8px", color: "#1890ff" }}>
                    {prices.mythicPlus}
                  </div>
                </Card>
              </Row>
            </div>
          )}
          {selectedOption === "raid" && (
            <div>
              <Card style={{ maxWidth: 400 }}>
                <Avatar size={64} icon={<img src="placeholder" alt="" />} />
                <div style={{ fontWeight: "bold", marginTop: "12px" }}>
                  Placeholder Title
                </div>
                <div style={{ marginTop: "8px" }}>Placeholder Description</div>
                <div style={{ marginTop: "8px", color: "#1890ff" }}>
                  {prices.raid}
                </div>
              </Card>
            </div>
          )}
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
