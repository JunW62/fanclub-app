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
          src="https://via.placeholder.com/800x300?text=Slide+1"
          alt="Slide 1"
        />
        <p className="legend">Caption for Slide 1</p>
      </div>
      <div>
        <img
          src="https://via.placeholder.com/800x300?text=Slide+2"
          alt="Slide 2"
        />
        <p className="legend">Caption for Slide 2</p>
      </div>
      <div>
        <img
          src="https://via.placeholder.com/800x300?text=Slide+3"
          alt="Slide 3"
        />
        <p className="legend">Caption for Slide 3</p>
      </div>
    </Carousel>
  );
};

export default CarouselComponent;
