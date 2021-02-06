<template>
  <div class="timeContainer">
    <div class="time">{{ fixString(hour) }}</div>
    <div class="colon">:</div>
    <div class="time">{{ fixString(min) }}</div>
    <div class="colon">:</div>
    <div class="time">{{ fixString(sec) }}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class TimerTime extends Vue {
  @Prop({ required: true }) hour!: number;

  @Prop({ required: true }) min!: number;

  @Prop({ required: true }) sec!: number;

  fixString(value: number) {
    return value <= 9 ? `0${value}` : value;
  }
}
</script>

<style lang="scss" scoped>
@import '../main.scss';
.timeContainer {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.colon {
  font-weight: bold;
  font-size: 2em;
  @media (min-width: 768px) {
    font-size: 3em;
  }
}
.time {
  height: 80px;
  width: 100%;
  padding: 8px;
  border-radius: 20px;
  background-color: $dark;
  box-shadow: $shadow-dark;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  margin: 12px 8px;
  margin-bottom: 30px;
  font-family: 'Courier Prime', monospace;
  font-size: 2.5em;
  @media (min-width: 768px) {
    font-size: 4em;
    height: 120px;
    width: 120px;
  }
  &::before {
    font-size: 0.4em;
    font-family: 'Exo 2', sans-serif;
    content: 'Min';
  }
  &:first-of-type::before {
    content: 'Hour';
  }
  &:last-of-type::before {
    content: 'Sec';
  }
}
</style>
