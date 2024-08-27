import React, { useState } from "react";
import "../styles/NewsAndEventsTab.css";
const NewsEventsTabs = ({ newsData }) => {
  const [activeTab, setActiveTab] = useState("Latest");

  const renderContent = () => {
    switch (activeTab) {
      case "Latest":
        return newsData.latest.map((item, index) => (
          <div key={index} className="news-item">
            <p className="news-title">{item.title}</p>
            <p className="news-date">{item.date}</p>
          </div>
        ));
      case "News":
        return newsData.news.map((item, index) => (
          <div key={index} className="news-item">
            <p className="news-title">{item.title}</p>
            <p className="news-date">{item.date}</p>
          </div>
        ));
      case "Announcements":
        return newsData.announcements.map((item, index) => (
          <div key={index} className="news-item">
            <p className="news-title">{item.title}</p>
            <p className="news-date">{item.date}</p>
          </div>
        ));
      case "Events":
        return newsData.events.map((item, index) => (
          <div key={index} className="news-item">
            <p className="news-title">{item.title}</p>
            <p className="news-date">{item.date}</p>
          </div>
        ));
      default:
        return null;
    }
  };

  return (
    <div className="news-events-tabs">
      <div className="tabs-header">
        <span
          className={activeTab === "Latest" ? "active" : ""}
          onClick={() => setActiveTab("Latest")}
        >
          Latest
        </span>
        <span
          className={activeTab === "News" ? "active" : ""}
          onClick={() => setActiveTab("News")}
        >
          News
        </span>
        <span
          className={activeTab === "Announcements" ? "active" : ""}
          onClick={() => setActiveTab("Announcements")}
        >
          Announcements
        </span>
        <span
          className={activeTab === "Events" ? "active" : ""}
          onClick={() => setActiveTab("Events")}
        >
          Events
        </span>
      </div>

      <div className="news-content">{renderContent()}</div>
    </div>
  );
};

export default NewsEventsTabs;
