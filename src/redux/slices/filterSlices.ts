import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum TSort {
  RATING_DESC = 'rating',
  TITLE_DESC = 'title',
  PRICE_DESC = 'price',
  RATING_ASC = '-rating',
  TITLE_ASC = '-title',
  PRICE_ASC = '-price',
}

export type TSortType = {
  name: string,
  sortProperty: TSort,
}

export interface FilterSlicesState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sortType: TSortType;
}

const initialState: FilterSlicesState = {
  searchValue: '',
  categoryId: 0,
  // categoryId: {
  //   id: 0,
  //   value: 'Все',
  // },
  currentPage: 1,
  sortType: {
    name: 'популярности ↑',
    sortProperty: TSort.PRICE_DESC,
  },
};

export const filterSlices = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue(state, actions: PayloadAction<string>) {
      state.searchValue = actions.payload;
      //console.log(actions);
    },
    setCategoryId(state, actions: PayloadAction<number>) {
      state.categoryId = actions.payload;
      //console.log(actions);
    },
    setSortType(state, actions: PayloadAction<TSortType>) {
      state.sortType = actions.payload;
      //console.log(actions);
    },
    setCurrentPage(state, actions: PayloadAction<number>) {
      state.currentPage = actions.payload;
      //console.log(actions);
    },
    setFilter(state, actions: PayloadAction<FilterSlicesState>) {
      state.currentPage = Number(actions.payload.currentPage);
      state.categoryId = Number(actions.payload.categoryId);
      state.sortType = actions.payload.sortType;

      // console.log(actions);
    },
  },
});

export const getFilter = (state: RootState) => state.filterSlices;
export const getSortType = (state: RootState) => state.filterSlices.sortType;

export const { setCategoryId, setSortType, setCurrentPage, setFilter, setSearchValue } =
  filterSlices.actions;
export default filterSlices.reducer;
