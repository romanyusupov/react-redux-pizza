import React from 'react';
import styles from './paginaions.module.scss';
import cx from 'classnames';
import { setPageCurrent } from '../../redux/slices/filterSlice';

import { useSelector, useDispatch } from 'react-redux';

const Paginations = () => {
  const pagesTotal = useSelector(store => store.filter.pagesTotal);
  const pageCurrent = useSelector(store => store.filter.pageCurrent);
  const dispatch = useDispatch();

  const pagesArr = [];
  for (let i = 0; i < pagesTotal; i++) {
    pagesArr[i] = i + 1;
  }

  return (
    <>
      <ul className={styles.root}>
        <li className={cx(styles.numberRound, `${''}`)}>
          <svg
            viewBox="0 0 1024 1024"
            className={styles.icon}
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
            stroke="#000000"
            strokeWidth="0">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z"
                fill="#000000"></path>
            </g>
          </svg>
        </li>

        {pagesArr.map((pageNmb) => (
          <li
            className={cx(styles.numberRound, pageCurrent === pageNmb ? styles.active : '')}
            onClick={() => dispatch(setPageCurrent(pageNmb))}
            key={pageNmb}>
            <span className={styles.pageNumber}>{pageNmb}</span>
          </li>
        ))}

        <li className={styles.numberRound}>
          <svg
            viewBox="0 0 1024 1024"
            className={styles.icon}
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
            stroke="#000000"
            strokeWidth="0">
            <g id="SVGRepo_bgCarrier" strokeWidth="36"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z"
                fill="#000000"></path>
            </g>
          </svg>
        </li>
      </ul>
    </>
  );
};

export default Paginations;
