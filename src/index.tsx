import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';

import { BrowserRouter, HashRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from './redux/store';

const rootElem = document.getElementById('root');

//Проверяем существует ли html елемент на нашей странице, если да то запихнуть в него эл-т root.render() - всё наше приложение
if (rootElem) {
  const root = ReactDOM.createRoot(rootElem);
  root.render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>,
  );
}
