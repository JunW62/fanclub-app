import React from "react";
import PropTypes from "prop-types";
import "../styles/global.css";
import headerImageLeft from "../assets/header-left.png";
import headerImageRight from "../assets/header-right.png";

import { TbFence } from "react-icons/tb";

const PageHeader = ({ title }) => {
  return (
    <div className="page-header">
      <img src={headerImageLeft} alt="Page header" className="header-image" />
      <TbFence className="header-icon" />
      <TbFence className="header-icon" />
      <h1 className="header-title">{title.toUpperCase()}</h1>
      <TbFence className="header-icon" />
      <TbFence className="header-icon" />
      <img src={headerImageRight} alt="Page header" className="header-image" />
    </div>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageHeader;
