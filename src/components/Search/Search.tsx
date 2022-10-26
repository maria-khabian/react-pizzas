import React from 'react';
import st from './Search.module.scss';
import debounсe from 'lodash.debounce';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlices';

import closed from './../../assets/img/closed.png';

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null); //inputRef - простыми словами создаётся ссылка на объект
  //console.log(inputRef);

  const onClear = () => {
    setValue('');
    dispatch(setSearchValue('')); //очищается инпут
    // document.querySelector('input').focus();
    //inputRef.current. ошибка для TS была в том, что возможно inputRef может вернуть null. Усть два варика исправления данной ошибки
    //ВАРИАНТ 1 - мы проверили что null нет и ничего не сломается, ибо внутрь null уже не передасться - передастся только HTMLInputElement поэтому ошибка исправлена
    // if (inputRef.current) {
    //   inputRef.current.focus(); //ставится фокус
    // }

    //ВАРИАНТ 2 Оператор опциональной последовательности ?.
    inputRef.current?.focus();
    
  };
  // eslint-disable-next-line
  const updateSearchValue = React.useCallback(
    debounсe((str) => {
      dispatch(setSearchValue(str));
    }, 350),
    [],
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    //console.log(event)
    updateSearchValue(event.target.value);
  };


  return (
    <div className={st.root}>
      <svg className={st.search_img} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <g id="search">
          <path d="M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z" />
        </g>
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={st.input}
        type="text"
        placeholder="Поиск пиццы ..."
      />
      {value && <img onClick={onClear} className={st.closed_img} src={closed} alt="closed" />}
    </div>
  );
}

export default Search;
