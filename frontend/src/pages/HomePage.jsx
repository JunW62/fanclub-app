import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../slices/productsSlice";
import Carousel from "../components/CarouselComponent";
import NewsCarousel from "../components/NewsCarousel";
import NewsEventsTabs from "../components/NewsAndEventsTab";
import { useNews } from "../context/NewsContex";
import ProductList from "../components/ProductList";
import PageHeader from "../components/Banner";

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
const newInIds = [
  "66c7792b8bc8c95f42992511",
  "66cb8f41db3640b593ed114c",
  "66cb8f41db3640b593ed1150",
  "66cb8f42db3640b593ed1164",
];

const HomePage = () => {
  const dispatch = useDispatch();
  const { newsData } = useNews();
  const { items: allProducts, status } = useSelector((state) => state.products);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const newInProducts = allProducts.filter((product) =>
    newInIds.includes(product._id)
  );
  return (
    <div>
      <Carousel slides={slides} />
      <div className="home-content">
        <PageHeader title="New In" className="home-header" />
        <ProductList products={newInProducts} className="new-in-product-list" />
      </div>
      <div className="home-content">
        <PageHeader title="News & Events" className="home-header" />
        <div className="home-news-content">
          <NewsCarousel
            images={[
              "https://r.res.easebar.com/pic/20231220/93f68052-dbc9-411e-a3c8-baf87f606755.jpg",
              "https://r.res.easebar.com/pic/20231220/5548b48c-4c92-4ad4-bb42-c2d9382bcc74.jpg",
            ]}
          />
          <NewsEventsTabs newsData={newsData} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
