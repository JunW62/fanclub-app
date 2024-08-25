import React from "react";
import PropTypes from "prop-types";
import "../styles/global.css";

const Banner = ({ title }) => {
  return (
    <div className="banner">
      <h1>{title}</h1>
    </div>
  );
};

Banner.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Banner;
