import React from "react";
import CarouselComponent from "../components/CarouselComponent";
import NewsEventsTabs from "../components/NewsAndEventsTab";
import { useNews } from "../context/NewsContex";
import Carousel from "../components/CarouselComponent";

const slides = [
  {
    header: "Closca Bottle",
    title: "Beach",
    price: "€ 39.90",
    contentTitle:
      "In 20 years, there could be more plastic in our oceans than fish.",
    contentSubtitle:
      "Plastic pollution injures more than 100.000 marine animals every year. It takes around 450 years for one plastic bottle to decompose.",
    backgroundImage:
      "https://www.lovebrushchronicles.com/pc/gw/20230717183009/img/l_role2_1cee566.png",
    bottleImage:
      "https://www.lovebrushchronicles.com/pc/gw/20230717183009/img/l_role2_1cee566.png",
  },
  {
    header: "Closca Bottle",
    title: "Beach",
    price: "€ 39.90",
    contentTitle:
      "In 20 years, there could be more plastic in our oceans than fish.",
    contentSubtitle:
      "Plastic pollution injures more than 100.000 marine animals every year. It takes around 450 years for one plastic bottle to decompose.",
    backgroundImage:
      "https://www.lovebrushchronicles.com/pc/gw/20230717183009/img/d_role2_6d69321.png",
    bottleImage:
      "https://www.lovebrushchronicles.com/pc/gw/20230717183009/img/d_role2_6d69321.png",
  },
  {
    header: "Closca Bottle",
    title: "Beach",
    price: "€ 39.90",
    contentTitle:
      "In 20 years, there could be more plastic in our oceans than fish.",
    contentSubtitle:
      "Plastic pollution injures more than 100.000 marine animals every year. It takes around 450 years for one plastic bottle to decompose.",
    backgroundImage:
      "https://www.lovebrushchronicles.com/pc/gw/20230717183009/img/role2_f5f43e1.png",
    bottleImage:
      "https://www.lovebrushchronicles.com/pc/gw/20230717183009/img/role2_f5f43e1.png",
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
