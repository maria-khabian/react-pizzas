import React from 'react';
import st from './NotFoundBlock.module.scss';

import sadSmile from './../../assets/img/sadSmile.svg';
//import shoppingCart from './../../assets/img/shoppingCart.png';

const NotFoundBlock: React.FC = () => {
  return (
    <div className={st.cart}>
      <div className={st.cartTitle}>
        <h1>Ничего не найдено</h1>
        <img src={sadSmile} alt="sadSmile" />
      </div>

      <p>К сожалению данная страница отсутствует в интренет-магазине.</p>
      <button className="button">Вернуться назад</button>
    </div>
  );
}

export default NotFoundBlock;
