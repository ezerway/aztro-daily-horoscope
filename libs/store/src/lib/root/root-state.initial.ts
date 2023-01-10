import { initialAuthState } from "../auth/auth.slice";
import { initialHoroscopeState } from "../horoscope/horoscope.slice";
import { RootState } from "./root-state.interface";

export const initialRootState: RootState = {
    auth: initialAuthState,
    horoscope: initialHoroscopeState,
}
