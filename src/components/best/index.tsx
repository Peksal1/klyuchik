import React, { useEffect, useState } from "react";
import { List, Card, Avatar, Pagination } from "antd";

interface GuildMember {
  character: {
    name: string;
    class: string;
    active_spec_name: string;
  };
}

const PAGE_SIZE = 12;

const GuildMembers: React.FC = () => {
  const [members, setMembers] = useState<GuildMember[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    async function fetchGuildMembers() {
      const response = await fetch(
        "https://klyuchik-v-durku-backend.herokuapp.com/guild-members"
      );
      const data = await response.json();
      setMembers(data);
    }

    fetchGuildMembers();
  }, []);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const displayedMembers = members.slice(startIndex, endIndex);

  return (
    <>
      <List
        grid={{ gutter: 16, column: 4 }}
        header={<div>Состав гильдии</div>}
        dataSource={displayedMembers}
        renderItem={(member) => (
          <List.Item>
            <Card
              cover={
                <Avatar
                  shape="circle"
                  size={64}
                  style={{ backgroundColor: "#87d068" }}
                />
              }
            >
              <Card.Meta
                title={member.character.name}
                description={`${member.character.active_spec_name} ${member.character.class}`}
              />
            </Card>
          </List.Item>
        )}
      />
      <Pagination
        current={page}
        pageSize={PAGE_SIZE}
        total={members.length}
        onChange={handlePageChange}
        style={{ marginTop: 16, textAlign: "center" }}
      />
    </>
  );
};

export default GuildMembers;
