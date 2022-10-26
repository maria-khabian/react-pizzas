import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { RootState } from '../store';

export type TCartItem = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    type: string;
    size: number;
    count: number;
}

export interface CartSlicesState {
  totalPrice: number;
  items: TCartItem[];
}

const { items, totalPrice} = getCartFromLS()

const initialState: CartSlicesState = {
  totalPrice,
  items,
};

export const cartSlices = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setAddItem(state, actions: PayloadAction<TCartItem>) {
      //debugger;
      const findItem = state.items.find((obj) => obj.id === actions.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...actions.payload,
          count: 1,
        });
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
    setMinusItem(state, actions: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === actions.payload);
      if (findItem) {
        findItem.count--;
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
    setRemoveItem(state, actions: PayloadAction<string>) {
       state.items = state.items.filter((obj) => obj.id !== actions.payload);  
       state.totalPrice = calcTotalPrice(state.items);
    },
    setClearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const getCartSelector = (state: RootState) => state.cartSlices;
export const getCartItemSelectorById = (id: string) => (state: RootState) =>
  state.cartSlices.items.find((obj) => obj.id === id);

export const { setAddItem, setMinusItem, setRemoveItem, setClearItems } = cartSlices.actions;
export default cartSlices.reducer;
