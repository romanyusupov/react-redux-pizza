import React from 'react';
import axios from 'axios';

import Skeleton from '../../components/PizzaBlock/Skeleton';
import Categories from '../../components/Categories/Categories';
import Sort from '../../components/Sort/Sort';
import PizzaBlock from '../../components/PizzaBlock/PizzaBlock';
import Paginations from '../../components/Paginations/Paginations';

import { setPizzaStorage, setPagesTotal } from '../../redux/slices/filterSlice';
import { useSelector, useDispatch } from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();
  const pizzaStorage = useSelector((store) => store.filter.pizzaStorage);
  const nameSortCategory = useSelector((store) => store.filter.nameSortCategory);
  const sortDirection = useSelector((store) => store.filter.sortDirection);
  const activeCatId = useSelector((store) => store.filter.activeCatId);
  const searchValue = useSelector((store) => store.filter.searchValue);
  const pageCurrent = useSelector(store => store.filter.pageCurrent);

  const [isContentLoaded, setIsContentLoaded] = React.useState(false);

  function roundUp(num, precision) {
    precision = Math.pow(10, precision);
    return Math.ceil(num * precision) / precision;
  }

  React.useEffect(() => {
    axios.get(`https://63a5914c318b23efa79755f9.mockapi.io/pizza`).then((resp) => {
      dispatch(setPagesTotal(roundUp(resp.data.length / 4, 0)));
    });
  }, []);

  React.useEffect(() => {
    //const search = searchValue ? `&search=${searchValue}` : '';
    setIsContentLoaded(false);
    axios
      .get(
        //category=${activeCatId ? activeCatId : ''}& - если добавить эту строку, то будет сортировать по категориям.
        //одновременно category= и search= не работают из-за ограниченности Mockapi!!!
        //${search} - если добавить эту строку то будет сортировать по введенному поиску
        //по умолчанию делаю поиск через фильтрацию массива в React - не на сервере!!!
        `https://63a5914c318b23efa79755f9.mockapi.io/pizza?page=${pageCurrent}&limit=4&category=${
          activeCatId ? activeCatId : ''
        }&sortBy=${nameSortCategory.replace('-', '')}&order=${sortDirection}`,
      )
      .then((res) => {
        dispatch(setPizzaStorage(res.data));
        setIsContentLoaded(true);
      });
    //window.scrollTo(0, 0);
  }, [nameSortCategory, activeCatId, searchValue, pageCurrent]);

  return (
    <>
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizzaStorage
              .filter((obj) => {
                if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
                  return true;
                }
                return false;
              })
              .map((pizza) =>
                isContentLoaded ? (
                  <PizzaBlock key={pizza.id} {...pizza} />
                ) : (
                  <Skeleton key={pizza.id} />
                ),
              )}
          </div>
          <Paginations
          />
        </div>
      </div>
    </>
  );
};

export default Home;
