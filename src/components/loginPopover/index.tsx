import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Popover } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginPopover = ({ handleSetUser }) => {
  const [visible, setVisible] = useState(false);
  // const [user, setUser] = useState(null);

  const handleVisibleChange = (visible) => {
    setVisible(visible);
  };
  // const onFinish = async (values) => {
  //   try {
  //     const response = await fetch(
  //       "https://klyuchik-v-durku-backend.herokuapp.com/login",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           email: values.username,
  //           password: values.password,
  //         }),
  //       }
  //     );

  //     const data = await response.json();
  //     const token = data.token;

  //     // Save the token to local storage
  //     localStorage.setItem("token", token);

  //     // Get the current logged in user
  //     const userResponse = await fetch(
  //       "https://klyuchik-v-durku-backend.herokuapp.com/user",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     const userData = await userResponse.json();
  //     const user = {
  //       id: userData.id,
  //       name: userData.name,
  //       email: userData.email,
  //       role: userData.role,
  //     };

  //     handleSetUser(user);
  //     setUser(user);
  //     setVisible(false);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   async function fetchCurrentUser() {
  //     const token = localStorage.getItem("token");

  //     if (!token) {
  //       return;
  //     }

  //     try {
  //       const response = await fetch(
  //         "https://klyuchik-v-durku-backend.herokuapp.com/user",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );

  //       const data = await response.json();
  //       const user = {
  //         id: data.id,
  //         name: data.name,
  //         email: data.email,
  //         role: data.role,
  //       };

  //       handleSetUser(user);
  //       setUser(user);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  //   fetchCurrentUser();
  // }, [handleSetUser]);

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
          Вход
        </Button>
      </Popover>
    </>
  );
};

export default LoginPopover;
