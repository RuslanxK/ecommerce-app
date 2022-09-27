import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="footer">
      <div className="div1">
        <img src="payment.png" alt="" width="300px" />
      </div>
      <div className="div2">
        <h2>
          <span id="dot">.</span>Cartify
        </h2>
        <p>© Copyright 2022 .Cartify</p>

        <div className="footer-nav-links">
          <span onClick={() => navigate("/")}>Home</span>
          <span onClick={() => navigate("/about")}>About</span>
          <span onClick={() => navigate("/contact")}>Contact us</span>
        </div>
      </div>
      <div className="div3">
        <div className="social-media">
          <i class="fa-brands fa-facebook-square"></i>
          <i class="fa-brands fa-twitter-square"></i>
          <i class="fa-brands fa-linkedin"></i>
        </div>
      </div>
    </div>
  );
};

export default Footer;
