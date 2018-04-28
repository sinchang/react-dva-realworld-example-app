import * as userService from '../services/user';
import { saveToken } from '../utils/storage';
import { routerRedux } from 'dva/router';

export default {

  namespace: 'user',

  state: {
    user: null,
    isAuthenticated: false
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
    *login({ payload }, { call, put }) {
      const result = yield call(userService.login, payload);
      yield put({ type: 'save', payload: { user: result.data.user, isAuthenticated: true  }});
      saveToken(result.data.user.token);
      yield put(routerRedux.push('/'));
    },
    *current({ payload }, { call, put }) {
      const result = yield call(userService.current);
      yield put({ type: 'save', payload: { user: result.data.user, isAuthenticated: true }});
    },
    *register({ payload }, { call, put }) {
      try {
        const result = yield call(userService.register, payload);
        yield put({ type: 'save', payload: { user: result.data.user, isAuthenticated: true }});
        saveToken(result.data.user.token);
        yield put(routerRedux.push('/'));
      } catch(e) {
        console.log(e.response)
      }
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
