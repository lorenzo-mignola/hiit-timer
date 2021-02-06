<template>
  <div>
    <Cancel icon="true" />
    <div class="container">
      <Time :time="time" />
      <div class="buttons">
        <button class="button-green start" @click="start" :disabled="isRunning" autofocus>
          Start
        </button>
        <button v-if="isRunning" class="button-red stop" @click="stop" autofocus>Stop</button>
        <button v-else class="button-red stop" @click="reset" :disabled="time === 0">
          Reset
        </button>
        <button class="button-grey lap" @click="lap" :disabled="!isRunning">Lap</button>
      </div>
      <div class="laps">
        <li v-for="(lap, index) in laps" :key="index" class="lapItem">
          <span>Lap {{ index + 1 }}</span>
          <span>{{ formatTime(lap) }}</span>
        </li>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { formatTimeUtil } from '@/util';
import Time from '@/components/Time.vue';
import Cancel from '@/components/Cancel.vue';

@Component({
  components: { Cancel, Time },
})
export default class Stopwatch extends Vue {
  time = 0;

  isRunning = false;

  timeInterval!: NodeJS.Timeout;

  laps: number[] = [];

  start() {
    this.isRunning = true;
    this.timeInterval = setInterval(() => {
      this.time += 100;
    }, 100);
  }

  stop() {
    clearInterval(this.timeInterval);
    this.isRunning = false;
  }

  reset() {
    this.time = 0;
    this.laps = [];
  }

  lap() {
    this.laps = [...this.laps, this.time];
  }

  formatTime(value: number) {
    return formatTimeUtil(value);
  }
}
</script>

<style lang="scss" scoped>
@import '../../main.scss';

.container {
  background: $grey-dark;
}
.buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas: 'start stop' 'lap lap';
}
.start {
  grid-area: start;
}
.stop {
  grid-area: stop;
}
.lap {
  grid-area: lap;
}
.lapItem {
  display: flex;
  justify-content: space-between;
  margin: 18px 0px;
  border-bottom: 1px solid rgb(139, 139, 139);
  padding-bottom: 4px;
  & > span:last-child {
    font-weight: 600;
  }
}
.laps {
  margin-top: 50px;
}
</style>
