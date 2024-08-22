import React from "react";
import {
  FaYoutube,
  FaTiktok,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import "../styles/global.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-left">
        <p>Copyright © {currentYear} CAEL ANSELM OFFICIAL FAN CLUB</p>
      </div>
      <div className="footer-right">
        <a
          href="https://www.youtube.com/@LovebrushChronicles/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaYoutube />
        </a>
        <a
          href="https://www.tiktok.com/discover/Love-Brush-Chronicles?lang=en/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTiktok />
        </a>
        <a
          href="https://www.facebook.com/LovebrushChronicles"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook />
        </a>
        <a
          href="https://www.instagram.com/lovebrush_chronicles/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
        </a>
        <a
          href="https://x.com/LBChronicles_EN"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
