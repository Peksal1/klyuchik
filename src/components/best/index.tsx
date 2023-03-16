import {
  Avatar,
  Button,
  Card,
  Input,
  List,
  Pagination,
  Select,
  Spin,
} from "antd";
import React, { useCallback, useEffect, useState } from "react";
import PlayerInfoModal from "./PlayerInfoModal.tsx";
interface GuildMember {
  character: {
    name: string;
    class: string;
    active_spec_name: string;
    profile_url: string;
    achievement_points: number;
  };
  rank: number;
}

const { Option } = Select;

const PAGE_SIZE = 40;

const GuildMembers: React.FC = () => {
  const [members, setMembers] = useState<GuildMember[]>([]);
  const [page, setPage] = useState<number>(1);
  const [classFilter, setClassFilter] = useState<string>("");
  const [playerInfoModalVisible, setPlayerModalVisible] = useState(false);
  const [playerInfo, setPlayerInfo] = useState(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isPageLoading, setIsPageLoading] = useState(true);
  useEffect(() => {
    async function fetchGuildMembers() {
      const response = await fetch(
        "https://klyuchik-v-durku-backend.herokuapp.com/guild-members"
      );
      const data = await response.json();
      setMembers(data as GuildMember[]);
      setIsPageLoading(false);
    }

    fetchGuildMembers();
  }, []);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const filteredMembers = members.filter((member) =>
    member.character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const classFilteredMembers = classFilter
    ? filteredMembers.filter((member) => member.character.class === classFilter)
    : filteredMembers;
  const sortedMembers = classFilteredMembers.sort((a, b) => a.rank - b.rank);
  const displayedMembers = sortedMembers.slice(startIndex, endIndex);
  const groupedMembers = displayedMembers.reduce((acc, member) => {
    if (!acc[member.rank]) {
      acc[member.rank] = [];
    }
    acc[member.rank].push(member);
    return acc;
  }, {});

  function getRankName(rank: string): string {
    switch (rank) {
      case "0":
        return "ГМ";
      case "1":
        return "Зам ГМ";
      case "2":
        return "Альт Офицера";
      case "3":
        return "Резчик Лука";
      case "4":
        return "Статик";
      case "5":
        return "Завсегдатай";
      case "6":
        return "Стас";
      case "7":
        return "Местный";
      case "8":
        return "Альт";
      case "9":
        return "Посетитель";
      default:
        return "";
    }
  }
  const handleSetClassFilter = useCallback((value) => {
    setClassFilter(value);
    setPage(1);
  }, []);

  const handleSetSearchValue = useCallback((value) => {
    setSearchTerm(value);
    setPage(1);
  }, []);

  function getClassColor(className: string): string {
    switch (className) {
      case "Warrior":
        return "#C79C6E";
      case "Monk":
        return "#00FF98";
      case "Evoker":
        return "#33937F";
      case "Demon Hunter":
        return "#A330C9";
      case "Death Knight":
        return "#C41E3A";
      case "Paladin":
        return "#F58CBA";
      case "Hunter":
        return "#ABD473";
      case "Rogue":
        return "#FFF569";
      case "Priest":
        return "#FFFFFF";
      case "Shaman":
        return "#0070DE";
      case "Mage":
        return "#40C7EB";
      case "Warlock":
        return "#8787ED";
      case "Druid":
        return "#FF7D0A";
      default:
        return "#FFFFFF";
    }
  }

  const handleOpenPlayerModal = useCallback((name) => {
    setPlayerModalVisible(true);
    async function fetchPlayerWeeklyInfo() {
      const response = await fetch(
        `https://klyuchik-v-durku-backend.herokuapp.com/guild-members/weekly-keys/${name}`
      );
      const data = await response.json();
      setPlayerInfo(data);
      setIsPageLoading(false);
    }

    fetchPlayerWeeklyInfo();
  }, []);

  const handleClosePlayerModal = useCallback(() => {
    setPlayerModalVisible(false);
    setPlayerInfo(null);
  }, []);

  return isPageLoading ? (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Spin size="large" />
    </div>
  ) : (
    <>
      {playerInfo && (
        <PlayerInfoModal
          playerInfoModalVisible={playerInfoModalVisible}
          handleClosePlayerModal={handleClosePlayerModal}
          playerInfo={playerInfo}
        />
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 16,
        }}
      >
        <Input.Search
          placeholder="Поиск по имени персонажа"
          onChange={(e) => handleSetSearchValue(e.target.value)}
          style={{ width: 300, marginTop: 20 }}
        />
        <Select
          defaultValue=""
          style={{ marginLeft: 16, width: 200, marginTop: 20, marginRight: 20 }}
          onChange={(value) => handleSetClassFilter(value)}
        >
          <Option value="">Все классы</Option>
          <Option value="Warrior">Воин</Option>
          <Option value="Paladin">Паладин</Option>
          <Option value="Hunter">Охотник</Option>
          <Option value="Rogue">Разбойник</Option>
          <Option value="Priest">Жрец</Option>
          <Option value="Shaman">Шаман</Option>
          <Option value="Mage">Маг</Option>
          <Option value="Warlock">Чернокнижник</Option>
          <Option value="Druid">Друид</Option>
        </Select>
      </div>
      {Object.entries(groupedMembers as [GuildMember[]]).map(
        ([rank, members]) => (
          <div key={`rank-${rank}`}>
            <h2 style={{ marginLeft: 20 }}> {getRankName(rank)}</h2>
            <List
              style={{ marginRight: 20, marginLeft: 20 }}
              grid={{ gutter: 16, column: 4 }}
              dataSource={members.filter((member) => {
                const nameMatch = member.character.name
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase());
                const classMatch = classFilter
                  ? member.character.class === classFilter
                  : true;
                return nameMatch && classMatch;
              })}
              renderItem={(member) => (
                <List.Item>
                  <Card
                    cover={
                      <Avatar
                        shape="circle"
                        src={`/spec/${member.character.class}/${member.character.active_spec_name}.png`}
                        size={64}
                        style={{
                          marginTop: 20,
                          marginLeft: 20,
                        }}
                      />
                    }
                  >
                    <Card.Meta
                      title={
                        <a
                          style={{
                            color:
                              member.character.class !== "Priest"
                                ? getClassColor(member.character.class)
                                : "black",
                          }}
                          href={member.character.profile_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {member.character.name}
                        </a>
                      }
                      description={`${member.character.active_spec_name} ${member.character.class}`}
                    />{" "}
                    <Card.Meta
                      style={{ marginTop: 5 }}
                      description={`${member.character.achievement_points} Очков достижений`}
                    />
                    <br />
                    <Button
                      style={{ alignContent: "flex-end", display: "flex" }}
                      onClick={() =>
                        handleOpenPlayerModal(member.character.name)
                      }
                    >
                      Подробнее
                    </Button>
                  </Card>
                </List.Item>
              )}
            />
          </div>
        )
      )}
      <Pagination
        current={page}
        pageSize={PAGE_SIZE}
        total={members.length}
        onChange={handlePageChange}
        style={{
          marginTop: 20,
          marginBottom: 55,
          marginRight: 20,
          textAlign: "center",
          display: "flex",
          justifyContent: "flex-end",
        }}
      />
    </>
  );
};

export default GuildMembers;
