import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/style.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { createStore, combineReducers, applyMiddleware} from "redux";
import { Provider } from "react-redux";
import counterReducer from './components/redux/counterReducer'
import productsReducer from './components/redux/productsReducer'
import wishlistCounterReducer from './components/redux/wishlistCounterReducer'
import wishlistProductReducer from './components/redux/wishlistProductsReducer'

import {persistStore, persistReducer} from 'redux-persist'
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";


const persistConfig = {

     key: 'main-root',
     storage,
}


const rootReducer = combineReducers({

     numbers: counterReducer,
     prods: productsReducer,
     wishlistCounter: wishlistCounterReducer,
     wishlistProduct: wishlistProductReducer
})



const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, applyMiddleware());

const Persistor = persistStore(store)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={Persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
