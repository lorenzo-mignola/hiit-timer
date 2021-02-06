<template>
  <div>
    <div>
      <TimerTime :hour="hour" :min="min" :sec="sec" />
      <CircleProgress :total="totalInvariable" :actual="total" />
    </div>
    <div class="buttons">
      <button class="button-red" v-if="isRunning && total !== 0" @click="stop" autofocus>
        Stop
      </button>
      <button class="button-green" v-else-if="!isRunning && total !== 0" @click="start" autofocus>
        Start
      </button>
      <div class="button-grey" v-if="total === 0 && !!totalInvariable" @click="resetTime">
        Reset
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { namespace } from 'vuex-class';
import TimerTime from '@/components/TimerTime.vue';
import CircleProgress from '@/components/CircleProgress.vue';
import sound from '@/assets/5sec.mp3';

const timer = namespace('timer');

@Component({
  components: { TimerTime, CircleProgress },
})
export default class TimerClock extends Vue {
  @timer.State('hour') hour!: number;

  @timer.State('min') min!: number;

  @timer.State('sec') sec!: number;

  @timer.State('totalInvariable') totalInvariable!: number;

  @timer.Getter('total') total!: number;

  @timer.Action('fromTotalToSingleValue') fromTotalToSingleValue!: (ms: number) => void;

  @timer.Action('reset') reset!: () => void;

  isRunning = false;

  timeInterval!: NodeJS.Timeout;

  timerSound = new Audio(sound);

  start() {
    this.isRunning = true;
    this.timeInterval = setInterval(() => {
      /* sound handeler */
      if (this.total <= 5000) {
        if (this.timerSound.paused) {
          if (this.totalInvariable <= 5000) {
            this.timerSound.currentTime = 5 - this.totalInvariable / 1000;
          }
          this.timerSound.play();
        }
      }

      if (this.total <= 0) {
        this.stop();
        return;
      }
      const newVal = this.total - 1000;
      this.fromTotalToSingleValue(newVal);
    }, 1000);
  }

  stop() {
    clearInterval(this.timeInterval);
    this.isRunning = false;
  }

  resetTime() {
    this.stopSound();
    this.reset();
  }

  private stopSound() {
    if (!this.timerSound.paused) {
      this.timerSound.pause();
      this.timerSound.currentTime = 0;
    }
  }
}
</script>

<style lang="scss" scoped></style>
