/* eslint-disable @typescript-eslint/camelcase */
import Vue from 'vue';
import Vuex from 'vuex';
import { Workout } from '../types/index';
import db from '../db';
import newWorkout from './newWorkout';
import timer from './timer';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    workouts: [] as Workout[],
  },
  mutations: {
    SET_WORKOUTS(state, payload) {
      state.workouts = payload;
    },
  },
  actions: {
    async init({ commit }) {
      try {
        const allDocs = await db.allDocs({ include_docs: true });
        const docs = allDocs.rows.map((d) => d.doc);
        commit('SET_WORKOUTS', docs);
      } catch (error) {
        console.error(error);
      }
    },
  },
  modules: {
    newWorkout,
    timer,
  },
});

export default store;
