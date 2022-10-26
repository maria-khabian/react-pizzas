import axios from 'axios';
import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    title: string,
    imageUrl: string,
    description: string,
    price: number,
  }>();
  // {
  //   title: '',
  //   imageUrl: '',
  //   description: '',
  //   price: 0,
  // }
  const { id } = useParams();
  const navigate = useNavigate();
  //console.log(id);

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://62c839ba0f32635590d478cf.mockapi.io/items/' + id);
        setPizza(data);
      } catch (error) {
        alert('Mistake about receiving a pizza!');
        navigate('/');
      }
    }
    fetchPizza();
    // eslint-disable-next-line
  }, []);

  if (!pizza) {
    return <>Loading ...</>;
  }

  return (
    <div className="fullPizza-block">
      <h2>{pizza.title}</h2>
      <img src={pizza.imageUrl} alt="pizza" />

      <p className="fullPizza-block_description">
        <span>Composition: </span>
        {pizza.description}
      </p>
      <p className="fullPizza-block_price">
        <span>Price: </span>
        {pizza.price} $
      </p>
      <div className="cart__bottom-buttons">
        <Link to="/" className="button button--outline button--add go-back-btn">
          <svg
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7 13L1 6.93015L6.86175 1"
              stroke="#D3D3D3"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"></path>
          </svg>
          <span>Go back</span>
        </Link>
      </div>
    </div>
  );
}

export default FullPizza;
