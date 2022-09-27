import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import WishListComp from "./WishListComp";

const Navbar = () => {
  const navigate = useNavigate();

  const [navSize, setnavSize] = useState("8rem");
  const [navColor, setnavColor] = useState("transparent");
  const [navShadow, setnavShadow] = useState("unset");
  const [displayWL, setDisplayWS] = useState(false);

  const listenScrollEvent = () => {
    window.scrollY > 10 ? setnavColor("white") : setnavColor("transparent");
    window.scrollY > 10 ? setnavSize("5rem") : setnavSize("8rem");
    window.scrollY > 10
      ? setnavShadow("rgba(99, 99, 99, 0.2) 0px 2px 8px 0px")
      : setnavShadow("unset");
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);

  const counter = useSelector((state) => state.numbers.counter);
  const wishListCounter = useSelector((state) => state.wishlistCounter.counter);

  return (
    <div
      className="navbar"
      style={{
        backgroundColor: navColor,
        height: navSize,
        transition: "all 1s",
        boxShadow: navShadow,
      }}
    >
      <div className="navbar-container">
        <h2>
          <span id="dot">.</span>Cartify
        </h2>

        <div className="nav-links">
          <span onClick={() => navigate("/")}>Home</span>
          <span onClick={() => navigate("/about")}>About</span>
          <span onClick={() => navigate("/contact")}>Contact us</span>
        </div>

        <div className="cartDiv">
          <i
            class="fa-solid fa-heart"
            onClick={() => setDisplayWS(!displayWL)}
          ></i>

          {wishListCounter >= 1 ? <span>{wishListCounter}</span> : null}

          <i
            x
            class="fa-brands fa-opencart"
            onClick={() => navigate("/cart")}
          ></i>
          {counter >= 1 ? <span>{counter}</span> : null}
        </div>

        {displayWL ? <WishListComp /> : null}
      </div>
    </div>
  );
};

export default Navbar;
