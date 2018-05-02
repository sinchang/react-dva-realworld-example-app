import * as articlesService from '../services/articles';
import pathToRegexp from 'path-to-regexp';

export default {

  namespace: 'articles',

  state: {
    articles: [],
    article: null,
    tag: '',
    tab: 'all'
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        const matchArticle = pathToRegexp('/article/:slug').exec(pathname);
        const matchTag = pathToRegexp('/tag/:tag').exec(pathname);

        if (matchArticle) {
          const slug = matchArticle[1];
          dispatch({
            type: 'get',
            payload: {
              slug
            },
          });
        }

        if (matchTag) {
          const tag = matchTag[1];

          dispatch({ type: 'fetch', payload: { tag } });
          
          dispatch({
            type: 'addTag',
            payload: {
              tag,
              tab: 'tag'
            },
          });

          dispatch({
            type: 'tags/fetch'
          });
        }

        if (pathname === '/') {
          dispatch({ type: 'fetch' });
          dispatch({
            type: 'addTag',
            payload: {
              tag: '',
              tab: 'all'
            },
          });
        }

        if (pathname === '/feed') {
          dispatch({ type: 'feed' });
          dispatch({
            type: 'addTag',
            payload: {
              tag: '',
              tab: 'feed'
            },
          });
        }
      });
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const result = yield call(articlesService.fetch,  payload);
      yield put({ type: 'save', payload: { articles: result.data.articles } });
    },
    *feed({ payload }, { call, put }) {
      const result = yield call(articlesService.feed);
      yield put({ type: 'save', payload: { articles: result.data.articles } });
    },
    *get({ payload }, { call, put }) {
      const result = yield call(articlesService.get, payload.slug);
      yield put({ type: 'save', payload: { article: result.data.article } });
      yield put({ type: 'profile/save', payload: { user: result.data.article.author } });
    },
    *favorite({ payload }, { call, put }) {
      const result = yield call(articlesService.favorite, payload.slug);
      yield put({ type: 'save', payload: { article: result.data.article } });
    },
    *unFavorite({ payload }, { call, put }) {
      const result = yield call(articlesService.unFavorite, payload.slug);
      yield put({ type: 'save', payload: { article: result.data.article } });
    },
    *addTag({ payload }, { put }) {
      yield put({ type: 'save', payload })
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
