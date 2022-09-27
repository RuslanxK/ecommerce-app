import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { addProduct, doIncrement } from "../components/redux/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [clicked, setClicked] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const add = () => {
    dispatch(addProduct(product));
    dispatch(doIncrement());
    setClicked(true);

    setTimeout(() => {
      setClicked(false);
    }, 4000);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `https://ecommerce-app-prods.herokuapp.com/api/products/${id}`
      );
      setProduct(data);
    };

    fetchData();
  }, []);

  return (
    <div className="product-details-section">
      <div className="product-details-left-div">
        <img src={product.image} width="450px" height="450px" alt="" />
      </div>

      <div className="product-details-right-div">
        <h1>{product.title}</h1>
        <h2>${product.price}</h2>
        <p>{product.description}</p>
        <span>{product.category}</span>
        <h3> Shipping from: {product.shipping}</h3>
        <h3> Orders: {product.orders}</h3>
        <button onClick={add}>ADD TO BAG</button>
      </div>

      {clicked ? (
        <div className="addedProduct">
          <h3>Product Added To Cart </h3>
          <div className="innerAdded">
            <img src={product.image} alt="" width="70px" height="70px" />
            <button onClick={() => navigate("/cart")}>Checkout</button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetails;
