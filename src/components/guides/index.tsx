import { Card, Input, Pagination, Select } from "antd";
import React, { useEffect, useState } from "react";
import "./Guides.css";

interface Guide {
  id: number;
  season: "DragonFlight 1 season" | "DragonFlight 2 season";
  title: string;
  content: string;
  avatar: string | null;
}

interface GuideImage {
  id: number;
  url: string;
  GuideCategoryId: number;
}

interface GuideCategory {
  id: number;
  name: string;
  description: string;
  tag: string;
  guides: Guide[];
  images: GuideImage[];
}

const pageSize = 6;

const GuidesPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedSeason, setSelectedSeason] = useState<string>("");
  const [guideCategories, setGuideCategories] = useState<GuideCategory[]>([]);

  useEffect(() => {
    fetch("/guide-categories")
      .then((response) => response.json())
      .then((data) => setGuideCategories(data))
      .catch((error) => console.error(error));
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSeasonSelect = (value: string) => {
    setSelectedSeason(value);
  };

  // const filteredGuides = guideCategories.flatMap((category) =>
  //   category.guides.filter(
  //     (guide) =>
  //       guide.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
  //       (selectedSeason === "" || guide.season === selectedSeason)
  //   )
  // );

  // const startIndex = (currentPage - 1) * pageSize;
  // const endIndex = startIndex + pageSize;

  // const guidesToShow = filteredGuides.slice(startIndex, endIndex);

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
      {guideCategories.map((category: GuideCategory) => (
        <div key={category.id}>
          <div className="category-title-style">{category.name}</div>
          <div className="category-description-style">
            {category.description}
          </div>
          {category.guides.map((guide: Guide) => (
            <Card key={guide.id} style={cardStyle}>
              {/* {guide.images.length > 0 && (
                <Avatar
                  size={80}
                  style={{ display: "block", margin: "0 auto", marginBottom: "10px" }}
                  src={guide.images[0].url}
                />
              )} */}
              <div className="guide-title-style">{guide.title}</div>
              <div className="guide-description-style">{guide.content}</div>
            </Card>
          ))}
        </div>
      ))}
      <Pagination
        defaultCurrent={1}
        pageSize={pageSize}
        current={currentPage}
        onChange={handlePageChange}
      />
    </>
  );
};
export default GuidesPage;
