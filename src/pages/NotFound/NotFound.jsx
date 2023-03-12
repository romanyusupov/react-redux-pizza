import React from 'react';
import styles from './styles.module.scss';

const NotFound = () => {
  return (
    <>
      <div className={styles.root}>
        <span className={styles.span}>😕</span>
        <h2>Ничего не найдено!</h2>
        <p>
          К сожалению такой странцы не существует в нашем магазине.
          <br />
          Попробуйте перейти на главную и попробовать ещё раз!
        </p>
        <a href="/" className="button button--black">
          <span>Вернуться назад</span>
        </a>
      </div>
    </>
  );
};

export default NotFound;
