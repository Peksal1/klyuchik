import { Modal, Row, Col, Tooltip } from "antd";
import React from "react";
import "./PlayerInfoModal.css";
import { CheckCircleOutlined } from "@ant-design/icons";

interface PlayerInfoModalProps {
  playerInfoModalVisible: boolean;
  handleClosePlayerModal: () => void;
  playerInfo: {
    name: string;
    mythic_plus_weekly_highest_level_runs: {
      mythic_level: number;
      dungeon: string;
      short_name: string;
      weekly_period: {
        id: number;
      };
    }[];
  };
}

function getDungeonRussianName(dungeon: string): string {
  switch (dungeon) {
    case "Shadowmoon Burial Grounds":
      return "Некрополь Призрачной Луны";
    case "The Azure Vault":
      return "Лазурное Хранилище  ";
    case "Temple of the Jade Serpent":
      return "Храм Нефритовой Змеи";
    case "Algeth'ar Academy":
      return "Академия Алгет'ар";
    case "Court of Stars":
      return "Квартал Звезд";
    case "Ruby Life Pools":
      return "Рубиновые Омуты Жизни";
    case "The Nokhud Offensive":
      return "Наступление клана Нокхуд";
    case "Halls of Valor":
      return "Чертоги Доблести";
    default:
      return dungeon;
  }
}

function getTreasureFromLevel(level: number): number {
  if (level >= 20) {
    return 421;
  }
  switch (level) {
    case 2:
      return 382;
    case 3:
      return 385;
    case 4:
      return 385;
    case 5:
      return 389;
    case 6:
      return 389;
    case 7:
      return 392;
    case 8:
      return 395;
    case 9:
      return 395;
    case 10:
      return 398;
    case 11:
      return 402;
    case 12:
      return 405;
    case 13:
      return 408;
    case 14:
      return 408;
    case 15:
      return 411;
    case 16:
      return 415;
    case 17:
      return 415;
    case 18:
      return 418;
    case 19:
      return 418;
    default:
      return -1; // or any other value to indicate an invalid level
  }
}

function getWeeklyTextFromDungeonLevel(mythic_level: number): string {
  return `${getTreasureFromLevel(
    mythic_level
  )}-й уровень предметов - эпохальный режим (${mythic_level}-й уровень)`;
}
const PlayerInfoModal: React.FC<PlayerInfoModalProps> = ({
  playerInfoModalVisible,
  handleClosePlayerModal,
  playerInfo,
}) => {
  const renderMythicPlusCell = (
    highestRuns: {
      mythic_level: number;
      weekly_period: { id: number };
      dungeon: string;
    }[],
    cellIndex: number
  ) => {
    let content = "";
    let cellColor = "";
    let tooltipContent = "";

    if (highestRuns.length > 0) {
      const highestRun = highestRuns.reduce((acc, curr) =>
        acc.mythic_level > curr.mythic_level ? acc : curr
      );

      if (cellIndex === 0) {
        content = highestRun.mythic_level.toString();
        cellColor = "grey";
        tooltipContent =
          `${getWeeklyTextFromDungeonLevel(highestRun.mythic_level)}\n\n` +
          getDungeonRussianName(highestRun.dungeon) +
          " " +
          highestRun.mythic_level;
      } else if (highestRuns.length >= 4 && cellIndex === 1) {
        content = highestRuns
          .slice(0, 4)
          .reduce((acc, curr) =>
            acc.mythic_level < curr.mythic_level ? acc : curr
          )
          .mythic_level.toString();
        cellColor = "grey";
        tooltipContent =
          `${getWeeklyTextFromDungeonLevel(highestRuns[4].mythic_level)}\n\n` +
          "Лучшие подземелья:\n\n" +
          highestRuns
            .slice(0, 4)
            .map(
              (run) =>
                getDungeonRussianName(run.dungeon) + " " + run.mythic_level
            )
            .join("\n");
      } else if (highestRuns.length >= 8 && cellIndex === 2) {
        content = highestRuns
          .slice(0, 8)
          .reduce((acc, curr) =>
            acc.mythic_level < curr.mythic_level ? acc : curr
          )
          .mythic_level.toString();
        cellColor = "grey";
        tooltipContent =
          `${getWeeklyTextFromDungeonLevel(highestRuns[8].mythic_level)}\n` +
          "Лучшие подземелья:\n\n" +
          highestRuns
            .slice(0, 8)
            .map(
              (run) =>
                getDungeonRussianName(run.dungeon) + " " + run.mythic_level
            )
            .join("\n");
      } else {
        content = `${highestRuns.length}/${cellIndex === 1 ? "4" : "8"}`;
      }
    } else {
      content = `0/${cellIndex === 0 ? "1" : cellIndex === 1 ? "4" : "8"}`;
    }

    const isWeeklyComplete =
      highestRuns.length >= (cellIndex === 0 ? 1 : cellIndex === 1 ? 4 : 8);

    return (
      <Tooltip overlayClassName="mythic-tooltip" title={tooltipContent}>
        <Col
          className="big-square-cell"
          style={{
            backgroundColor: cellColor,
            color: isWeeklyComplete ? "#10fb12" : "black",
            userSelect: "none",
          }}
          key={`cell-${cellIndex}`}
          span={6}
        >
          {isWeeklyComplete ? (
            <div
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                padding: 8,
              }}
            >
              <CheckCircleOutlined style={{ color: "#10fb12", fontSize: 20 }} />
            </div>
          ) : null}
          {content} {isWeeklyComplete && " (M+)"}
          <div
            style={{
              position: "absolute",
              bottom: "0",
              left: "0",
              padding: 8,
            }}
          >
            {isWeeklyComplete
              ? getTreasureFromLevel(
                  highestRuns[cellIndex === 0 ? 0 : cellIndex === 1 ? 3 : 7]
                    .mythic_level
                )
              : null}
          </div>
        </Col>
      </Tooltip>
    );
  };

  return (
    <Modal
      title={`${playerInfo.name}`}
      open={playerInfoModalVisible}
      onCancel={handleClosePlayerModal}
      footer={null}
    >
      <Row gutter={16}>
        <Col span={6} className="big-square-cell-title">
          Рейды
        </Col>
        <Col span={6} className="big-square-cell">
          WIP
        </Col>
        <Col span={6} className="big-square-cell">
          WIP
        </Col>
        <Col span={6} className="big-square-cell">
          WIP
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={6} className="big-square-cell-title">
          Мифик+
        </Col>
        {Array.from({ length: 3 }).map((_, index) =>
          renderMythicPlusCell(
            playerInfo.mythic_plus_weekly_highest_level_runs,
            index
          )
        )}
      </Row>
      <Row gutter={16}>
        <Col span={6} className="big-square-cell-title">
          PvP
        </Col>
        <Col span={6} className="big-square-cell">
          WIP
        </Col>
        <Col span={6} className="big-square-cell">
          WIP
        </Col>
        <Col span={6} className="big-square-cell">
          WIP
        </Col>
      </Row>
    </Modal>
  );
};

export default PlayerInfoModal;
