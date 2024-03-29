import { useEffect, useState } from "react";
import { Button, Card, Spin } from "antd";
import axios from "axios";
import React from "react";
import AddEventPopover from "../admin/AddEventPopover/index.tsx";
import NewGuideCategoryModal from "../guides/NewGuideCategoryModal/index.js";

type User = {
  name: string;
  wow_nickname: string;
  role: string;
};

const MyProfilePage = () => {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const handleAddEventClick = () => {
    // TODO: Implement logic for adding an event
  };

  const handleModalToggle = () => {
    setIsModalVisible((prev) => !prev);
  };

  return (
    <Card title="Моя учетная запись">
      {isLoading ? (
        <Spin />
      ) : (
        <>
          <p>Имя: {user?.name}</p>
          <p>Ник в вов: {user?.wow_nickname}</p>
          {user?.role === "admin" && (
            <>
              {/* Placeholder buttons for admin-only actions */}
              <Button type="primary">Button 2</Button>
              <Button type="primary">Button 3</Button>
              <Button type="primary">Button 4</Button>
              <Button type="primary" onClick={handleModalToggle}>
                Create new guide category
              </Button>
              <AddEventPopover onAddEvent={handleAddEventClick} />
              <NewGuideCategoryModal
                visible={isModalVisible}
                onCancel={handleModalToggle}
              />
            </>
          )}
        </>
      )}
    </Card>
  );
};

export default MyProfilePage;
