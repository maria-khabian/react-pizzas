import { configureStore } from '@reduxjs/toolkit';
import filterSlices from './slices/filterSlices';
import cartSlices from './slices/cartSlices';
import pizzasSlices from './slices/pizzasSlices';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    filterSlices,
    cartSlices,
    pizzasSlices,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

//console.log(configureStore);
//console.log(store);
