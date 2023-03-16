import React, { useState } from "react";
import { Form, Input, Button } from "antd";

const RegistrationPage: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

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
    } catch (error) {
      console.error(error); // replace with actual error handling
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
        rules={[{ required: true, message: "Please enter your WoW nickname" }]}
      >
        <Input />
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
