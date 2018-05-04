import * as articlesService from '../services/articles';
import pathToRegexp from 'path-to-regexp';
import { routerRedux } from 'dva/router';
const DEFAULT = {
  title: '',
  body: '',
  description: '',
  slug: '',
  tagList: [],
  tagInput: ''
}

export default {

  namespace: 'editor',

  state: DEFAULT,

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        const match = pathToRegexp('/editor/:slug').exec(pathname);
        if (pathname === '/editor') {
          dispatch({
            type: 'clear'
          })
        }
        if (match) {
          const slug = match[1];
          dispatch({
            type: 'get',
            payload: {
              slug
            }
          })
        }
      });
    },
  },

  effects: {
    *onUpdateField({ payload }, { put }) {
      yield put({ type: 'save', payload})
    },
    *clear({ payload }, { put }) {
      yield put({ type: 'save', payload: DEFAULT })
    },
    *update({ payload }, { put, call }) {
      yield call(articlesService.update, payload)
      yield put({ type: 'save', payload: payload.article})
      yield put(routerRedux.push(`/article/${payload.slug}`));
    },
    *create({ payload }, { put, call }) {
      const result = yield call(articlesService.create, payload.article)
      yield put({ type: 'save', payload: payload.article})
      yield put(routerRedux.push(`/article/${result.data.article.slug}`));
    },
    *onAddTag({ payload }, { select, put }) {
      const { tagInput, tagList } = yield select(({ editor }) => editor)
      tagList.push(tagInput)
      yield put({ type: 'save', payload: {
        tagList,
        tagInput: ''
      }})
    },
    *onRemoveTag({ payload }, { select, put }) {
      const { tagList } = yield select(({ editor }) => editor)
      const removeTag = payload.tag
      const newTagList = []
      tagList.forEach((tag, index) => {
        if (tag !== removeTag) {
          newTagList.push(tag)
        }
      })
      yield put({ type: 'save', payload: {
        tagList: newTagList,
      }})
    },
    *get({ payload }, { call, put }) {
      const result = yield call(articlesService.get, payload.slug);
      const article = result.data.article;
      yield put({ type: 'save', payload: {
        title: article.title,
        body: article.body,
        description: article.description,
        slug: article.slug,
        tagList: article.tagList
      }});
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
