<template>
  <div>
    <div class="firstRow">
      <h2>Rest Time</h2>
      <div class="name">
        <div class="name-input">
          <input
            type="text"
            name="name"
            id="name"
            v-model="name"
            :class="name === '' ? 'empty' : 'not-empty'"
            autofocus
          />
          <label for="name">Workout name</label>
        </div>
      </div>
    </div>
    <div class="buttons">
      <button class="button-primary" @click="next" :disabled="name === ''">Next</button>
      <button class="button-grey" @click="back">Back</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { namespace } from 'vuex-class';

const newWorkout = namespace('newWorkout');

@Component
export default class WorkoutName extends Vue {
  @newWorkout.Action('setName') setName!: (value: string) => void;

  @newWorkout.Action('saveWorkout') saveWorkout!: () => void;

  name = '';

  next() {
    this.setName(this.name);
    this.saveWorkout();
    // TODO save
    // this.$router.push({ path: '/add/workout-name' });
  }

  back() {
    this.$router.push({ path: '/add/rest-time' });
  }
}
</script>

<style lang="scss" scoped>
@import '../../main.scss';

.firstRow {
  max-height: 60vh;
}
.name {
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.name-input {
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: flex-start;
}
input {
  font-size: 1.5em;
  padding: 6px;
  padding-left: 12px;
  height: 40px;
  width: 80vw;
  border: 0;
  transition: all ease-in-out 0.2s;
  margin-left: -16px;
  background-color: $dark;
  border-radius: 8px;
  &:focus,
  &:hover {
    outline: none;
    box-shadow: $shadow-dark;
  }
  @media (min-width: 768px) {
    width: 60vw;
  }
}
.not-empty {
  & + label {
    margin-bottom: 80px;
    transform: translateX(-14px);
    color: $primary;
  }
}
.empty:focus {
  & + label {
    margin-bottom: 80px;
    transform: translateX(-14px);
    color: $primary;
  }
}
label {
  position: absolute;
  pointer-events: none;
  color: #414141;
  transform: translateX(0px);
  transition: all ease-out 0.3s;
}
</style>
