const initialStore = {
  counter: 0,
};

const applyCounterChanges = (state = initialStore, action) => {
  if (action.type === "INC") {
    return { ...state, counter: state.counter + action.payload };
  } else if (action.type === "DEC") {
    return { ...state, counter: state.counter - action.payload };
  } else if (action.type === "CLEARWL") {
    return { ...state, counter: (state.counter = 0) };
  } else {
    return state;
  }
};

export default applyCounterChanges;
