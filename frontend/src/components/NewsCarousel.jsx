import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
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
      <button className="carousel-button prev" onClick={prevSlide}>
        <FaChevronLeft />
      </button>
      <div className="carousel-content">
        <img src={images[currentIndex]} alt={`News ${currentIndex + 1}`} />
      </div>
      <button className="carousel-button next" onClick={nextSlide}>
        <FaChevronRight />
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
  );
};

export default NewsCarousel;
