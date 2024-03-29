import { LockOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, Form, Input, Menu, message, Popover } from "antd";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";

const LoginPopover = () => {
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState<{
    name: string;
    wow_nickname: string;
  } | null>(null);

  const handleLogout = useCallback(async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "https://klyuchik-v-durku-backend.herokuapp.com/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.removeItem("token");
      setUser(null); // set user state to null
    } catch (error) {
      console.log(error);
    }
  }, []);

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
          const response = await fetch(
            "https://klyuchik-v-durku-backend.herokuapp.com/user",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const userData = await response.json();
          setUser(userData);
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
        rules={[{ required: true, message: "Введите адрес своей почты!" }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Эл. Почта" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Введите свой пароль!" }]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          type="password"
          placeholder="Пароль"
        />
      </Form.Item>
      <Form.Item>
        <Button type="link">Забыли пароль?</Button>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Войти
        </Button>
        <Link to="/register" style={{ color: "#E8BB3D" }}>
          <Button className="register-button">Регистрация</Button>
        </Link>
      </Form.Item>
    </Form>
  );

  const authMenu = (
    <Menu>
      <Menu.Item key="profile">
        <Link to="/profile" style={{ color: "#E8BB3D" }}>
          Мой профиль
        </Link>
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        <LogoutOutlined /> Выйти
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      {!user ? (
        <>
          <Popover
            content={content}
            trigger="click"
            open={visible}
            onOpenChange={handleVisibleChange}
          >
            <Button className="login-button" icon={<UserOutlined />}>
              Вход
            </Button>
          </Popover>
          {/* <Button className="login-button" icon={<UserOutlined />}>
            <a href="https://klyuchik-v-durku-backend.herokuapp.com/auth/bnet">
              Вход с помощью Battle.net
            </a>
          </Button> */}
        </>
      ) : (
        <Dropdown overlay={authMenu}>
          <span style={{ color: "white" }}>
            {user.wow_nickname + ` (${user.name})`}
          </span>
        </Dropdown>
      )}
    </>
  );
};

export default LoginPopover;
