import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from '../src/components/Header/Header';
import Cart from './pages/Cart/Cart';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';

import '../src/scss/app.scss';

const App = () => {
  return (
    <div>
      <div className="wrapper">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/cart" element={<Cart />} exact />
          <Route path="*" element={<NotFound />} exact />
        </Routes>
      </div>
    </div>
  );
};

export default App;
