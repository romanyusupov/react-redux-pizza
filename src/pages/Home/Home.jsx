import React from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Skeleton from '../../components/PizzaBlock/Skeleton';
import Categories from '../../components/Categories/Categories';
import Sort from '../../components/Sort/Sort';
import PizzaBlock from '../../components/PizzaBlock/PizzaBlock';
import Paginations from '../../components/Paginations/Paginations';

import {
  setPizzaStorage,
  setPagesTotal,
  setParamsFromUrl,
} from '../../redux/slices/filterSlice';
import { useSelector, useDispatch } from 'react-redux';

import { apiUrl } from '../../const/api';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);

  const pizzaStorage = useSelector(store => store.filter.pizzaStorage);
  const nameSortCategory = useSelector(store => store.filter.nameSortCategory);
  const sortDirection = useSelector(store => store.filter.sortDirection);
  const activeCatId = useSelector(store => store.filter.activeCatId);
  const searchValue = useSelector(store => store.filter.searchValue);
  const pageCurrent = useSelector(store => store.filter.pageCurrent);
  const sortArr = useSelector(store => store.filter.sortArr);

  const [isContentLoaded, setIsContentLoaded] = React.useState(false);

  const pageItemsLimit = 4;

  function roundUp(num, precision) {
    precision = Math.pow(10, precision);
    return Math.ceil(num * precision) / precision;
  }

  React.useEffect(() => {
    fetchPizzas({}, res =>
      dispatch(setPagesTotal(roundUp(res.data.length / 4, 0))),
    );

    if (window.location.search) {
      const params = qs.parse(window.location.search.substr(1));
      const params2 = {
        ...params,
        sortCategory: sortArr.find(
          obj => obj.nameSortCategory === params.nameSortCategory,
        ).id,
      };
      dispatch(setParamsFromUrl(params2));
    }
  }, []);

  const passQueryToUrl = () => {
    const queryString = qs.stringify({
      nameSortCategory,
      activeCatId,
      searchValue,
      pageCurrent,
    });
    navigate(`?${queryString}`);
  };

  const fetchPizzasWithParams = () => {
    if (!isSearch.current) {
      const params = {
        page: pageCurrent,
        limit: pageItemsLimit,
        category: activeCatId,
        sortBy: nameSortCategory.replace('-', ''),
        order: sortDirection,
      };

      const filteredParams = Object.fromEntries(
        Object.entries(params).filter(([_key, value]) => Boolean(value)),
      );

      const callBack = res => dispatch(setPizzaStorage(res.data));

      fetchPizzas(filteredParams, callBack);
    }

    isSearch.current = false;
  };

  React.useEffect(() => {
    passQueryToUrl();
    fetchPizzasWithParams();
  }, [nameSortCategory, activeCatId, searchValue, pageCurrent]);

  const fetchPizzas = (params, cb) => {
    setIsContentLoaded(false);

    return axios
      .get(apiUrl, {
        params,
      })
      .then(res => {
        cb(res);
        setIsContentLoaded(true);
      });
  };

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
              .filter(obj => {
                if (
                  obj.title.toLowerCase().includes(searchValue.toLowerCase())
                ) {
                  return true;
                }
                return false;
              })
              .map(pizza =>
                isContentLoaded ? (
                  <PizzaBlock key={pizza.id} {...pizza} />
                ) : (
                  <Skeleton key={pizza.id} />
                ),
              )}
          </div>
          <Paginations />
        </div>
      </div>
    </>
  );
};

export default Home;
