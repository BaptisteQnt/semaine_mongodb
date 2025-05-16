import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';

import { productListReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';

// 🔹 Récupération depuis le localStorage AVANT la déclaration de initialState
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

// 🔹 Declaration de initialState
const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
};

// 🔹 Combine reducers
const reducer = combineReducers({
  productList: productListReducer,
  cart: cartReducer,
});

// 🔹 Middlewares + création du store
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
