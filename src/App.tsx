import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './scss/app.scss';

import { Home } from './components'
import MainLayout from './layout/MainLayout';

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));
const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza'));
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));

function App() {
  return (
    // <div className="wrapper">
    //   <Header />
    //   <div className="content">
    //     <div className="container">
    //       <Routes>
    //         <Route path="/" element={<Home />} />
    //         <Route path="/cart" element={<Cart />} />
    //         <Route path="/pizza/:id" element={<FullPizza />} />
    //         <Route path="*" element={<NotFound />} />
    //       </Routes>
    //     </div>
    //   </div>
    // </div>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={
          <React.Suspense fallback={<div>The page is loading...</div>}>
            <Cart />
          </React.Suspense>} />
        <Route path="pizza/:id" element={
          <React.Suspense fallback={<div>The page is loading...</div>}>
            <FullPizza />
          </React.Suspense>} />
        <Route path="*" element={
          <React.Suspense fallback={<div>The page is loading...</div>}>
            <NotFound />
          </React.Suspense>} />
      </Route>
    </Routes>
  );
}

export default App;
