import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Popover } from "antd";
import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

const LoginPopover = () => {
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);

  const onFinish = useCallback(async (values) => {
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

      // Fetch user info and update the state
      const userResponse = await axios.get(
        "https://klyuchik-v-durku-backend.herokuapp.com/user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const user = userResponse.data.user;
      setUser(user);
    } catch (error) {
      message.error("Invalid email or password");
    }
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get(
            "https://klyuchik-v-durku-backend.herokuapp.com/user",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const user = response.data.user;
          setUser(user);
          console.log(user);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchUser();
  }, [onFinish]);

  const handleVisibleChange = (visible) => {
    setVisible(visible);
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
      {user ? (
        <span>{user.name}</span>
      ) : (
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
      )}
    </>
  );
};

export default LoginPopover;
