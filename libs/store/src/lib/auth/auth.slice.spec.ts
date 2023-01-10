import { doAuthorize, authAdapter, authReducer } from './auth.slice';

describe('auth reducer', () => {
  it('should handle initial state', () => {
    const expected = authAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(authReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchAuths', () => {
    let state = authReducer(undefined, doAuthorize.pending('', { config: {} }));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    );

    state = authReducer(state, doAuthorize.fulfilled({ id: "1" }, '', { config: {} }));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    );

    state = authReducer(
      state,
      doAuthorize.rejected(new Error('Uh oh'), '', { config: {} })
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { 1: { id: 1 } },
      })
    );
  });
});
