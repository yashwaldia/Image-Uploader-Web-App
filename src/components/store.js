import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk'; // Import `thunk` as a named import
import imageReducer from '../components/imageReducer'; // Your image reducer

const rootReducer = combineReducers({
  images: imageReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;
