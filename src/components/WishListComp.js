import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeWishList,
  wishlistDecrement,
  addProduct,
  doIncrement,
  resetCounterWL,
  resetWL,
} from "./redux/actions";

const WishListComp = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.wishlistProduct.products);

  const addAllProductsToCart = () => {
    products.forEach((product) => {
      dispatch(addProduct(product));
      dispatch(doIncrement());
      dispatch(resetCounterWL());
      dispatch(resetWL());
    });
  };

  const productAddedWL = products.map((product, index) => {
    return (
      <div class="productWL" key={index}>
        <span>
          <i
            class="fa-solid fa-circle-xmark"
            onClick={() => {
              dispatch(removeWishList(index));
              dispatch(wishlistDecrement());
            }}
          ></i>
        </span>
        {product.title.substr(0, 15)}...{" "}
        <img src={product.image} alt="" width="50px" height="50px" />
      </div>
    );
  });

  return (
    <div className="wishListComp">
      {products.length ? <h3>Added To Wish List</h3> : <h3>Empty Wish List</h3>}
      {productAddedWL}
      {products.length ? (
        <button onClick={addAllProductsToCart}>Add To Cart</button>
      ) : null}
    </div>
  );
};

export default WishListComp;
