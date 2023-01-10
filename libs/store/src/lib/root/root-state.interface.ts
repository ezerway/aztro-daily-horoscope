import { AuthState } from "../auth/auth.slice";
import { HoroscopeState } from "../horoscope/horoscope.slice";

export interface RootState {
    auth: AuthState;
    horoscope: HoroscopeState;
}