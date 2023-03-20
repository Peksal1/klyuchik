import { useEffect, useState } from "react";
import { Card, Spin } from "antd";
import axios from "axios";
import React from "react";

type User = {
  name: string;
  wow_nickname: string;
};

const MyProfilePage = () => {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get<User>(
            "https://klyuchik-v-durku-backend.herokuapp.com/user",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUser(response.data);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUser();
  }, []);

  return (
    <Card title="Моя учетная запись">
      {isLoading ? (
        <Spin />
      ) : (
        <>
          <p>Имя: {user?.name}</p>
          <p>Ник в вов: {user?.wow_nickname}</p>
        </>
      )}
    </Card>
  );
};

export default MyProfilePage;
