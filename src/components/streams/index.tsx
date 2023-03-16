import { Tabs, Card } from "antd";
import React from "react";

const { TabPane } = Tabs;

const StreamPage = () => {
  return (
    <div style={{ display: "flex", height: "100%", overflow: "hidden" }}>
      <Tabs tabPosition="left" style={{ height: "100%", flex: 1 }}>
        <TabPane tab="Бродерман" key="1" style={{ height: "100%" }}>
          <Card style={{ height: "100%" }}>
            <iframe
              src="https://widgets.sociablekit.com/twitch-live-videos/iframe/124673"
              title="Peksal1"
              width="100%"
              style={{ border: "none" }}
              height="670"
            ></iframe>
            <Card.Meta
              title="Описание канала"
              description="Здесь может быть ваше описание канала."
            />
            <Card.Meta
              title="Случайные клипы Twitch"
              description="Здесь будут случайные клипы Twitch."
            />
          </Card>
        </TabPane>
        <TabPane tab="Peksal1" key="2" style={{ height: "100%" }}>
          <h2>Здесь будет контент для второй вкладки</h2>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default StreamPage;
