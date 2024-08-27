import React from "react";
import "../styles/global.css";

const GalleryPage = () => {
  const images = [
    // First column
    [
      "https://i.ibb.co/NmTD7W9/gallery-1.jpg",
      "https://i.ibb.co/nsMhqmV/gallery-5.jpg",
      "https://i.ibb.co/hCZ0wY3/gallery-13.jpg",
      "https://i.ibb.co/VM52Gsx/gallery-8.jpg",
      "https://i.ibb.co/tLsDzkJ/gallery-9.jpg",
    ],
    // Second column
    [
      "https://i.ibb.co/V9RBv8H/gallery-2.jpg",
      "https://i.ibb.co/Hh4FJPL/gallery-3.jpg",
      "https://i.ibb.co/1QbwBnF/gallery-16.jpg",
      "https://i.ibb.co/SypJxCK/gallery-17.jpg",
    ],
    // Third column
    [
      "https://i.ibb.co/rvnPWSZ/gallery-4.jpg",
      "https://i.ibb.co/WtkP7p2/gallery-6.jpg",
      "https://i.ibb.co/mqWgHTc/gallery-11.jpg",
      "https://i.ibb.co/vw3rvgk/gallery-14.jpg",
      "https://i.ibb.co/WtggNKw/gallery-18.jpg",
    ],
    // Fourth column
    [
      "https://i.ibb.co/9ppsqjb/gallery-7.jpg",
      "https://i.ibb.co/C9rYh2M/gallery-10.jpg",
      "https://i.ibb.co/QXr8L6Q/gallery-12.jpg",
      "https://i.ibb.co/59sBvFY/gallery-15.jpg",
      "https://i.ibb.co/1QbwBnF/gallery-16.jpg",
    ],
  ];

  return (
    <div>
      <div className="gallery-main">
        <img
          src="https://i.ibb.co/djsFxY1/gallery-main.gif"
          alt="Gallery main"
          style={{ width: "100%", maxWidth: "1500px" }}
        />
      </div>
      <div className="row">
        {images.map((column, columnIndex) => (
          <div key={columnIndex} className="column">
            {column.map((src, index) => (
              <img
                key={index}
                src={src}
                style={{ width: "100%" }}
                alt={`Gallery image ${columnIndex + 1}-${index + 1}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
