import React from "react";
import NewsEventsTabs from "../components/NewsAndEventsTab";
import { useNews } from "../context/NewsContex";
import PageHeader from "../components/Banner";

const NewsAndEventsPage = () => {
  const { newsData } = useNews();

  return (
    <div>
      <PageHeader title="News and Events" />
      <NewsEventsTabs newsData={newsData} />
    </div>
  );
};

export default NewsAndEventsPage;
