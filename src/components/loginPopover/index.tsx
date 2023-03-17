import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Popover } from "antd";
import React, { useState } from "react";
import { useAuth } from "..authentification/auth.tsx";
import { Link } from "react-router-dom";

const LoginPopover = ({ handleSetUser }) => {
  const { user, login, logout } = useAuth();
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (visible) => {
    setVisible(visible);
  };

  const content = (
    <Form>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Username" />
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
          {user ? user.name : "Вход"}
        </Button>
      </Popover>
    </>
  );
};

export default LoginPopover;
