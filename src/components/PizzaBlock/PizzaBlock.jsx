import React from 'react';

const PizzaBlock = ({ title, price, types, sizes, imageUrl, id, installNewPriceId }) => {
  //const [newPrice, setNewPrice] = React.useState(+price[0]);
  const [activeTypeId, setActiveTypeId] = React.useState(types[0]);
  const [activeSizeId, setActiveSizeId] = React.useState(sizes[0]);

  const onClickPizzaOptions = (id, itemId) => {
    if (id === 'types') {
      setActiveTypeId(itemId);
    } else if (id === 'sizes') {
      setActiveSizeId(itemId);
    }
    
  };

  // React.useEffect(() => {
  //   if (+activeTypeId === 0 && +activeSizeId === 26) {
  //     setNewPrice(+price[0]);
  //   } else if (+activeTypeId === 0 && +activeSizeId === 30) {
  //     setNewPrice(+price[1]);
  //   } else if (+activeTypeId === 0 && +activeSizeId === 40) {
  //     setNewPrice(+price[2]);
  //   } else if (+activeTypeId === 1 && +activeSizeId === 26) {
  //     setNewPrice(+price[3]);
  //   } else if (+activeTypeId === 1 && +activeSizeId === 30) {
  //     setNewPrice(+price[4]);
  //   } else if (+activeTypeId === 1 && +activeSizeId === 40) {
  //     setNewPrice(+price[5]);
  //   }
  // }, [activeTypeId, activeSizeId]);

  // React.useEffect(() => {
  //   price.forEach((element, i) => {
  //     if (+element === newPrice) {
  //       installNewPriceId(i, id);
  //     }
  //   });
  // }, [newPrice]);

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((type) => (
              <li
                key={type}
                id="types"
                onClick={(e) => onClickPizzaOptions(e.target.id, type)}
                className={activeTypeId === type ? 'active' : ''}>
                {type ? 'Традиционная' : 'Тонкая'}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size) => (
              <li
                key={size}
                id="sizes"
                onClick={(e) => onClickPizzaOptions(e.target.id, size)}
                className={+activeSizeId === size ? 'active' : ''}>
                {`${size} см`}
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {+price[0]} ₽</div>
          <button className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            <i>0</i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
