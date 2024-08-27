import React from "react";
import CarouselComponent from "../components/CarouselComponent";
import NewsEventsTabs from "../components/NewsAndEventsTab";
import { useNews } from "../context/NewsContex";
import Carousel from "../components/CarouselComponent";

const slides = [
  {
    header: "Real World",
    title: "Cael (Emerald)",
    info: "Age: 25\nHeight: 182 cm\nIdentity: Your Guardian",
    contentTitle: `"I admire its will to live and thrive."`,
    backgroundImage:
      "https://www.lovebrushchronicles.com/pc/gw/20230717183009/img/role2_f5f43e1.png",
  },
  {
    header: "Godheim",
    title: "Silver Knight",
    info: "Age: ???\nHeight: 182 cm\nIdentity: Leader of the Rebellion",
    contentTitle: `"Your happiness is all that I desire. The story will not complete until everything ends happily for the protagonist."`,
    backgroundImage:
      "https://www.lovebrushchronicles.com/pc/gw/20230717183009/img/d_role2_6d69321.png",
  },
  {
    header: "Eden",
    title: "Perfect Silver",
    info: "Age: ???\nHeight: 182 cm\nIdentity: Paragon from another world",
    contentTitle: `"Being with someone is better than being alone, even if you are trapped in a cage."`,
    backgroundImage:
      "https://www.lovebrushchronicles.com/pc/gw/20230717183009/img/l_role2_1cee566.png",
  },
];

const HomePage = () => {
  const { newsData } = useNews();
  return (
    <div>
      <Carousel slides={slides} />
      <NewsEventsTabs newsData={newsData} />
    </div>
  );
};

export default HomePage;
