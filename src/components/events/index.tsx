import React, { useState } from "react";
import { Button, Card, Input, Pagination } from "antd";
import { Layout } from "antd";
import "./EventsPage.css";

const { Content, Sider } = Layout;

interface Event {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

const events: Event[] = [
  {
    id: 1,
    title: "New event!",
    description: "This is a short description of the new event.",
    imageUrl:
      "https://images.unsplash.com/photo-1509228345486-86d7ef22b2a9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZGFuY2VycHJvamVjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 2,
    title: "New event!",
    description: "This is a short description of the new event.",
    imageUrl:
      "https://images.unsplash.com/photo-1509228345486-86d7ef22b2a9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZGFuY2VycHJvamVjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    title: "New event!",
    description: "This is a short description of the new event.",
    imageUrl:
      "https://images.unsplash.com/photo-1509228345486-86d7ef22b2a9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZGFuY2VycHJvamVjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    title: "New event!",
    description: "This is a short description of the new event.",
    imageUrl:
      "https://images.unsplash.com/photo-1509228345486-86d7ef22b2a9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZGFuY2VycHJvamVjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 5,
    title: "New event!",
    description: "This is a short description of the new event.",
    imageUrl:
      "https://images.unsplash.com/photo-1509228345486-86d7ef22b2a9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZGFuY2VycHJvamVjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 6,
    title: "New event!",
    description: "This is a short description of the new event.",
    imageUrl:
      "https://images.unsplash.com/photo-1509228345486-86d7ef22b2a9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZGFuY2VycHJvamVjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 7,
    title: "New event!",
    description: "This is a short description of the new event.",
    imageUrl:
      "https://images.unsplash.com/photo-1509228345486-86d7ef22b2a9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZGFuY2VycHJvamVjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 8,
    title: "New event!",
    description: "This is a short description of the new event.",
    imageUrl:
      "https://images.unsplash.com/photo-1509228345486-86d7ef22b2a9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZGFuY2VycHJvamVjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 9,
    title: "New event!",
    description: "This is a short description of the new event.",
    imageUrl:
      "https://images.unsplash.com/photo-1509228345486-86d7ef22b2a9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZGFuY2VycHJvamVjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 10,
    title: "New event!",
    description: "This is a short description of the new event.",
    imageUrl:
      "https://images.unsplash.com/photo-1509228345486-86d7ef22b2a9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZGFuY2VycHJvamVjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 11,
    title: "New event!",
    description: "This is a short description of the new event.",
    imageUrl:
      "https://images.unsplash.com/photo-1509228345486-86d7ef22b2a9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZGFuY2VycHJvamVjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 12,
    title: "New event!",
    description: "This is a short description of the new event.",
    imageUrl:
      "https://images.unsplash.com/photo-1509228345486-86d7ef22b2a9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZGFuY2VycHJvamVjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 13,
    title: "New event!",
    description: "This is a short description of the new event.",
    imageUrl:
      "https://images.unsplash.com/photo-1509228345486-86d7ef22b2a9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZGFuY2VycHJvamVjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  },
];

const pageSize = 10;

const EventsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const eventsToShow = events.slice(startIndex, endIndex);

  return (
    <Layout>
      <Content>
        <div className="events-container">
          <div className="events-list">
            {eventsToShow.map((event: Event) => (
              <Card key={event.id} className="event-card">
                <div className="event-image">
                  <img src={event.imageUrl} alt="event" />
                </div>
                <div className="event-details">
                  <h2>{event.title}</h2>
                  <p>{event.description}</p>
                  <Button>Read further</Button>
                </div>
              </Card>
            ))}
            <Pagination
              defaultCurrent={1}
              total={events.length}
              pageSize={pageSize}
              current={currentPage}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </Content>
      <Sider width={300} style={{ background: "white", marginTop: "20px" }}>
        <div className="sidebar">
          <h2>Sidebar</h2>
          <Input
            style={{ width: "70%", marginBottom: "20px" }}
            type="text"
            placeholder="Search"
          />
          <div className="tags">
            <Button>All</Button>
            <Button>Tag 1</Button>
            <Button>Tag 2</Button>
            <Button>Tag 3</Button>
          </div>
        </div>
      </Sider>
    </Layout>
  );
};

export default EventsPage;
