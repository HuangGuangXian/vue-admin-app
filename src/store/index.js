import Vue from 'vue';
import Vuex from 'vuex';
import { setCookie, getCookie, removeCookie } from '@/utils/user';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    collapsed: false,
    userInfo: getCookie(),
    menuRoutes: [],
  },
  mutations: {
    changeCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
      setCookie(state.userInfo);
    },
    loginOut(state) {
      state.userInfo = {};
      removeCookie();
    },
    setMenuRoutes(state, payload) {
      state.menuRoutes = payload;
    },
  },
  actions: {
    changeCollapsed({ commit }) {
      commit('changeCollapsed');
    },
    setUserInfo({ commit }, userInfo) {
      commit('setUserInfo', userInfo);
    },
    loginOut({ commit }) {
      commit('loginOut');
    },
    setMenuRoutes({ commit }, menuRoutes) {
      commit('setMenuRoutes', menuRoutes);
    },
  },
  modules: {
  },
});
