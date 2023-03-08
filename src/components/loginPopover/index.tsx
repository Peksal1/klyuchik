import React, { useState } from "react";
import { Popover, Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

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
