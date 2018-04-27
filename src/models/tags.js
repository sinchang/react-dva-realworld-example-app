import * as tagsService from '../services/tags';

export default {

  namespace: 'tags',

  state: {
    tags: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const tags = yield call(tagsService.fetch, {});
      yield put({ type: 'save', payload: { tags: tags.data.tags } });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
