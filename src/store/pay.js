export const FORMLIST_GET = 'FORMLIST_GET';
export const TABS_FETCH = 'TABS_FETCH';
export const TABS_CHANGE = 'TABS_CHANGE';
export const AUTHLIST_FETCH = 'AUTHLIST_FETCH';
export const PAYDATA_CHANGE = 'PAYDATA_CHANGE';
export const PAYDATA_RESET = 'PAYDATA_RESET';
export const PAYDATA_SET = 'PAYDATA_SET';
export const AUTHLIST_CHANGE = 'AUTHLIST_CHANGE';
export const PAYRESULT_CHANGE = 'PAYRESULT_CHANGE';
export const TABLEDATA_SET = 'TABLEDATA_SET';
export const TABLEDATA_CHANGE = 'TABLEDATA_CHANGE';
export const LOCALDATA_GET = 'LOCALDATA_GET';
/* eslint-disable no-param-reassign */
export default {
  state: {
    localData: [],
    authList: {
      list: [],
      isFetching: false
    },
    formList: {
      list: {},
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
      msg: '',
      isFetching: false
    },
    tableData: [],
    dataCache: []
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
      if (index > -1) {
        list.splice(index, 1, obj);
      }
    },
    [PAYRESULT_CHANGE](state, result) {
      Object.assign(state.payResult, result);
    },
    [TABS_FETCH](state, tabs) {
      Object.assign(state.tabs.list, tabs);
      state.tabs.isFetching = true;
    },
    [TABS_CHANGE](state, pack) {
      let lists = state.tabs.list[pack.listIndex].formList.slice(0);
      let payType = state.tabs.list[pack.listIndex].payType;
      let label = state.tabs.list[pack.listIndex].label;
      const getInsert = item => item.key === pack.obj.key;
      const id = lists.findIndex(getInsert);
      if (id > -1) {
        lists.splice(id, 1, pack.obj);
        let formObj = {
          formList: lists,
          label,
          payType
        };
        state.tabs.list.splice(pack.listIndex, 1, formObj);
      }
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
    },
    [PAYDATA_RESET](state) {
      state.payData = {};
      state.tableData = [];
    },
    [TABLEDATA_SET](state, data) {
      const arr = Object.entries(data);
      arr.map((item) => {
        const obj = {};
        obj.key = item[0];
        obj.value = item[1];
        state.tableData.push(obj);
        return obj;
      });
    },
    [TABLEDATA_CHANGE](state, obj) {
      let patch = {};
      patch.key = Object.keys(obj)[0];
      patch.value = obj[patch.key];
      let list = state.tableData;
      let getInsert = item => item.key === patch.key;
      let index = list.findIndex(getInsert);
      list.splice(index, 1, patch);
    },
    [LOCALDATA_GET](state) {
      console.log(localStorage);
      console.log(window.localStorage);
      const dataMap = Object.entries(localStorage).filter(item => item[0] !== 'jfVersion');
      dataMap.forEach((item) => {
        const temp = {};
        const key = item[0];
        const value = item[1];
        temp[key] = JSON.parse(value);
        if (state.dataCache.indexOf(key) < 0) {
          state.localData.push(temp);
          state.dataCache.push(key);
        }
      });
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
    [TABS_CHANGE]({ commit }, pack) {
      commit(TABS_CHANGE, pack);
    },
    [FORMLIST_GET]({ commit }, formList) {
      commit(FORMLIST_GET, formList);
    },
    [PAYDATA_CHANGE]({ commit }, data) {
      commit(PAYDATA_CHANGE, data);
    },
    [PAYDATA_SET]({ commit }, data) {
      commit(PAYDATA_SET, data);
    },
    [TABLEDATA_SET]({ commit }, data) {
      commit(TABLEDATA_SET, data);
    },
    [TABLEDATA_CHANGE]({ commit }, obj) {
      commit(TABLEDATA_CHANGE, obj);
    },
    [PAYDATA_RESET]({ commit }) {
      commit(PAYDATA_RESET);
    },
    [LOCALDATA_GET]({ commit }) {
      commit(LOCALDATA_GET);
    }
  }
};
