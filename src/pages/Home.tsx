import React from 'react';
import qs from 'qs';

import { listSelected } from '../components/Sort';
import { Categories, PizzaBlock, Skeleton, Pagination, Sort } from './../components'

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getFilter, setCategoryId, setCurrentPage, setFilter } from '../redux/slices/filterSlices';
import { fetchPizzas, getPizzaData, SearchPizzaParams } from '../redux/slices/pizzasSlices';
import { useAppDispatch } from '../redux/store';


const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { categoryId, sortType, currentPage, searchValue } = useSelector(getFilter);
  const { items, status } = useSelector(getPizzaData);
  //console.log(categoryId)

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  // --------------- ВШИВАЕТ В URL данные ----------------
  React.useEffect(() => {
    //debugger;
    if (isMounted.current) {
      //Создаём данные с помощью библиотеки qs  --- sortProperty=rating&categoryId=0&currentPage=1
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,
        categoryId,
        // categoryId: categoryId > 0 ? categoryId : 0,
        currentPage,
      });
      // Вшиваем данные в URL  --- с помощью хука import { useNavigate } from 'react-router-dom'
      navigate(`?${queryString}`);

    }
    isMounted.current = true;
    // eslint-disable-next-line
  }, [categoryId, sortType.sortProperty, currentPage]);

  React.useEffect(() => {
    //debugger;
    if (window.location.search) {
      const params = (qs.parse(window.location.search.substring(1)) as unknown) as SearchPizzaParams;
      //console.log(params)
      const sort = listSelected.find((obj) => obj.sortProperty === params.sortBy);
      dispatch(
        setFilter({
          searchValue: params.search,
          categoryId: Number(params.category),
          currentPage: Number(params.currentPage),
          sortType: sort ? sort : listSelected[0],
        }),
      );

      isSearch.current = true;
    }
    // eslint-disable-next-line
  }, []);

  const getPizzas = async () => {
    //Если у нас есть минус - мы делаем сортировку по убыванию ↓, если нет - по возрастанию ↑
    const order = sortType.sortProperty.includes('-') ? 'desc' : 'asc';
    //Усли у нас в сортировке есть минус ты мы этот минус убираем и отдаём только название параметра
    const sortBy = sortType.sortProperty.replace('-', '');
    
    //Проверяем если categoryId > 0 ( а это в категориях в массиве индекс массива categories) тогда мы показываем ту категирию которая отфильтровывает пиццы, если меньше (категория ВСЕ пиццы имеют индекс 0) то просто ничего не показываем и рендарятся все пиццы
    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    // await axios
    //   .get(
    //     `https://62c839ba0f32635590d478cf.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`,
    //   )
    //   .then((response) => {
    //     setItems(response.data);
    //     setIsLoading(false);
    //     console.log(111);
    //   });

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
      }),
    );

    //при первом рендере скролл вверх (или переходе на главную стр будет переходить наверх страницы)
    window.scrollTo(0, 0);
  };

  //В React.useEffect хук исполняется дважды => первый раз с данными из стейта, а во второй раз с изменёнными данными либо из React.useEffect первый который (при первом рендере), либо просто из-за изменённых данных в следствие работы юзера! Как эти изменения узнаются? А вот [categoryId, sortType, searchValue, currentPage]
  React.useEffect(() => {
    //debugger;
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
    // eslint-disable-next-line
  }, [categoryId, sortType, searchValue, currentPage]);
  //Если будет меняться категория или сортировка всегда делай запрос на сервак

  const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />);
  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);

  const onClickCategoryId = React.useCallback(
    (id: number) => {
      //console.log(id);
      dispatch(setCategoryId(id));
    }, []
  )

  const onChangePage = (page: number) => {
    //console.log(page);
    dispatch(setCurrentPage(page));
  };

  return (
    <>
      <div className="content__top">
        <Categories categoryId={categoryId} onClickCategoryId={(id) => onClickCategoryId(id)} />
        {/* <Sort sortType={sortType} onChangeSortType={(id) => setSortType(id)} /> */}
        <Sort sort={sortType}/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>{' '}
          <p>К сожалению не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading'
            ? // ? Array(12).fill(<Skeleton />)
              skeletons
            : pizzas}
        </div>
      )}

      <Pagination currentPage={currentPage} onCahgePage={onChangePage} />
    </>
  );
}

export default Home;
