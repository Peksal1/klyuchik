import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Popover } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginPopover = () => {
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (visible) => {
    setVisible(visible);
  };

  const onFinish = async (values) => {
    const { email, password } = values;

    try {
      const response = await axios.post(
        "https://klyuchik-v-durku-backend.herokuapp.com/login",
        { email, password }
      );
      const token = response.data.token;

      // Store token in localStorage
      localStorage.setItem("token", token);

      // Close the popover
      setVisible(false);

      // Reload the page to update the user state
      window.location.reload();
    } catch (error) {
      message.error("Invalid email or password");
    }
  };

  const content = (
    <Form onFinish={onFinish}>
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Button type="link">Forgot password?</Button>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Log in
        </Button>
        <Link to="/register" style={{ color: "#E8BB3D" }}>
          <Button className="register-button">Регистрация</Button>
        </Link>
      </Form.Item>
    </Form>
  );

  return (
    <>
      <Popover
        content={content}
        trigger="click"
        visible={visible}
        onVisibleChange={handleVisibleChange}
      >
        <Button className="login-button" icon={<UserOutlined />}>
          "Вход"
        </Button>
      </Popover>
    </>
  );
};

export default LoginPopover;
