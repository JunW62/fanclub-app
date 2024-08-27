import React, { useState } from "react";
import {
  IoArrowForwardCircleOutline,
  IoArrowBackCircleOutline,
} from "react-icons/io5";
import "../styles/NewsCarousel.css";

const NewsCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="news-carousel">
      <div className="carousel-container">
        <button className="carousel-button prev" onClick={prevSlide}>
          <IoArrowBackCircleOutline />
        </button>
        <div className="carousel-content">
          <img src={images[currentIndex]} alt={`News ${currentIndex + 1}`} />
        </div>
        <button className="carousel-button next" onClick={nextSlide}>
          <IoArrowForwardCircleOutline />
        </button>
        <div className="carousel-indicators">
          {images.map((_, index) => (
            <span
              key={index}
              className={`indicator ${index === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsCarousel;
