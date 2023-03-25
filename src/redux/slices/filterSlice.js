import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pizzaStorage: [],

  catArr: ['Все', 'Гриль', 'Острые', 'Морские', 'Закрытые', 'Экадашные'],

  sortArr: [
    { sortCategory: 'По популярности', nameSortCategory: 'rating', id: 0 },
    { sortCategory: 'Сначала недорогие', nameSortCategory: '-price', id: 1 },
    { sortCategory: 'Сначала подороже', nameSortCategory: 'price', id: 2 },
    { sortCategory: 'По алфавиту', nameSortCategory: '-title', id: 3 },
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

    setParamsFromUrl: (state, action) => {
      if (action.payload.nameSortCategory.includes('-')) {
        state.sortDirection = 'asc';
      } else state.sortDirection = 'desc';
      state.sortCategory = Number(action.payload.sortCategory);
      state.nameSortCategory = action.payload.nameSortCategory;
      state.activeCatId =  Number(action.payload.activeCatId);
      state.searchValue = action.payload.searchValue;
      state.pageCurrent = Number(action.payload.pageCurrent);
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
  setParamsFromUrl,
} = filterSlice.actions;
export default filterSlice.reducer;
