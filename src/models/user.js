import * as userService from '../services/user';
import { saveToken, destroyToken } from '../utils/storage';
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
    *update({ payload }, { call, put }) {
      const result = yield call(userService.update, payload.user);
      yield put({ type: 'save', payload: { user: result.data.user, isAuthenticated: true }});
      yield put(routerRedux.push('/'));
    },
    *logout({ payload }, { call, put }) {
      destroyToken()
      yield put({ type: 'save', payload: { user: null, isAuthenticated: false }});
      yield put(routerRedux.push('/'));
    },
    *register({ payload }, { call, put }) {
      const result = yield call(userService.register, payload);
      yield put({ type: 'save', payload: { user: result.data.user, isAuthenticated: true }});
      saveToken(result.data.user.token);
      yield put(routerRedux.push('/'));
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
