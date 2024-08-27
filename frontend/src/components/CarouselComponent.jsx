import React, { useState } from "react";
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
                <h2 className="main-subtitle">{slide.price}</h2>
              </div>
              <div className="main-content">
                <div className="main-content__title">{slide.contentTitle}</div>
                <div className="main-content__subtitle">
                  {slide.contentSubtitle}
                </div>
                <div className="more-menu">
                  Shop Now
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeWidth="1.7"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <line x1="-5" y1="12" x2="19" y2="12" />
                    <line x1="15" y1="16" x2="19" y2="12" />
                    <line x1="15" y1="8" x2="19" y2="12" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="center">
              <div className="right-side__img">
                <img className="bottle-bg" src={slide.backgroundImage} alt="" />
                <img className="bottle-img" src={slide.bottleImage} alt="" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="button-wrapper">
        <div className="swiper-button swiper-prev-button" onClick={prevSlide}>
          <svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            ></path>
          </svg>
        </div>
        <div className="swiper-button swiper-next-button" onClick={nextSlide}>
          <svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            ></path>
          </svg>
        </div>
      </div>
      <div className="swiper-pagination">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );
};

export default Carousel;
