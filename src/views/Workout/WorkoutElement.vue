<template>
  <div>
    <Cancel :color="isWork ? 'blue' : 'red'" :icon="true" />
    <div class="container">
      <div v-if="totalInvariable !== 0">
        <TimerTime :hour="hour" :min="min" :sec="sec" />
        <WorkProgress :total="totalRep" :progress="totalRep - actualRep" />
        <CircleProgress :total="totalInvariable" :actual="total" :type="isWork ? 'work' : 'rest'" />
      </div>
      <div class="buttons" v-if="totalInvariable !== 0">
        <button class="button-red" v-if="isRunning" @click="stop">
          Stop
        </button>
        <button class="button-green" v-else-if="!isRunning" @click="start" :disabled="total <= 0">
          Start
        </button>
        <button class="button-grey" @click="skip" :disabled="actualRep <= 0">
          Skip
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Cancel from '@/components/Cancel.vue';
import { Prop, Watch } from 'vue-property-decorator';
import { omit } from 'lodash';
import { Workout } from '@/types';
import TimerTime from '@/components/TimerTime.vue';
import CircleProgress from '@/components/CircleProgress.vue';
import WorkProgress from '@/components/WorkProgress.vue';
import sound from '@/assets/Timer.mp3';
import endSound from '@/assets/AirHorn.mp3';
import db from '../../db';
import { extractSingleValue } from '../../util';

@Component({
  components: {
    Cancel,
    TimerTime,
    CircleProgress,
    WorkProgress,
  },
})
export default class WorkoutElement extends Vue {
  @Prop() id!: string;

  workout: Partial<Workout & PouchDB.Core.IdMeta & PouchDB.Core.GetMeta> | null = null;

  isWork = true;

  actualRep = 0;

  hour = 0;

  min = 0;

  sec = 0;

  total = 0;

  totalInvariable = 0;

  totalRep = 0;

  isRunning = false;

  timeInterval!: NodeJS.Timeout;

  timerSound = new Audio(sound);

  end = new Audio(endSound);

  async mounted() {
    try {
      const doc = await db.get<Workout>(this.id);
      const docWorkout = omit(doc, ['_ref']);
      this.workout = docWorkout;
      if (docWorkout.workRep) {
        this.loadData(docWorkout);
      }
    } catch (e) {
      console.error(e);
    }
  }

  private loadData(workout: Partial<Workout & PouchDB.Core.IdMeta & PouchDB.Core.GetMeta>) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    let totalRep = workout.workRep! * 2;
    if (!workout.restEnd) {
      totalRep -= 1;
    }
    this.actualRep = totalRep;
    this.totalRep = totalRep;
  }

  start() {
    this.isRunning = true;
    this.timeInterval = setInterval(() => {
      /* sound handeler */
      if (this.actualRep <= 1 && this.total <= 0) {
        this.end.play();
      } else if (this.total <= 5000) {
        if (this.timerSound.paused) {
          if (this.totalInvariable <= 5000) {
            this.timerSound.currentTime = 5 - this.totalInvariable / 1000;
          }
          this.timerSound.play();
        }
      }

      if (this.total <= 0) {
        this.nextRep();
        return;
      }
      this.total -= 1000;
    }, 1000);
  }

  stop() {
    clearInterval(this.timeInterval);
    this.isRunning = false;
  }

  skip() {
    this.stopSound();
    this.nextRep();
  }

  private nextRep() {
    if (this.actualRep > 0) {
      this.isWork = !this.isWork;
      this.actualRep -= 1;
    } else {
      this.stop();
    }
  }

  private stopSound() {
    if (!this.timerSound.paused) {
      this.timerSound.pause();
      this.timerSound.currentTime = 0;
    }
  }

  @Watch('total') getValues(val: number) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { hour, minute, second } = extractSingleValue(val);
    this.hour = hour;
    this.min = minute;
    this.sec = second;
  }

  @Watch('actualRep') getTime() {
    if (this.workout) {
      let time;
      if (this.isWork) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        time = this.workout.workTime!;
      } else {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        time = this.workout.restTime!;
      }
      this.total = time;
      this.totalInvariable = time;
      const { hour, minute, second } = extractSingleValue(time);
      this.hour = hour;
      this.min = minute;
      this.sec = second;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../main.scss';
.container {
  background-color: $grey-light;
}
</style>
