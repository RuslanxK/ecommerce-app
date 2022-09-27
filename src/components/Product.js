import { useNavigate } from "react-router-dom";
import {
  addProduct,
  doIncrement,
  wishlistIncrement,
  addWishList,
} from "../components/redux/actions";
import { useDispatch } from "react-redux";
import { useState } from "react";

const Product = ({ product, callback, wishCallBack }) => {
  const [hovered, setHovered] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const add = () => {
    callback(product.id);

    dispatch(addProduct(product));

    dispatch(doIncrement());
  };

  const addtoWishlist = () => {
    dispatch(wishlistIncrement());
    dispatch(addWishList(product));

    wishCallBack(product.id);
  };

  return (
    <div className="productSection">
      <div
        className="product"
        onMouseOver={() => setHovered(true)}
        onMouseOut={() => setHovered(false)}
      >
        <i class="fa-solid fa-heart-circle-plus" onClick={addtoWishlist}></i>

        <div className="productIMG">
          <img src={product.image} width="200px" height="200px" alt="" />

          {hovered ? (
            <div className="btns">
              <button onClick={add}>ADD TO CART</button>
              <button
                id="view"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                VIEW PRODUCT
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <span>{product.title.substr(0, 20)}...</span>
      <h4>${product.price}</h4>
    </div>
  );
};

export default Product;
