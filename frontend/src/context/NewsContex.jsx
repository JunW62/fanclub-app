import React, { createContext, useContext, useState } from "react";

const NewsContext = createContext();

export const useNews = () => {
  return useContext(NewsContext);
};

export const NewsProvider = ({ children }) => {
  const newsData = {
    latest: [
      { title: "Notice on 08/22", date: "2024-08-21" },
      { title: "Notice on 08/15", date: "2024-08-14" },
      { title: "Notice on 08/08", date: "2024-08-05" },
      { title: "Notice on 08/01", date: "2024-07-30" },
      { title: "Notice on 07/25", date: "2024-07-23" },
    ],
    news: [
      {
        title: "St. Shelter Princess Day will begin on 11/16",
        date: "2023-11-25",
      },
      {
        title: "The Lovebrush Chronicles Open Beta Test on 10/20",
        date: "2023-10-19",
      },
      {
        title: "Test Conclusion Notice",
        date: "2023-08-23",
      },
      {
        title: "Lovebrush Chronicles Pre-order Now",
        date: "2023-08-23",
      },
      {
        title: "Lovebrush Chronicles Closed Beta Test Announcement",
        date: "2023-08-04",
      },
    ],
    announcements: [
      { title: "Notice on 08/22", date: "2024-08-21" },
      { title: "Notice on 08/15", date: "2024-08-14" },
      { title: "Notice on 08/08", date: "2024-08-05" },
      { title: "Notice on 08/01", date: "2024-07-30" },
      { title: "Notice on 07/25", date: "2024-07-23" },
    ],
    events: [
      { title: "Lovebrush Chronicles Pre-order Now", date: "2023-08-23" },
      { title: "Closed Beta Test", date: "2023-08-04" },
    ],
  };

  return (
    <NewsContext.Provider value={{ newsData }}>{children}</NewsContext.Provider>
  );
};
