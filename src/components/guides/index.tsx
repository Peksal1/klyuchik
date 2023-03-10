import React, { useState } from "react";
import { Avatar, Card, Pagination } from "antd";
import "./Guides.css";
// import "antd/dist/antd.css";

interface Guide {
  id: number;
  title: string;
  content: string;
  avatar: string;
}

const guides: Guide[] = [
  {
    id: 1,
    title: "DragonFlight 1 season m+",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    avatar: null,
  },
  {
    id: 2,
    title: "DragonFlight 2 season m+",
    content:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    avatar: null,
  },
  {
    id: 3,
    title: "Guide 3",
    content:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    avatar: null,
  },
  {
    id: 4,
    title: "Guide 4",
    content:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    avatar: null,
  },
  {
    id: 5,
    title: "Guide 5",
    content:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    avatar: null,
  },
  {
    id: 6,
    title: "Guide 6",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    avatar: null,
  },
  {
    id: 7,
    title: "Guide 7",
    content:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    avatar: null,
  },
  {
    id: 8,
    title: "Guide 8",
    content:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    avatar: null,
  },
  {
    id: 9,
    title: "Guide 9",
    content:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    avatar: null,
  },
  {
    id: 10,
    title: "Guide 10",
    content:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    avatar: null,
  },
];

const pageSize = 6;

const GuidesPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const guidesToShow = guides.slice(startIndex, endIndex);

  const cardStyle = {
    width: "300px",
    height: "600px",
    margin: "20px",
    display: "inline-block",
    verticalAlign: "top",
  };

  return (
    <>
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
        total={guides.length}
        pageSize={pageSize}
        current={currentPage}
        onChange={handlePageChange}
      />
    </>
  );
};

export default GuidesPage;
