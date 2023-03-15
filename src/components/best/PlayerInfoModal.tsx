import { Modal, Row, Col } from "antd";
import React from "react";

interface PlayerInfoModalProps {
  playerInfoModalVisible: boolean;
  handleClosePlayerModal: () => void;
  playerInfo: {
    mythic_plus_weekly_highest_level_runs: {
      mythic_level: number;
      weekly_period: {
        id: number;
      };
    }[];
  };
}

const PlayerInfoModal: React.FC<PlayerInfoModalProps> = ({
  playerInfoModalVisible,
  handleClosePlayerModal,
  playerInfo,
}) => {
  const renderMythicPlusCell = (
    highestRuns: { mythic_level: number; weekly_period: { id: number } }[],
    cellIndex: number
  ) => {
    let content = "";
    let cellColor = "";

    if (highestRuns.length > 0) {
      const highestRun = highestRuns.reduce((acc, curr) =>
        acc.mythic_level > curr.mythic_level ? acc : curr
      );

      if (cellIndex === 0) {
        content = highestRun.mythic_level.toString();
        cellColor = "green";
      } else if (highestRuns.length >= 4 && cellIndex === 1) {
        content = highestRuns
          .slice(0, 4)
          .reduce((acc, curr) =>
            acc.mythic_level < curr.mythic_level ? acc : curr
          )
          .mythic_level.toString();
        cellColor = "green";
      } else if (highestRuns.length >= 8 && cellIndex === 2) {
        content = highestRuns
          .slice(0, 8)
          .reduce((acc, curr) =>
            acc.mythic_level < curr.mythic_level ? acc : curr
          )
          .mythic_level.toString();
        cellColor = "green";
      } else {
        content = `${playerInfo.mythic_plus_weekly_highest_level_runs.length}/${
          cellIndex === 1 ? "4" : "8"
        }`;
      }
    } else {
      content = `0/0`;
    }

    return (
      <Col key={`cell-${cellIndex}`} span={6}>
        <div style={{ backgroundColor: cellColor }}>{content}</div>
      </Col>
    );
  };

  return (
    <Modal
      title="Player Info"
      open={playerInfoModalVisible}
      onCancel={handleClosePlayerModal}
      footer={null}
    >
      <Row gutter={16}>
        <Col span={6}>Raid</Col>
        <Col span={6}>WIP</Col>
        <Col span={6}>WIP</Col>
        <Col span={6}>WIP</Col>
      </Row>
      <Row gutter={16}>
        <Col span={6}>Mythic+</Col>
        {Array.from({ length: 3 }).map((_, index) =>
          renderMythicPlusCell(
            playerInfo.mythic_plus_weekly_highest_level_runs,
            index
          )
        )}
      </Row>
      <Row gutter={16}>
        <Col span={6}>PvP</Col>
        <Col span={6}>WIP</Col>
        <Col span={6}>WIP</Col>
        <Col span={6}>WIP</Col>
      </Row>
    </Modal>
  );
};

export default PlayerInfoModal;
