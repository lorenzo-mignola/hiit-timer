<template>
  <div>
    <div class="firstRow">
      <h2>Rest Time</h2>
      <div class="end-rest">
        End with rest
        <label class="switch">
          <input type="checkbox" :value="endRest" />
          <span class="slider round" @click.stop="toggleEndRest"></span>
        </label>
      </div>
      <div class="time">
        <TimeSelection type="hour" @changeValue="changeHour" :value="hour" />
        <TimeSelection type="min" @changeValue="changeMin" :value="min" />
        <TimeSelection type="sec" @changeValue="changeSec" :value="sec" />
      </div>
    </div>
    <div class="buttons">
      <button class="button-primary" @click="next">Next</button>
      <button class="button-grey" @click="back">Back</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import TimeSelection from '@/components/TimeSelection.vue';
import { namespace } from 'vuex-class';

const newWorkout = namespace('newWorkout');

@Component({
  components: { TimeSelection },
})
export default class RestTime extends Vue {
  @newWorkout.Action('setRestTime') setRestTime!: (value: number) => void;

  @newWorkout.Action('setEndRest') setEndRest!: (value: boolean) => void;

  hour = 0;

  min = 0;

  sec = 0;

  endRest = false;

  changeSec(value: number) {
    this.sec = value;
  }

  changeMin(value: number) {
    this.min = value;
  }

  changeHour(value: number) {
    this.hour = value;
  }

  toggleEndRest() {
    this.endRest = !this.endRest;
  }

  next() {
    const secMs = this.sec * 1000;
    const minMs = this.min * 60000;
    const hourMs = this.hour * 3600000;
    const ms = secMs + minMs + hourMs;
    this.setRestTime(ms);
    this.setEndRest(this.endRest);
    this.$router.push({ path: '/add/workout-name' });
  }

  back() {
    this.$router.push({ path: '/add/work-time' });
  }
}
</script>

<style lang="scss" scoped>
@import '../../main.scss';
.time {
  height: 60%;
  display: flex;
  justify-content: center;
}
.firstRow {
  max-height: 60vh;
}
.slider.round {
  border-radius: 34px;
  &:before {
    border-radius: 50%;
  }
}
.switch {
  position: relative;
  display: inline-block;
  width: 30px;
  height: 17px;
  margin-left: 8px;
  & input {
    opacity: 0;
    width: 0;
    height: 0;
  }
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.2s;
  &:before {
    position: absolute;
    content: '';
    height: 13px;
    width: 13px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: 0.2s;
  }
}
input {
  &:checked + .slider {
    background-color: $primary;
  }
  &:focus + .slider {
    box-shadow: 0 0 1px $primary;
  }
  &:checked + .slider:before {
    -webkit-transform: translateX(13px);
    -ms-transform: translateX(13px);
    transform: translateX(13px);
  }
}
.end-rest {
  display: flex;
  align-items: center;
  color: $primary;
}
</style>
