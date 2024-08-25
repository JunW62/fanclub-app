import React from "react";
import NewsEventsTabs from "../components/NewsAndEventsTab";
import { useNews } from "../context/NewsContex";

const NewsAndEventsPage = () => {
  const { newsData } = useNews();

  return (
    <div>
      <NewsEventsTabs newsData={newsData} />
    </div>
  );
};

export default NewsAndEventsPage;
