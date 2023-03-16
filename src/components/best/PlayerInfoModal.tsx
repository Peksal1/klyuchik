import { Modal, Row, Col, Tooltip, Avatar } from "antd";
import React from "react";
import "./PlayerInfoModal.css";
import { CheckCircleOutlined } from "@ant-design/icons";
import {
  getColorByScore,
  getDungeonRussianName,
  getTreasureFromLevel,
  getDifficultyRussianName,
} from "../../lib/helpers/utils.tsx";
interface PlayerInfoModalProps {
  playerInfoModalVisible: boolean;
  handleClosePlayerModal: () => void;
  playerInfo: {
    name: string;
    thumbnail_url: string;
    raid_progression: {
      [`vault-of-the-incarnates`]: {
        heroic_bosses_killed: number;
        mythic_bosses_killed: number;
        normal_bosses_killed: number;
        summary: string;
        total_bosses: number;
      };
    };
    mythic_plus_scores_by_season: {
      scores: {
        all: string;
      };
    };
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
  function renderRaidProgressCell(raidProgression, cellIndex) {
    const difficulties = ["mythic", "heroic", "normal"];
    const bossKills = difficulties.map(
      (difficulty) =>
        raidProgression["vault-of-the-incarnates"][
          `${difficulty}_bosses_killed`
        ] || 0
    );
    const requiredKills = [2, 4, 6][cellIndex];

    let cellText = "";
    let textColor = "#10fb12";
    let cellColor = "";
    let tooltipContent = "";

    for (let i = 0; i < difficulties.length; i++) {
      const difficulty = difficulties[i];
      const kills = bossKills[i];

      if (kills >= requiredKills) {
        cellText = `${getDifficultyRussianName(difficulty)}`;
        cellColor = "grey";
        tooltipContent = `${getDifficultyRussianName(difficulty)} (${kills})`;
        break;
      }
    }

    if (!cellText) {
      const maxKills = Math.max(...bossKills);
      cellText = `${maxKills}/${requiredKills}`;
      cellColor = "white";
      textColor = "black";
    }

    return (
      <Tooltip
        overlayClassName="mythic-tooltip"
        title={tooltipContent !== "" ? tooltipContent : null}
      >
        <Col
          className="big-square-cell"
          style={{
            backgroundColor: cellColor,
            color: textColor,
            userSelect: "none",
          }}
          key={`cell-${cellIndex}`}
          span={6}
        >
          {cellColor !== "" ? (
            <div
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                padding: 8,
              }}
            >
              {cellColor !== "white" ? (
                <CheckCircleOutlined
                  style={{ color: textColor, fontSize: 20 }}
                />
              ) : null}
            </div>
          ) : null}
          {cellText}
        </Col>
      </Tooltip>
    );
  }

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
          `${getWeeklyTextFromDungeonLevel(highestRuns[3].mythic_level)}\n\n` +
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
          `${getWeeklyTextFromDungeonLevel(highestRuns[7].mythic_level)}\n` +
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
      width="50%"
    >
      <Row gutter={16}>
        <Col span={8}>
          <Row justify="center" align="middle">
            <Col span={24} style={{ textAlign: "center" }}>
              <Avatar
                src={playerInfo.thumbnail_url}
                alt={playerInfo.name}
                style={{ width: "10em", height: "10em", borderRadius: "50%" }}
              />
              <h2 style={{ fontWeight: "bold", marginTop: "1em" }}>
                {playerInfo.name}
              </h2>
              <p
                style={{
                  color: `${getColorByScore(
                    playerInfo.mythic_plus_scores_by_season[0].scores.all
                  )}`,
                }}
              >
                {playerInfo.mythic_plus_scores_by_season[0].scores.all} Рио
              </p>
              {playerInfo.raid_progression["vault-of-the-incarnates"].summary}{" "}
              Опыт в рейде
            </Col>
          </Row>
        </Col>
        <Col span={16}>
          <Row gutter={16}>
            <Col span={6} className="big-square-cell-title">
              Рейды
            </Col>
            {Array.from({ length: 3 }).map((_, index) =>
              renderRaidProgressCell(playerInfo.raid_progression, index)
            )}
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
        </Col>
      </Row>
    </Modal>
  );
};

export default PlayerInfoModal;
