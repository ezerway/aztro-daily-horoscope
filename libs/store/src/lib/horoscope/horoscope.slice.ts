import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import { AdhHoroscope, AdhHoroscopeDay, AdhZodiacSign, AdhZodiacSignItem } from '@aztro-daily-horoscope/models';
import { transfromAztroHoroscpeResponseToAdhHoroscope, aztroService } from '@aztro-daily-horoscope/services';
import { LoadingStatus, LoadingStatusEnum } from '../models/loading-status.type';

export const HOROSCOPE_FEATURE_KEY = 'horoscope';

/*
 * Update these interfaces according to your requirements.
 */
export interface HoroscopeEntity extends AdhHoroscope {
}

export interface HoroscopeState extends EntityState<HoroscopeEntity> {
  loadingStatus: LoadingStatus;
  error?: string | undefined | null;
  zodiacSignItem?: AdhZodiacSignItem;
  horoscope?: AdhHoroscope;
  day?: AdhHoroscopeDay;
}

export const horoscopeAdapter = createEntityAdapter<HoroscopeEntity>();

/**
 * Export an effect using createAsyncThunk from
 * the Redux Toolkit: https://redux-toolkit.js.org/api/createAsyncThunk
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(fetchHoroscope())
 * }, [dispatch]);
 * ```
 */
export const fetchHoroscope = createAsyncThunk<AdhHoroscope, { zodiacSign: AdhZodiacSign, day: AdhHoroscopeDay }>(
  'horoscope/fetchStatus',
  async ({ zodiacSign, day }, { rejectWithValue }) => {
    try {
      const horoscopeResponse = await aztroService.getHoroscope(zodiacSign, day);
      return transfromAztroHoroscpeResponseToAdhHoroscope(horoscopeResponse);
    } catch (error) {
      return rejectWithValue({ error })
    }
  }
);

export const initialHoroscopeState: HoroscopeState =
  horoscopeAdapter.getInitialState({
    loadingStatus: LoadingStatusEnum.NotLoaded,
    error: null,
  });

export const horoscopeSlice = createSlice({
  name: HOROSCOPE_FEATURE_KEY,
  initialState: initialHoroscopeState,
  reducers: {
    add: horoscopeAdapter.addOne,
    remove: horoscopeAdapter.removeOne,
    setUserZodiacSignItem: (state: HoroscopeState, action: PayloadAction<AdhZodiacSignItem>) => {
      state.zodiacSignItem = action.payload;
    },
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHoroscope.pending, (state: HoroscopeState) => {
        state.loadingStatus = LoadingStatusEnum.Loading;
      })
      .addCase(
        fetchHoroscope.fulfilled,
        (state: HoroscopeState, action: PayloadAction<HoroscopeEntity>) => {
          horoscopeAdapter.setAll(state, [action.payload]);
          state.horoscope = action.payload;
          state.loadingStatus = LoadingStatusEnum.Loaded;
        }
      )
      .addCase(fetchHoroscope.rejected, (state: HoroscopeState, action) => {
        state.loadingStatus = LoadingStatusEnum.Error;
        state.error = action.error.message;
      });
  },
});

/*
 * Export reducer for store configuration.
 */
export const horoscopeReducer = horoscopeSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(horoscopeActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const horoscopeActions = { fetchHoroscope, ...horoscopeSlice.actions };

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllHoroscope);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = horoscopeAdapter.getSelectors();

export const getHoroscopeState = (rootState: any): HoroscopeState =>
  rootState[HOROSCOPE_FEATURE_KEY];

export const getUserZodiacItem = (rootState: any): AdhZodiacSignItem | undefined =>
  getHoroscopeState(rootState).zodiacSignItem;

export const getUserZodiac = (rootState: any): AdhZodiacSign | undefined =>
  getUserZodiacItem(rootState)?.zodiacSign;

export const getUserHoroscope = (rootState: any): AdhHoroscope | undefined =>
  getHoroscopeState(rootState).horoscope;

export const getHoroscopeLoadingStatus = (rootState: any): LoadingStatus =>
    getHoroscopeState(rootState).loadingStatus;

export const selectAllHoroscope = createSelector(getHoroscopeState, selectAll);

export const selectHoroscopeEntities = createSelector(
  getHoroscopeState,
  selectEntities
);

export const horoscopeSelectors = {
  getHoroscopeState,
  getUserZodiacItem,
  getUserZodiac,
  getUserHoroscope,
  getHoroscopeLoadingStatus,
};
