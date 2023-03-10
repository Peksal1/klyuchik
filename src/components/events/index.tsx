import React, { useState } from "react";
import { Card, Pagination } from "antd";
import "./EventsPage.css";

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
];

const pageSize = 1;

const EventsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const eventsToShow = events.slice(startIndex, endIndex);

  return (
    <>
      {eventsToShow.map((event: Event) => (
        <Card key={event.id} className="event-card">
          <div className="event-image">
            <img src={event.imageUrl} alt="event" />
          </div>
          <div className="event-details">
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <button>Read further</button>
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
    </>
  );
};

export default EventsPage;
