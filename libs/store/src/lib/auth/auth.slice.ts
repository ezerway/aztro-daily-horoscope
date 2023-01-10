import { AdhAuth } from '@aztro-daily-horoscope/models';
import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';

import { AuthConfiguration, authorize, refresh, revoke } from 'react-native-app-auth';
import { LoadingStatus, LoadingStatusEnum } from '../models/loading-status.type';

export const AUTH_FEATURE_KEY = 'auth';

/*
 * Update these interfaces according to your requirements.
 */
export interface AuthEntity extends AdhAuth {
}

export interface AuthState extends EntityState<AuthEntity> {
  loadingStatus: LoadingStatus;
  error?: string;
  hasLoggedInOnce: boolean,
  accessToken: string,
  accessTokenExpirationDate: string,
  refreshToken: string
}

export const authAdapter = createEntityAdapter<AuthEntity>();

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
 *   dispatch(fetchAuth())
 * }, [dispatch]);
 * ```
 */
export const doAuthorize = createAsyncThunk<AdhAuth, { config: any }>(
  'auth/authorize',
  async ({ config }, { rejectWithValue }) => {
    try {
      const authState = await authorize(config as AuthConfiguration);
      console.log(authState)
      return {
        id: authState.idToken,
        hasLoggedInOnce: true,
        accessToken: authState.accessToken,
        accessTokenExpirationDate: authState.accessTokenExpirationDate,
        refreshToken: authState.refreshToken
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const doRefresh = createAsyncThunk<AdhAuth, { config: any, refreshToken: string }>(
  'auth/refresh',
  async ({ config, refreshToken }, { rejectWithValue }) => {
    try {
      const authState = await refresh(config as AuthConfiguration, {
        refreshToken: refreshToken
      });

      return {
        id: authState.idToken,
        hasLoggedInOnce: true,
        accessToken: authState.accessToken || '',
        accessTokenExpirationDate: authState.accessTokenExpirationDate || '',
        refreshToken: authState.refreshToken || ''
      }
  
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const doRevoke = createAsyncThunk<AdhAuth, { config: any, accessToken: string }>(
  'auth/revoke',
  async ({ config, accessToken }, { rejectWithValue }) => {
    try {
      await await revoke(config, {
        tokenToRevoke: accessToken,
        sendClientId: true
      });

      return {
        accessToken: '',
        accessTokenExpirationDate: '',
        refreshToken: ''
      }
  
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const initialAuthState: AuthState = authAdapter.getInitialState({
  loadingStatus: LoadingStatusEnum.NotLoaded,
  error: '',
  hasLoggedInOnce: false,
  accessToken: '',
  accessTokenExpirationDate: '',
  refreshToken: ''
});

export const authSlice = createSlice({
  name: AUTH_FEATURE_KEY,
  initialState: initialAuthState,
  reducers: {
    add: authAdapter.addOne,
    remove: authAdapter.removeOne,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(doAuthorize.pending, (state: AuthState) => {
        state.loadingStatus = LoadingStatusEnum.Loading;
      })
      .addCase(
        doAuthorize.fulfilled,
        (state: AuthState, action: PayloadAction<AuthEntity>) => {
          authAdapter.setAll(state, [action.payload]);
          state.hasLoggedInOnce = true;
          state.accessToken = action.payload.accessToken || '';
          state.accessTokenExpirationDate = action.payload.accessTokenExpirationDate || '';
          state.refreshToken = action.payload.refreshToken || '';
          state.loadingStatus = LoadingStatusEnum.Loaded;
        }
      )
      .addCase(doAuthorize.rejected, (state: AuthState, action) => {
        state.loadingStatus = LoadingStatusEnum.Error;
        state.error = action.error.message || '';
      })
      .addCase(doRefresh.pending, (state: AuthState) => {
        state.loadingStatus = LoadingStatusEnum.Loading;
      })
      .addCase(
        doRefresh.fulfilled,
        (state: AuthState, action: PayloadAction<AuthEntity>) => {
          authAdapter.setAll(state, [action.payload]);
          state.hasLoggedInOnce = true;
          state.accessToken = action.payload.accessToken || '';
          state.accessTokenExpirationDate = action.payload.accessTokenExpirationDate || '';
          state.refreshToken = action.payload.refreshToken || '';
          state.loadingStatus = LoadingStatusEnum.Loaded;
        }
      )
      .addCase(doRefresh.rejected, (state: AuthState, action) => {
        state.loadingStatus = LoadingStatusEnum.Error;
        state.error = action.error.message || '';
      })
      .addCase(doRevoke.pending, (state: AuthState) => {
        state.loadingStatus = LoadingStatusEnum.Loading;
      })
      .addCase(
        doRevoke.fulfilled,
        (state: AuthState) => {
          authAdapter.setAll(state, []);
          state.hasLoggedInOnce = false;
          state.accessToken = '';
          state.accessTokenExpirationDate = '';
          state.refreshToken = '';
          state.loadingStatus = LoadingStatusEnum.Loaded;
        }
      )
      .addCase(doRevoke.rejected, (state: AuthState, action) => {
        state.loadingStatus = LoadingStatusEnum.Error;
        state.error = action.error.message || '';
      });
  },
});

/*
 * Export reducer for store configuration.
 */
export const authReducer = authSlice.reducer;

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
 *   dispatch(authActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const authActions = {...authSlice.actions, doAuthorize, doRefresh, doRevoke };

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllAuth);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = authAdapter.getSelectors();

export const getAuthState = (rootState: any): AuthState =>
  rootState[AUTH_FEATURE_KEY];

export const getAuthAccessToken = (rootState: any) => getAuthState(rootState).accessToken;
export const getAuthRefeshToken = (rootState: any) => getAuthState(rootState).refreshToken;
export const getAuthLoadingStatus = (rootState: any) => getAuthState(rootState).loadingStatus;
export const getAuthAccessTokenExpirationDate = (rootState: any) => getAuthState(rootState).accessTokenExpirationDate;

export const selectAllAuth = createSelector(getAuthState, selectAll);

export const selectAuthEntities = createSelector(getAuthState, selectEntities);

export const authSelectors = {
  getAuthAccessToken,
  getAuthRefeshToken,
  getAuthLoadingStatus,
  getAuthAccessTokenExpirationDate,
  selectAllAuth,
  selectAuthEntities,
}
