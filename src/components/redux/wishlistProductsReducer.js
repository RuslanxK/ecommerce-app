const initialStore = {
  products: [],
};

const applyProductsChanges = (state = initialStore, action) => {
  if (action.type === "ADDWISH") {
    return { ...state, products: [...state.products, { ...action.payload }] };
  } else if (action.type === "REMOVEWISH") {
    const products = state.products.filter(
      (product, index) => index !== action.payload
    );
    return { ...state, products };
  } else if (action.type === "CLEARWLARR") {
    return { ...state, products: ([...state.products] = []) };
  } else {
    return state;
  }
};

export default applyProductsChanges;
