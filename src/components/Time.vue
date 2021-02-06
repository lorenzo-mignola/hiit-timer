<template>
  <div class="time">{{ formatTime(time) }}</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { formatTimeUtil } from '@/util';
import { Prop } from 'vue-property-decorator';

@Component
export default class Time extends Vue {
  @Prop({ required: true }) time!: number;

  formatTime(value: number) {
    return formatTimeUtil(value);
  }
}
</script>

<style lang="scss" scoped>
@import '../main.scss';
.time {
  width: 100%;
  height: 80px;
  padding: 8px;
  border-radius: 20px;
  background-color: $dark;
  box-shadow: $shadow-dark;
  font-size: 4em;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  margin: 12px 0px;
  margin-bottom: 30px;
  font-family: 'Courier Prime', monospace;
}
</style>
