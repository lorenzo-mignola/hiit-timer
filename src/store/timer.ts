import { Module } from 'vuex';
import { extractSingleValue } from '@/util';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const newWorkouts: Module<any, unknown> = {
  namespaced: true,
  state: () => ({
    sec: 0,
    min: 0,
    hour: 0,
    totalInvariable: 1000,
  }),
  mutations: {
    SET_SEC(state, payload) {
      state.sec = payload;
    },
    SET_MIN(state, payload) {
      state.min = payload;
    },
    SET_HOUR(state, payload) {
      state.hour = payload;
    },
    SET_TOTAL_INVARIABLE(state, payload) {
      state.totalInvariable = payload;
    },
    RESET(state) {
      state.total = state.totalInvariable;
    },
  },
  actions: {
    setSec({ commit }, value) {
      commit('SET_SEC', value);
    },
    setMin({ commit }, value) {
      commit('SET_MIN', value);
    },
    setHour({ commit }, value) {
      commit('SET_HOUR', value);
    },
    fromTotalToSingleValue({ commit }, ms) {
      const { hour, minute, second } = extractSingleValue(ms);
      commit('SET_SEC', second);
      commit('SET_MIN', minute);
      commit('SET_HOUR', hour);
    },
    setTotalInvariable({ getters, commit }) {
      commit('SET_TOTAL_INVARIABLE', getters.total);
    },
    reset({ commit, state, dispatch }) {
      if (state.totalInvariable) {
        dispatch('fromTotalToSingleValue', state.totalInvariable);
        commit('RESET');
      }
    },
  },
  getters: {
    total: (state) => {
      const s = state.sec * 1000;
      const m = state.min * 60000;
      const h = state.hour * 3600000;
      return s + m + h;
    },
  },
};

export default newWorkouts;
