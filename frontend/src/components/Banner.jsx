import React from "react";
import PropTypes from "prop-types";
import "../styles/global.css";
import headerImage from "../assets/header-img.png"; // Make sure to add this image to your assets folder

const PageHeader = ({ title }) => {
  return (
    <div className="page-header">
      <img src={headerImage} alt="Page header" className="header-image" />
      <h1 className="header-title">{title}</h1>
      <img src={headerImage} alt="Page header" className="header-image" />
    </div>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageHeader;
