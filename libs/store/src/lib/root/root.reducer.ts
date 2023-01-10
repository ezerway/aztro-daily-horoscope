import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "../auth/auth.slice";
import { horoscopeSlice } from "../horoscope/horoscope.slice";
import { RootState } from "./root-state.interface";

export const rootReducer =  combineReducers<RootState>({
    auth: authSlice.reducer,
    horoscope: horoscopeSlice.reducer,
})