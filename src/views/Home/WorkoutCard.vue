<template>
  <div class="card" @click="goToWorkout">
    <h4>{{ workout.name }}</h4>
    <div class="details">
      <div>
        <span>Total: </span><span class="value">{{ formatTime(total) }}</span>
      </div>
      <div>
        <span>Work: </span><span class="value">{{ formatTime(workout.workTime) }}</span>
      </div>
      <div>
        <span>Rest: </span><span class="value">{{ formatTime(workout.restTime) }}</span>
      </div>
      <div>
        <span>Reps: </span><span class="value">{{ workout.workRep }}x</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import prettyMilliseconds from 'pretty-ms';
import { Workout } from '../../types';

  @Component
export default class WorkoutCard extends Vue {
    @Prop({ default: null, required: true }) workout!: Workout;

    get total() {
      const {
        workRep, workTime, restTime, restEnd,
      } = this.workout;
      const wt = workRep * workTime;
      const rt = restTime * (restEnd ? workRep : workRep - 1);
      return workRep > 1 ? wt + rt : wt + restTime;
    }

    formatTime(ms: number) {
      return prettyMilliseconds(ms, { colonNotation: true });
    }

    goToWorkout() {
      // eslint-disable-next-line no-underscore-dangle
      this.$router.push({ path: `/workout/${this.workout._id}` });
    }
}
</script>

<style lang="scss" scoped>
  @import '../../main.scss';

  .card {
    padding: 12px;
    padding-bottom: 16px;
    background-color: $primary;
    border-radius: 8px;
    color: white;
    margin: 16px 8px 16px 0px;
    background-image: url(../../assets/StopWatchBG.svg);
    background-position: 108% 40%;
    background-repeat: no-repeat;
    background-size: 150px 600px;
    box-shadow: $shadow;
    transition: all ease-out 0.2s;
    &:hover {
      cursor: pointer;
      box-shadow: $shadow-hover;
    }
    .value {
      font-size: 1.2em;
      font-weight: 600;
    }
  }

  h4 {
    margin: 0px;
    margin-bottom: 4px;
    font-size: 1.5em;
    font-weight: 600;
  }
</style>
