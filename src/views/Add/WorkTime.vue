<template>
  <div>
    <div class="firstRow">
      <h2>Work Time</h2>
      <div class="time">
        <TimeSelection type="hour" @changeValue="changeHour" :value="hour" />
        <TimeSelection type="min" @changeValue="changeMin" :value="min" />
        <TimeSelection type="sec" @changeValue="changeSec" :value="sec" />
      </div>
    </div>
    <div class="buttons">
      <button class="button-primary" @click="next" :disabled="!getCanGoNext">Next</button>
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
export default class WorkTime extends Vue {
  @newWorkout.Action('setWorkTime') setWorkTime!: (value: number) => void;

  hour = 0;

  min = 0;

  sec = 0;

  get getCanGoNext() {
    return !!this.hour || !!this.min || !!this.sec;
  }

  changeSec(value: number) {
    this.sec = value;
  }

  changeMin(value: number) {
    this.min = value;
  }

  changeHour(value: number) {
    this.hour = value;
  }

  next() {
    const secMs = this.sec * 1000;
    const minMs = this.min * 60000;
    const hourMs = this.hour * 3600000;
    const ms = secMs + minMs + hourMs;
    this.setWorkTime(ms);
    this.$router.push({ path: '/add/rest-time' });
  }

  back() {
    this.$router.push({ path: '/add/reps' });
  }
}
</script>

<style lang="scss" scoped>
.time {
  height: 60%;
  display: flex;
  justify-content: center;
}
.firstRow {
  max-height: 60vh;
}
</style>
