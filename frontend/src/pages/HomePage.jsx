import React from "react";
import CarouselComponent from "../components/CarouselComponent";
import NewsEventsTabs from "../components/NewsAndEventsTab";
import { useNews } from "../context/NewsContex";

const HomePage = () => {
  const { newsData } = useNews();
  return (
    <div>
      <CarouselComponent />
      <NewsEventsTabs newsData={newsData} />
    </div>
  );
};

export default HomePage;
