import { useState, useEffect } from "react";
import axios from "axios";
import Product from "./Product";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categoryProds, setCategoryProds] = useState([]);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(false);
  const [id, setId] = useState("");

  const navigate = useNavigate();
  const scrollToProducts = useRef(null);

  const [clickedCart, setClickedCart] = useState(false);
  const [addedToWish, setaddedToWish] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("https://ecommerce-app-prods.herokuapp.com/api/products");
      setProducts(data);
      setCategoryProds(data);
    };

    fetchData();
  }, []);

  const getId = (id) => {
    setId(id);
    setClickedCart(true);

    setTimeout(() => {
      setClickedCart(false);
    }, 4000);
  };

  const getIdwish = (id) => {
    setId(id);
    setaddedToWish(true);

    setTimeout(() => {
      setaddedToWish(false);
    }, 4000);
  };

  const productComp = categoryProds.map((product, index) => {
    return (
      <Product
        key={product.id}
        product={product}
        callback={getId}
        index={index}
        wishCallBack={getIdwish}
      />
    );
  });

  const productAdded = products.map((product) => {
    if (product.id === id) {
      return (
        <div className="innerAdded" key={product.id}>
          <img src={product.image} alt="" width="70px" height="70px" />
          <button onClick={() => navigate("/cart")}>GO TO CART</button>
        </div>
      );
    }
  });

  const addedWishList = products.map((product) => {
    if (product.id === id) {
      return (
        <div className="innerAdded" key={product.id}>
          <h3>{product.title.substr(0, 20)}...</h3>
          <img src={product.image} alt="" width="70px" height="70px" />
        </div>
      );
    }
  });

  function filterCategory(category) {
    setCategoryProds([
      ...products.filter((product) => product.category === category),
    ]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const obj = { email: email };
    setEmail("");
    setMessage(true);

    const addSubscriber = await axios.post(
      "https://ecommerce-app-prods.herokuapp.com/api/subscribers",
      obj
    );

    console.log(addSubscriber);
  };

  return (
    <div>
      <div className="hero">
        <div className="div1">
          <h4>NEW TREND 2022</h4>
          <h1>
            All <span>Collections</span>
          </h1>
          <button
            onClick={() =>
              scrollToProducts.current.scrollIntoView({ behavior: "smooth" })
            }
          >
            SHOP NOW <i class="fa-solid fa-angle-down"></i>
          </button>
        </div>
        <div className="div2"></div>
      </div>

      <div className="guarantee">
        <div className="g1">
          <h3>FREE DELIVERY</h3>
          <img src="hand.svg" alt="React Logo" width="50px" />
        </div>
        <div className="g2">
          <h3>30 DAYS RETURN</h3>
          <img src="refund.svg" alt="React Logo" width="50px" />
        </div>
        <div className="g3">
          <h3>SECURE PAYMENT</h3>
          <img src="security.svg" alt="React Logo" width="50px" />
        </div>
        <div className="g4">
          <h3>24/7 SUPPORT</h3>
          <img src="24-hours-support.svg" alt="React Logo" width="50px" />
        </div>
      </div>

      <div className="category">
        <button onClick={() => setCategoryProds(products)}>ALL PRODUCTS</button>
        <button onClick={() => filterCategory("men's clothing")}>
          MEN'S CLOTHING
        </button>
        <button onClick={() => filterCategory("women's clothing")}>
          WOMEN'S CLOTHING
        </button>
        <button onClick={() => filterCategory("jewelery")}>JEWELRY</button>
        <button onClick={() => filterCategory("electronics")}>
          ELECTRONICS
        </button>
      </div>

      <div className="productsSection" ref={scrollToProducts}>
        <div className="productsDiv">{productComp}</div>

        <div className="newsLetter">
          <h1>Subscribe to our Newsletter</h1>
          <span>Subscribe to get updated on sale</span>
          <div>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Best Email"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <input type="submit" value="SUBSCRIBE" />
            </form>
            {message ? (
              <span id="message">Thank you for subscribing! </span>
            ) : null}
          </div>
        </div>

        {clickedCart ? (
          <div className="addedProduct">
            <div>
              <h3>Product Added To Cart </h3>
              {productAdded}
            </div>
          </div>
        ) : null}
      </div>

      {addedToWish ? (
        <div className="addedProduct">
          <div>
            <h3>Added To Wish List </h3>
            {addedWishList}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Products;
