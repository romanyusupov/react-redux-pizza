import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pizzaStorage: [],

  catArr: ['Все', 'Гриль', 'Острые', 'Морские', 'Закрытые', 'Экадашные'],

  sortArr: [
    { sortCategory: 'По популярности', nameSortCategory: 'rating' },
    { sortCategory: 'Сначала недорогие', nameSortCategory: '-price' },
    { sortCategory: 'Сначала подороже', nameSortCategory: 'price' },
    { sortCategory: 'По алфавиту', nameSortCategory: '-title' },
  ],
  sortCategory: 0,
  nameSortCategory: 'rating',
  sortDirection: 'desc',

  activeCatId: 0,

  searchValue: '',

  pagesTotal: 1,
  pageCurrent: 1,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setPizzaStorage: (state, action) => {
      state.pizzaStorage = action.payload;
    },

    setSortCategory: (state, action) => {
      const nameId = state.sortArr[action.payload].nameSortCategory;
      state.sortCategory = action.payload;
      state.nameSortCategory = nameId;
      if (nameId.includes('-')) {
        state.sortDirection = 'asc';
      } else state.sortDirection = 'desc';
    },

    setActiveCatId: (state, action) => {
      state.activeCatId = action.payload;
    },

    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },

    setPagesTotal: (state, action) => {
      state.pagesTotal = action.payload;
    },

    setPageCurrent: (state, action) => {
      state.pageCurrent = action.payload;
    },
  },
});

export const {
  sort,
  setSortCategory,
  setActiveCatId,
  setPizzaStorage,
  setSearchValue,
  setPagesTotal,
  setPageCurrent,
} = filterSlice.actions;
export default filterSlice.reducer;
