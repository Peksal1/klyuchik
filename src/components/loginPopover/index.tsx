import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Popover } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginPopover = () => {
  const [visible, setVisible] = useState(false);

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const handleVisibleChange = (visible) => {
    setVisible(visible);
  };

  const content = (
    <Form onFinish={onFinish}>
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
    <Popover
      content={content}
      trigger="click"
      visible={visible}
      onVisibleChange={handleVisibleChange}
    >
      <Button className="login-button" icon={<UserOutlined />}>
        Вход
      </Button>
    </Popover>
  );
};

export default LoginPopover;
