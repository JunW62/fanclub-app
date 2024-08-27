import React from "react";
import NewsEventsTabs from "../components/NewsAndEventsTab";
import { useNews } from "../context/NewsContex";
import PageHeader from "../components/Banner";
import NewsCarousel from "../components/NewsCarousel";

const NewsAndEventsPage = () => {
  const { newsData } = useNews();

  return (
    <div>
      <PageHeader title="News and Events" />
      <NewsCarousel
        images={[
          "https://r.res.easebar.com/pic/20231220/93f68052-dbc9-411e-a3c8-baf87f606755.jpg",
          "https://r.res.easebar.com/pic/20231220/5548b48c-4c92-4ad4-bb42-c2d9382bcc74.jpg",
          "https://r.res.easebar.com/pic/20231220/c4379986-a6b6-47dd-aedb-83c2418e32b1.jpg",
        ]}
      />
      <NewsEventsTabs newsData={newsData} />
    </div>
  );
};

export default NewsAndEventsPage;
