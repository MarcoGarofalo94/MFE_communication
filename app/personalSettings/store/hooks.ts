import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppPersonalDispatch = () => useDispatch<AppDispatch>();
export const useAppPersonalSelector: TypedUseSelectorHook<RootState> = useSelector;