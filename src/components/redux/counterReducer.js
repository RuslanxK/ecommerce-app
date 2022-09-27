const initialStore = {
  counter: 0,
};

const applyCounterChanges = (state = initialStore, action) => {
  if (action.type === "INCREMENT") {
    return { ...state, counter: state.counter + action.payload };
  } else if (action.type === "DECREMENT") {
    return { ...state, counter: state.counter - action.payload };
  } else if (action.type === "CLEAR") {
    return { ...state, counter: (state.counter = 0) };
  } else {
    return state;
  }
};

export default applyCounterChanges;
