import React, { useState } from "react";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import "../styles/Carousel.css";

const Carousel = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="carousel">
      <div className="carousel-container">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-slide ${
              index === currentSlide ? "active" : ""
            }`}
          >
            <div className="left-side">
              <div className="main-wrapper">
                <h3 className="main-header">{slide.header}</h3>
                <h1 className="main-title">{slide.title}</h1>
                <h2
                  className="main-subtitle"
                  style={{ whiteSpace: "pre-line" }}
                >
                  {slide.info}
                </h2>
              </div>
              <div className="main-content">
                <div className="main-content_title">{slide.contentTitle}</div>
                <div className="more-menu">
                  <button className="more-menu-button">Join the story</button>
                  <button className="more-menu-button">Learn more</button>
                </div>
              </div>
            </div>
            <div className="right-side">
              <img className="bottle-bg" src={slide.backgroundImage} alt="" />
            </div>
          </div>
        ))}
      </div>
      <div className="button-wrapper">
        <div className="swiper-button swiper-prev-button" onClick={prevSlide}>
          <IoArrowForwardCircleOutline />
        </div>
        <div className="swiper-button swiper-next-button" onClick={nextSlide}>
          <IoArrowForwardCircleOutline />
        </div>
      </div>
      <div className="swiper-pagination">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );
};

export default Carousel;
