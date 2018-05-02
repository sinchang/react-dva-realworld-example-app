import * as profileService from '../services/profile';
import pathToRegexp from 'path-to-regexp';

export default {

  namespace: 'profile',

  state: {
    user: null,
    tab: 'my'
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        const match = pathToRegexp('/@:username').exec(pathname);
        const matchFavorites = pathToRegexp('/@:username/favorites').exec(pathname);

        if (match) {
          const username = match[1]
          dispatch({ type: 'fetch', payload: { username } });
          dispatch({ type: 'articles/fetch', payload: { author: username } })
          dispatch({ type: 'update', payload: { tab: 'my' }})
        }

        if (matchFavorites) {
          const username = matchFavorites[1]
          dispatch({ type: 'fetch', payload: { username } });
          dispatch({ type: 'articles/fetch', payload: { favorited: username } })
          dispatch({ type: 'update', payload: { tab: 'favorited' }})
        }
      });
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const result = yield call(profileService.fetch, payload.username);
      yield put({ type: 'save', payload: { user: result.data.profile } });
    },
    *update({ payload }, { put }) {
      yield put({ type: 'save', payload: { tab: payload.tab }})
    },
    *follow({ payload }, { select, put, call }) {
      // const article = yield select(({ articles })=> articles.article);
      // article.author.following = true;
      const result = yield call(profileService.follow, payload.username);
      yield put({ type: 'save', payload: { user: result.data.profile } });
      // yield put({ type: 'articles/save', payload: { article } });
    },
    *unfollow({ payload }, { select, put, call }) {
      // const article = yield select(({ articles })=> articles.article);
      // article.author.following = false;
      const result = yield call(profileService.unfollow, payload.username);
      yield put({ type: 'save', payload: { user: result.data.profile } });
      // yield put({ type: 'articles/save', payload: { article } });
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
