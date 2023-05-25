import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import loginReducer from "./redux/login/reducer";
import listNetwork from "./redux/network/reducer";
import listToken from "./redux/token/reducer";
export const store = configureStore({
  reducer: {
    login: loginReducer,
    network: listNetwork,
    token: listToken,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
