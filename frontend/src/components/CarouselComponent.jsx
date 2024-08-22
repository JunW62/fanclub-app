import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the carousel CSS

const CarouselComponent = () => {
  return (
    <Carousel
      showArrows={true}
      autoPlay={true}
      infiniteLoop={true}
      showThumbs={false}
      showStatus={false}
    >
      <div>
        <img
          src="https://www.lovebrushchronicles.com/pc/gw/20230717183009/img/l_role2_1cee566.png"
          alt="Slide 1"
        />
        <p className="legend">Caption for Slide 1</p>
      </div>
      <div>
        <img
          src="https://www.lovebrushchronicles.com/pc/gw/20230717183009/img/d_role2_6d69321.png"
          alt="Slide 2"
        />
        <p className="legend">Caption for Slide 2</p>
      </div>
      <div>
        <img
          src="https://www.lovebrushchronicles.com/pc/gw/20230717183009/img/role2_f5f43e1.png"
          alt="Slide 3"
        />
        <p className="legend">Caption for Slide 3</p>
      </div>
    </Carousel>
  );
};

export default CarouselComponent;
