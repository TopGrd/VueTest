export const FORMLIST_GET = 'FORMLIST_GET';
export const TABS_FETCH = 'TABS_FETCH';
export const AUTHLIST_FETCH = 'AUTHLIST_FETCH';
export const PAYDATA_CHANGE = 'PAYDATA_CHANGE';
export const PAYDATA_SET = 'PAYDATA_SET';
export const AUTHLIST_CHANGE = 'AUTHLIST_CHANGE';
export const PAYRESULT_CHANGE = 'PAYRESULT_CHANGE';
/* eslint-disable no-param-reassign */
export default {
  state: {
    authList: {
      list: [],
      isFetching: false
    },
    formList: {
      list: [],
      isFetching: false
    },
    tabs: {
      list: [],
      isFetching: false
    },
    payData: {
      payType: 9
    },
    payResult: {
      authResult: false,
      status: 'failed',
      text: '支付失败',
      msg: ''
    }
  },
  mutations: {
    [AUTHLIST_FETCH](state, authList) {
      Object.assign(state.authList.list, authList);
      state.authList.isFetching = true;
    },
    [AUTHLIST_CHANGE](state, obj) {
      const list = state.authList.list;
      const getInsert = item => item.key === obj.key;
      const index = list.findIndex(getInsert);
      list.splice(index, 1, obj);
    },
    [PAYRESULT_CHANGE](state, result) {
      Object.assign(state.payResult, result);
    },
    [TABS_FETCH](state, tabs) {
      Object.assign(state.tabs.list, tabs);
      state.tabs.isFetching = true;
    },
    [FORMLIST_GET](state, formList) {
      Object.assign(state.formList.list, formList);
      state.formList.isFetching = true;
    },
    [PAYDATA_CHANGE](state, data) {
      Object.assign(state.payData, data);
    },
    [PAYDATA_SET](state, data) {
      Object.assign(state.payData, data);
    }
  },
  actions: {
    [AUTHLIST_FETCH]({ commit }, authList) {
      commit(AUTHLIST_FETCH, authList);
    },
    [AUTHLIST_CHANGE]({ commit }, obj) {
      commit(AUTHLIST_CHANGE, obj);
    },
    [PAYRESULT_CHANGE]({ commit }, result) {
      commit(PAYRESULT_CHANGE, result);
    },
    [TABS_FETCH]({ commit }, tabs) {
      commit(TABS_FETCH, tabs);
    },
    [FORMLIST_GET]({ commit }, formList) {
      commit(FORMLIST_GET, formList);
    },
    [PAYDATA_CHANGE]({ commit }, data) {
      commit(PAYDATA_CHANGE, data);
    },
    [PAYDATA_SET]({ commit }, data) {
      commit(PAYDATA_SET, data);
    }
  }
};
