<template>
  <div>
    <div class="workouts">
      <h2>Your Workout</h2>
      <div v-if="workouts.length === 0" class="no-workout">
        <h4>No workout created</h4>
        <h5>Click the "+" button to create a new workout</h5>
      </div>
      <WorkoutCard v-for="workout in workoutsSorted" :key="workout._id" :workout="workout" />
    </div>
    <Footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Workout } from '@/types';
import { Action, State } from 'vuex-class';
import { getTime, parseJSON } from 'date-fns';
import WorkoutCard from './WorkoutCard.vue';
import Footer from './Footer.vue';

@Component({
  components: { WorkoutCard, Footer },
})
export default class Home extends Vue {
  @Action('init') init!: () => void;

  @State('workouts') workouts!: Workout[];

  get workoutsSorted() {
    return this.workouts
      ? this.workouts.sort((a, b) => {
        if (
          (getTime(parseJSON(a.creationDate || '')) || 0)
            > (getTime(parseJSON(b.creationDate || '')) || 0)
        ) {
          return 1;
        }
        if (
          getTime(parseJSON(a.creationDate || '') || 0)
            < (getTime(parseJSON(b.creationDate || '')) || 0)
        ) {
          return -1;
        }
        return 0;
      })
      : [];
  }

  mounted() {
    this.init();
  }
}
</script>

<style lang="scss" scoped>
@import '../../main.scss';
.no-workout {
  margin-top: 70px;
}
.workouts {
  padding-left: 16px;
  padding: 12px;
  overflow-y: scroll;
  max-height: calc(90vh - 23px);
  /* Scroll */
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: adjust-color($color: $primary, $alpha: -0.7);
    border-radius: 8px;
  }
  &::-webkit-scrollbar-button {
    background-color: transparent;
    display: none;
  }
  /* Scroll */
}
</style>
