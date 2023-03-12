import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveCatId } from '../../redux/slices/filterSlice';

const Categories = () => {
  const catArr = useSelector((store) => store.filter.catArr);
  const activeCatId = useSelector((store) => store.filter.activeCatId);
  const dispatch = useDispatch();

  return (
    <div className="categories">
      <ul>
        {catArr.map((cat, i) => (
          <li
            key={i}
            onClick={() => dispatch(setActiveCatId(i))}
            className={activeCatId === i ? 'active' : ''}>
            {cat}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
