const doIncrement = (toInc = 1) => {
  return {
    type: "INCREMENT",
    payload: toInc,
  };
};

const doDecrement = (toDec = 1) => {
  return {
    type: "DECREMENT",
    payload: toDec,
  };
};

const addProduct = (product) => {
  return {
    type: "ADD",
    payload: product,
  };
};

const removeProduct = (product) => {
  return {
    type: "REMOVE",
    payload: product,
  };
};

const resetCounter = () => {
  return {
    type: "CLEAR",
  };
};

const resetCounterWL = () => {
  return {
    type: "CLEARWL",
  };
};

const resetCart = () => {
  return {
    type: "CLEARCART",
  };
};

const resetWL = () => {
  return {
    type: "CLEARWLARR",
  };
};

const wishlistIncrement = (toInc = 1) => {
  return {
    type: "INC",
    payload: toInc,
  };
};

const wishlistDecrement = (toInc = 1) => {
  return {
    type: "DEC",
    payload: toInc,
  };
};

const addWishList = (product) => {
  return {
    type: "ADDWISH",
    payload: product,
  };
};

const removeWishList = (product) => {
  return {
    type: "REMOVEWISH",
    payload: product,
  };
};

export {
  doDecrement,
  doIncrement,
  addProduct,
  removeProduct,
  resetCounter,
  resetCart,
  wishlistIncrement,
  wishlistDecrement,
  addWishList,
  removeWishList,
  resetCounterWL,
  resetWL,
};
