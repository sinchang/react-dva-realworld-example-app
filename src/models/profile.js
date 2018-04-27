import * as profileService from '../services/profile';
import pathToRegexp from 'path-to-regexp';

export default {

  namespace: 'profile',

  state: {
    user: null,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        const match = pathToRegexp('/@:username').exec(pathname);
        const matchFavorites = pathToRegexp('/@:username/favorites').exec(pathname);
        console.log(matchFavorites[1])
        if (match) {
          const username = match[1]
          dispatch({ type: 'fetch', payload: { username } });
          dispatch({ type: 'articles/fetch', payload: { author: username } })
        }

        if (matchFavorites) {
          const username = matchFavorites[1]
          dispatch({ type: 'fetch', payload: { username } });
          dispatch({ type: 'articles/fetch', payload: { favorited: username } })
        }
      });
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const result = yield call(profileService.fetch, payload.username);
      yield put({ type: 'save', payload: { user: result.data.profile } });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
