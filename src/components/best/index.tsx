import React, { useEffect, useState } from "react";
import { List } from "antd";

interface GuildMember {
  character: {
    name: string;
    class: string;
    level: number;
  };
}

const GuildMembers: React.FC = () => {
  const [members, setMembers] = useState<GuildMember[]>([]);

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
  console.log(members);
  return (
    <List
      header={<div>Состав гильдии</div>}
      bordered
      dataSource={members}
      renderItem={(member) => (
        <List.Item>
          {member.character.name} ({member.character.class}{" "}
          {member.character.level})
        </List.Item>
      )}
    />
  );
};

export default GuildMembers;
