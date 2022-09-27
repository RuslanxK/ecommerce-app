const initialStore = {
  products: [],
};

const applyProductsChanges = (state = initialStore, action) => {
  if (action.type === "ADD") {
    return { ...state, products: [...state.products, { ...action.payload }] };
  } else if (action.type === "REMOVE") {
    const products = state.products.filter(
      (product, index) => index !== action.payload
    );
    return { ...state, products };
  } else if (action.type === "CLEARCART") {
    return { ...state, products: ([...state.products] = []) };
  } else {
    return state;
  }
};

export default applyProductsChanges;
