import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk'; 
import imageReducer from '../components/imageReducer'; 

const rootReducer = combineReducers({
  images: imageReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;
