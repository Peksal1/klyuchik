import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, notification } from "antd";
import { GuildMember } from "../best";
import { useHistory } from "react-router-dom";

const RegistrationPage: React.FC = () => {
  const [form] = Form.useForm();
  const [members, setMembers] = useState<GuildMember[]>([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [search, setSearch] = useState("");
  const { Option } = Select;

  useEffect(() => {
    async function fetchGuildMembers() {
      const response = await fetch(
        "https://klyuchik-v-durku-backend.herokuapp.com/guild-members"
      );
      const data = await response.json();
      setMembers(data as GuildMember[]);
    }

    fetchGuildMembers();
  }, []);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    console.log(values);
    try {
      const response = await fetch(
        "https://klyuchik-v-durku-backend.herokuapp.com/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            password: values.password,
            role: "user", // set a default value for the role
            wow_nickname: values.wow_nickname, // include the wow_nickname field
          }),
        }
      );
      const data = await response.json();
      console.log(data); // replace with actual success/failure logic
      notification.success({
        message: "Registration successful",
        description: "You can now log in to your account",
      });
      history.push("/");
    } catch (error) {
      console.error(error); // replace with actual error handling
      notification.error({
        message: "Registration failed",
        description: "Please try again later",
      });
    }
    setLoading(false);
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: "Please enter your name" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: "Please enter your email" },
          { type: "email", message: "Please enter a valid email" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          { required: true, message: "Please enter a password" },
          { min: 6, message: "Password must be at least 6 characters long" },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="wow_nickname"
        label="WoW Nickname"
        rules={[{ required: true, message: "Please select your WoW nickname" }]}
      >
        <Input.Search
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for a member..."
        />
        <Select>
          {members
            .filter((member) =>
              member.character.name.toLowerCase().includes(search.toLowerCase())
            )
            .sort((a, b) => a.character.name.localeCompare(b.character.name))
            .map((member) => (
              <Option value={member.character.name} key={member.character.name}>
                {member.character.name}
              </Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationPage;
