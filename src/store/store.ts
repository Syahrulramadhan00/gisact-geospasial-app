import { configureStore } from "@reduxjs/toolkit";
import { mapSlice } from "./features/mapSlices";
import { useDispatch, useSelector } from "react-redux";



export const makeStore = () => {
  return configureStore({
    reducer: {
      map: mapSlice.reducer,
    },
  });
};

// Infer the type of makeStore
type AppStore = ReturnType<typeof makeStore>;
type RootState = ReturnType<AppStore['getState']>;
type AppDispatch = AppStore['dispatch'];

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector = <TSelected extends unknown>(selector: (state: RootState) => TSelected): TSelected =>
  useSelector<RootState, TSelected>(selector);

