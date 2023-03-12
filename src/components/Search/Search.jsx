import React from 'react';
import styles from './stylesSearch.module.scss';
import debounce from 'lodash.debounce';
import { setSearchValue } from '../../redux/slices/filterSlice';
import { useDispatch } from 'react-redux';

const Search = () => {
  const [inputValue, setInputValue] = React.useState('');

  const dispatch = useDispatch();
  const inputRef = React.useRef();

  const onClickClear = () => {
    setInputValue('');
    dispatch(setSearchValue(''));
    inputRef.current.focus();
  };

  const searchValueToStore = React.useCallback(
    debounce((event) => {
      dispatch(setSearchValue(event.target.value));
    }, 400),
    [],
  );

  const onChangeValue = (event) => {
    setInputValue(event.target.value);
    searchValueToStore(event);
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          {' '}
          <path
            d="M20 20L15.8033 15.8033C15.8033 15.8033 14 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5C18 11.0137 17.9484 11.5153 17.85 12"
            stroke="#000000"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"></path>{' '}
        </g>
      </svg>
      <input
        ref={inputRef}
        value={inputValue}
        onChange={onChangeValue}
        className={styles.input}
        placeholder="Найти пиццу"></input>

      {inputValue ? (
        <svg
          className={styles.close}
          onClick={onClickClear}
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          fill="#000000">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path
              fill="#000000"
              d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"></path>
          </g>
        </svg>
      ) : (
        ''
      )}
    </div>
  );
};

export default Search;
