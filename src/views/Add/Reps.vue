<template>
  <div>
    <div>
      <h2>Repetition</h2>
      <div class="repetition_selection">
        <button @click="incrementReps">+</button>
        <span>{{ reps }}x</span>
        <button @click="decrementReps" :disabled="reps <= 0">-</button>
      </div>
    </div>
    <button class="button-primary" @click="next" :disabled="reps <= 0">Next</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const newWorkout = namespace('newWorkout');

@Component
export default class Reps extends Vue {
  @newWorkout.State('workRep') reps!: number;

  @newWorkout.Action('incrementReps') incrementReps!: () => void;

  @newWorkout.Action('decrementReps') decrementReps!: () => void;

  next() {
    this.$router.push('/add/work-time');
  }
}
</script>

<style lang="scss" scoped>
.repetition_selection {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  font-size: 3em;
  & > span {
    margin: 30px 0px;
    font-weight: 700;
  }
  & > button {
    transition: font-weight 0.2s;
    border: 0;
    background-color: transparent;
    font-size: 1em;
    &:hover {
      cursor: pointer;
      font-weight: 600;
    }
  }
}
</style>
