import React from 'react';
import { Provider } from 'react-redux';
import store from '../src/components/store';
import ImageUploader from './components/ImageUploader';
import './App.css'; 

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <ImageUploader />
      </div>
    </Provider>
  );
};

export default App;
