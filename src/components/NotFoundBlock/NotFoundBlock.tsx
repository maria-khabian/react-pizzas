import React from 'react';
import st from './NotFoundBlock.module.scss';

import sadSmile from './../../assets/img/sadSmile.svg';
//import shoppingCart from './../../assets/img/shoppingCart.png';

const NotFoundBlock: React.FC = () => {
  return (
    <div className={st.cart}>
      <div className={st.cartTitle}>
        <h1>Nothing was found</h1>
        <img src={sadSmile} alt="sadSmile" />
      </div>

      <p>Unfortunately this page is not available on the webshop.</p>
      <button className="button">Go back</button>
    </div>
  );
}

export default NotFoundBlock;
