<template>
  <div class="work-progress">
    <div class="progress-group">
      <div class="progress" :style="{ width: `${(progress / total) * 100}%` }"></div>
    </div>
    <span class="total">{{ progress }}/{{ total }}</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class WorkProgress extends Vue {
  @Prop({ required: true }) total!: number;

  @Prop({ required: true }) progress!: number;
}
</script>

<style lang="scss" scoped>
@import '../main.scss';
.work-progress {
  display: flex;
  align-items: center;
}
.total {
  text-align: right;
  margin-right: 8px;
}
.progress-group {
  width: 100%;
  margin: 0px 8px;
  height: 10px;
  background-color: #d8d8d8;
  border-radius: 12px;
  .progress {
    height: 10px;
    border-radius: 12px;
    background-color: $secondary;
    transition: width ease-in 0.6s;
  }
}
</style>
