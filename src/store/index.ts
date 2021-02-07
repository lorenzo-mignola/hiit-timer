import Vue from 'vue';
import Vuex from 'vuex';
import db from '../db';
import { Workout } from '../types/index';
import newWorkout from './newWorkout';
import timer from './timer';

Vue.use(Vuex);

interface State {
  workouts: Workout[];
  error: boolean;
}

const store = new Vuex.Store({
  state: {
    workouts: [] as Workout[],
    error: false,
  },
  mutations: {
    SET_WORKOUTS(state: State, payload: Workout[]) {
      state.workouts = payload;
    },
    ERROR(state: State) {
      state.error = true;
    },
    CLOSE_ERROR(state: State) {
      state.error = false;
    },
  },
  actions: {
    async init({ commit }: { commit: (action: string, payload?: any) => void }) {
      try {
        const allDocs = await db.allDocs({ include_docs: true });
        const docs = allDocs.rows.map((d: any) => d.doc);
        commit('SET_WORKOUTS', docs);
      } catch (error) {
        commit('ERROR');
        console.error(error);
      }
    },
    closeError({ commit }: { commit: (action: string, payload?: any) => void }) {
      commit('CLOSE_ERROR');
    },
  },
  modules: {
    newWorkout,
    timer,
  },
});

export default store;
