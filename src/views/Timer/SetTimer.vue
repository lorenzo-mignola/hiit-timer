<template>
  <div>
    <div class="firstRow">
      <h2>Set Timer</h2>
      <div class="time">
        <TimeSelection type="hour" @changeValue="changeHour" :value="hour" />
        <TimeSelection type="min" @changeValue="changeMin" :value="min" />
        <TimeSelection type="sec" @changeValue="changeSec" :value="sec" />
      </div>
    </div>
    <div class="buttons">
      <button class="button-primary" @click="next" :disabled="total <= 0">Next</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import TimeSelection from '@/components/TimeSelection.vue';
import { namespace } from 'vuex-class';

const timer = namespace('timer');

@Component({
  components: { TimeSelection },
})
export default class RestTime extends Vue {
  @timer.Action('setSec') setSec!: (value: number) => void;

  @timer.Action('setMin') setMin!: (value: number) => void;

  @timer.Action('setHour') setHour!: (value: number) => void;

  @timer.Action('setTotalInvariable') setTotalInvariable!: () => void;

  @timer.State('hour') hour!: number;

  @timer.State('min') min!: number;

  @timer.State('sec') sec!: number;

  @timer.Getter('total') total!: number;

  changeSec(value: number) {
    this.setSec(value);
  }

  changeMin(value: number) {
    this.setMin(value);
  }

  changeHour(value: number) {
    this.setHour(value);
  }

  next() {
    this.setTotalInvariable();
    this.$router.push({ path: '/timer/timer-clock' });
  }
}
</script>

<style lang="scss" scoped>
@import '../../main.scss';
.time {
  height: 100%;
  display: flex;
  justify-content: center;
}
.firstRow {
  height: 70vh;
}
</style>
