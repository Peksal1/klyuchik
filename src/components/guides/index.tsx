import React, { useState } from "react";
import { Avatar, Card, Pagination, Input, Select } from "antd";
import "./Guides.css";
// import "antd/dist/antd.css";

interface Guide {
  id: number;
  season: "DragonFlight 1 season" | "DragonFlight 2 season";
  title: string;
  content: string;
  avatar: string | null;
}

const guides: Guide[] = [
  {
    id: 1,
    season: "DragonFlight 1 season",
    title: "DragonFlight 1 season m+",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    avatar: null,
  },
  {
    id: 2,
    season: "DragonFlight 2 season",
    title: "DragonFlight 2 season m+",
    content:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    avatar: null,
  },
  {
    id: 3,
    season: "DragonFlight 1 season",
    title: "Guide 3",
    content:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    avatar: null,
  },
  {
    id: 4,
    season: "DragonFlight 1 season",
    title: "Guide 4",
    content:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    avatar: null,
  },
  {
    id: 5,
    season: "DragonFlight 2 season",
    title: "Guide 5",
    content:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    avatar: null,
  },
  {
    id: 6,
    season: "DragonFlight 2 season",
    title: "Guide 6",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    avatar: null,
  },
  {
    id: 7,
    season: "DragonFlight 2 season",
    title: "Guide 7",
    content:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    avatar: null,
  },
  {
    id: 8,
    season: "DragonFlight 1 season",
    title: "Guide 8",
    content:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    avatar: null,
  },
  {
    id: 9,
    season: "DragonFlight 1 season",
    title: "Guide 9",
    content:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    avatar: null,
  },
  {
    id: 10,
    season: "DragonFlight 2 season",
    title: "Guide 10",
    content:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    avatar: null,
  },
];

const pageSize = 6;

const GuidesPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedSeason, setSelectedSeason] = useState<string>("");

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSeasonSelect = (value: string) => {
    setSelectedSeason(value);
  };

  const filteredGuides = guides.filter(
    (guide) =>
      guide.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedSeason === "" || guide.season === selectedSeason)
  );

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const guidesToShow = filteredGuides.slice(startIndex, endIndex);

  const cardStyle = {
    width: "300px",
    height: "600px",
    margin: "20px",
    display: "inline-block",
    verticalAlign: "top",
  };

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "flex-end", margin: "10px" }}
      >
        <Input.Search
          placeholder="Найти гайд"
          style={{ width: 200, marginRight: "10px" }}
          value={searchTerm}
          onChange={handleSearch}
        />
        <Select
          placeholder="Select season"
          style={{ width: 150 }}
          value={selectedSeason}
          onChange={handleSeasonSelect}
        >
          <Select.Option value="">Все сезоны</Select.Option>
          <Select.Option value="DragonFlight 1 season">
            ДФ 1 сезон
          </Select.Option>
          <Select.Option value="DragonFlight 2 season">
            ДФ 2 сезон
          </Select.Option>
        </Select>
      </div>
      {guidesToShow.map((guide: Guide) => (
        <Card key={guide.id} style={cardStyle}>
          <Avatar
            size={80}
            style={{ display: "block", margin: "0 auto", marginBottom: "10px" }}
            src={guide.avatar}
          />
          <div className="guide-title-style">{guide.title}</div>
          <div className="guide-description-style">{guide.content}</div>
        </Card>
      ))}
      <Pagination
        defaultCurrent={1}
        total={filteredGuides.length}
        pageSize={pageSize}
        current={currentPage}
        onChange={handlePageChange}
      />
    </>
  );
};

export default GuidesPage;
