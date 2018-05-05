import * as articlesService from '../services/articles';
import pathToRegexp from 'path-to-regexp';
import { routerRedux } from 'dva/router';

export default {

  namespace: 'articles',

  state: {
    articles: [],
    article: null,
    tag: '',
    tab: 'all',
    articlesCount: 0,
    currentPage: 0
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
            type: 'tags/fetch'
          });
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
      yield put({ type: 'save', payload: { 
        articles: result.data.articles,
        articlesCount: result.data.articlesCount
      }});
    },
    *feed({ payload }, { call, put }) {
      const result = yield call(articlesService.feed);
      yield put({ type: 'save', payload: { 
        articles: result.data.articles,
        articlesCount: result.data.articlesCount
      }});
    },
    *del({ payload }, { call, put }) {
      yield call(articlesService.del, payload.slug);
      yield put({ type: 'save', payload: { article: null } });
      yield put(routerRedux.push('/'));
    },
    *get({ payload }, { call, put }) {
      const result = yield call(articlesService.get, payload.slug);
      yield put({ type: 'save', payload: { article: result.data.article } });
      yield put({ type: 'profile/save', payload: { user: result.data.article.author } });
    },
    *favorite({ payload }, { select, call, put }) {
      const articles = yield select(({ articles }) => articles.articles);
      const result = yield call(articlesService.favorite, payload.slug);
      const article = result.data.article;
      const newArticles = articles.map(item => {
        if (item.slug === article.slug) {
          return {
            ...item,
            favorited: article.favorited,
            favoritesCount: article.favoritesCount
          }
        }
        return item;
      })
      yield put({ type: 'save', payload: { articles: newArticles, article } });
    },
    *unFavorite({ payload }, { select, call, put }) {
      const articles = yield select(({ articles }) => articles.articles);
      const result = yield call(articlesService.unFavorite, payload.slug);
      const article = result.data.article;
      const newArticles = articles.map(item => {
        if (item.slug === article.slug) {
          return {
            ...item,
            favorited: article.favorited,
            favoritesCount: article.favoritesCount
          }
        }
        return item;
      })
      yield put({ type: 'save', payload: { articles: newArticles, article } });
    },
    *addTag({ payload }, { put }) {
      yield put({ type: 'save', payload })
    },
    *onSetPage({ payload }, { put, call, select }) {
      const state = yield select(state => state);
      yield put({ type: 'save', payload });
      const params = {
        offset: payload.currentPage * 10
      };
      const type = payload.type;
      let result;
      if (type === 'tag') {
        params.tag = state.articles.tag
      }

      if (type === 'my') {
        params.author = state.profile.user.username
      }

      if (type === 'favorited') {
        params.favorited = state.profile.user.username
      }

      if (type === 'feed') {
        result = yield call(articlesService.feed,  params);
      } else {
        result = yield call(articlesService.fetch,  params);
      }

      yield put({ type: 'save', payload: { 
        articles: result.data.articles
      }});
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
