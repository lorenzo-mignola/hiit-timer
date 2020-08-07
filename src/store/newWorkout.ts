import { v4 } from 'uuid';
import { Module } from 'vuex';
import db from '@/db';
import router from '@/router';
import { Workout } from '../types/index';

const initalState: Workout = {
  name: '',
  workRep: 0,
  workTime: 0,
  restTime: 0,
  restEnd: false,
};

function isEmpty(state: Workout): boolean {
  const { name, workRep, workTime } = state;
  let empty = false;
  if (name === '') {
    empty = true;
  }
  if (workRep === 0) {
    empty = true;
  }
  if (workTime === 0) {
    empty = true;
  }
  return empty;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const newWorkouts: Module<any, unknown> = {
  namespaced: true,
  state: (): Workout => ({
    ...initalState,
  }),
  mutations: {
    INCREMENT_REPS(state) {
      state.workRep += 1;
    },
    DECREMENT_REPS(state) {
      state.workRep -= 1;
    },
    CLEAR(state) {
      Object.assign(state, initalState);
    },
    SET_WORK_TIME(state, payload) {
      state.workTime = payload;
    },
    SET_REST_TIME(state, payload) {
      state.restTime = payload;
    },
    SET_END_REST(state, payload) {
      state.restEnd = payload;
    },
    SET_NAME(state, payload) {
      state.name = payload;
    },
  },
  actions: {
    incrementReps({ commit }) {
      commit('INCREMENT_REPS');
    },
    decrementReps({ commit, state }) {
      if (state.workRep > 0) {
        commit('DECREMENT_REPS');
      }
    },
    clearNew({ commit }) {
      commit('CLEAR');
    },
    setWorkTime({ commit }, value) {
      commit('SET_WORK_TIME', value);
    },
    setRestTime({ commit }, value) {
      commit('SET_REST_TIME', value);
    },
    setEndRest({ commit }, value) {
      commit('SET_END_REST', value);
    },
    setName({ commit }, value) {
      commit('SET_NAME', value);
    },
    async saveWorkout({ commit, state }) {
      try {
        if (!isEmpty(state)) {
          const res = await db.put({
            _id: v4(),
            creationDate: new Date(),
            ...state,
          });
          if (res.ok) {
            commit('CLEAR');
            router.push({ path: '/' });
          } else {
            throw new Error('Error during saving');
          }
        } else {
          throw new Error('Missing data');
        }
      } catch (error) {
        commit('ERROR', null, { root: true });
        console.error(error);
      }
    },
  },
};

export default newWorkouts;
