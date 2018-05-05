import * as commentsService from '../services/comments';
import pathToRegexp from 'path-to-regexp';

export default {

  namespace: 'comments',

  state: {
    comments: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        const matchArticle = pathToRegexp('/article/:slug').exec(pathname);
        if (matchArticle) {
          const slug = matchArticle[1];
          dispatch({ type: 'fetch', payload: slug });
        }
      });
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const result = yield call(commentsService.fetch, payload);
      yield put({ type: 'save', payload: { comments: result.data.comments }});
    },
    *create({ payload }, { select, call, put }) {
      const comments = yield select(({ comments }) => comments.comments);
      const result = yield call(commentsService.create, payload.slug, payload.body);
      yield put({ type: 'save', payload: { comments: [result.data.comment, ...comments] }});
    },
    *del({ payload }, { select, call, put }) {
      const comments = yield select(({ comments }) => comments.comments);
      yield call(commentsService.del, payload.slug, payload.id);
      const newComments = [];
      comments.forEach(comment => {
        if (comment.id !== payload.id) {
          newComments.push(comment)
        }
      });
      yield put({ type: 'save', payload: { comments: newComments }});
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
