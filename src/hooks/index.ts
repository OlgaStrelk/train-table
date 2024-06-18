import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook,
  } from "react-redux";
import { RootState, store } from "../services/store";
  
  export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;
  export type AppDispatch = typeof store.dispatch;
  export const useAppDispatch = dispatchHook.withTypes<AppDispatch>();