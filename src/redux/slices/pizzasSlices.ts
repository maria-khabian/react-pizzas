import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';


type TPizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface PizzaSlicesState {
  items: TPizza[];
  status: Status;
};

const initialState: PizzaSlicesState = {
  items: [],
  status: Status.LOADING, // loading, success, error
};

//type FetchPizzasArg = Record<string, string>

export type SearchPizzaParams = {
  order: string; 
  sortBy: string; 
  category: string; 
  search: string; 
  currentPage: string;
}

export const fetchPizzas = createAsyncThunk<TPizza[], SearchPizzaParams>('pizzas/fetchPizzas', async (params) => {
  const { order, sortBy, category, search, currentPage } = params;
  const {data} = await axios.get<TPizza[]>(
    `https://62c839ba0f32635590d478cf.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`,
  );
  return data;
});

export const pizzasSlices = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state, actions) {
      state.items = actions.payload;
    },
  },

extraReducers: (builder) => {
  builder.addCase(fetchPizzas.pending, (state) => {
    state.items = [];
    state.status = Status.LOADING;
  });
  builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.items = action.payload;
  });
  builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
  });
}

  // extraReducers: {
  //   [fetchPizzas.pending]: (state) => {
  //     state.status = 'loading';
  //     state.items = [];
  //   },
  //   [fetchPizzas.fulfilled]: (state, actions) => {
  //     state.status = 'success';
  //     state.items = actions.payload;
  //   },
  //   [fetchPizzas.rejected]: (state) => {
  //     state.status = 'error';
  //     state.items = [];
  //   },
  // },
});
export const getPizzaData = (state: RootState) => state.pizzasSlices;

export const { setItems } = pizzasSlices.actions;
export default pizzasSlices.reducer;
