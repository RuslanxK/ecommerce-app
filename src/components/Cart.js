import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";

import {
  removeProduct,
  doDecrement,
  resetCounter,
  resetCart,
} from "../components/redux/actions";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useState } from "react";

const Cart = () => {
  const products = useSelector((state) => state.prods.products);

  const [coupon, setCoupon] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [information, setInformation] = useState({
    fname: "",
    lname: "",
    country: "",
    city: "",
    address: "",
    zipcode: "",
    cardNo: "",
    date: "",
    cvv: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productAdded = products.map((product, index) => {
    return (
      <div class="cartProductDiv" key={index}>
        {<img src={product.image} width="100px" height="100px" alt="" />}
        <h3>{product.title.substr(0, 15)}...</h3>
        <br /> <span>${product.price}</span>
        <span
          onClick={() => {
            dispatch(removeProduct(index));
            dispatch(doDecrement());
          }}
        >
          <i class="fa-solid fa-circle-xmark"></i>
        </span>
      </div>
    );
  });

  const TotalPrice = products.reduce(
    (total, currentValue) => (total = total + +currentValue.price),
    0
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInformation({ ...information, [name]: value });
  };

  const saveAndNavigate = async (e) => {
    e.preventDefault();

    emailjs
      .sendForm("gmail", "template_0xlwneo", e.target, "C8F18_gdfFE2k4xeP")
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );

    console.log("dfsdf");

    const number = Math.floor(Math.random() * 1562) + 1;

    let arrProducts = [];

    products.map((product) => {
      let obj = {
        title: product.title,
        price: product.price,
        category: product.category,
      };
      arrProducts.push(obj);
    });

    const obj = {
      order: number,
      fname: information.fname,
      lname: information.lname,
      country: information.country,
      city: information.city,
      address: information.address,
      zipcode: information.zipcode,
      products: arrProducts,
    };
    const saveData = await axios.post("https://ecommerce-app-prods.herokuapp.com/api/orders", obj);
    console.log(saveData);

    const paymentObj = {
      order: number,
      cardnumber: information.cardNo,
      date: information.date,
      cvv: information.cvv,
    };

    const saveCard = await axios.post(
      "https://ecommerce-app-prods.herokuapp.com/api/payments",
      paymentObj
    );
    console.log(saveCard);

    localStorage.setItem("products", JSON.stringify(obj));

    dispatch(resetCounter());
    dispatch(resetCart());

    navigate("/order");
  };

  return (
    <div className="cart-section">
      <div className="productsDiv">
        <div className="cartTitle">Your Cart</div>
        {products.length ? (
          productAdded
        ) : (
          <h3 style={{ paddingTop: "20px" }}>Empty Cart</h3>
        )}
      </div>

      {checkout ? null : (
        <div className="detailsDiv">
          <div className="test">
            <h3 className="summary">Order Summary</h3>
            <span>
              Subtotal <span>${TotalPrice}</span>
            </span>
            <span>
              Shipping <span>Free</span>
            </span>
            <span id="coupon" onClick={() => setCoupon(!coupon)}>
              Add coupon code
            </span>
            <div className="couponDiv">
              {coupon ? <input type="text" placeholder="XXX-XXX-XXX" /> : null}
              {coupon ? (
                <button onClick={() => setCoupon(!coupon)} id="applyBtn">
                  Apply
                </button>
              ) : null}
            </div>
            <h3 id="total">
              Total <span>${TotalPrice}</span>
            </h3>
          </div>
          <button onClick={() => setCheckout(true)} disabled={!products.length}>
            Checkout
          </button>
        </div>
      )}

      {checkout ? (
        <div className="detailsDiv">
          <div className="test">
            <h3 className="summary"> Shipping Information</h3>

            <form onSubmit={saveAndNavigate}>
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  name="fname"
                  required
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lname"
                  required
                  onChange={handleChange}
                />
              </div>
              <br />
              <div>
                <input
                  type="text"
                  placeholder="Country"
                  name="country"
                  required
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  required
                  onChange={handleChange}
                />
              </div>
              <br />
              <div>
                <input
                  type="text"
                  placeholder="Address"
                  name="address"
                  required
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder="Zip code"
                  name="zipcode"
                  required={true}
                  minLength={3}
                  onChange={handleChange}
                />
                <div></div>

                <div className="message">
                  <textarea
                    type="text"
                    cols={62}
                    rows={2.5}
                    placeholder="Message"
                    name="message"
                    minLength={3}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
              <br />
              <h3 id="h3Card">
                Payment Method <span>Card</span>
              </h3>
              <br />
              <div className="card">
                <input
                  type="text"
                  placeholder="Card number"
                  name="cardNo"
                  id="cardnumber"
                  required={true}
                  minLength={9}
                  maxLength={9}
                  onChange={handleChange}
                />
              </div>
              <div>
                <br />
                <span>Expiry date</span>
                <input
                  type="month"
                  required
                  name="date"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  minLength={3}
                  maxLength={3}
                  placeholder="CVV"
                  name="cvv"
                  required
                  onChange={handleChange}
                />
              </div>
              <input type="submit" value="Place Order" />
            </form>
            <br />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Cart;
