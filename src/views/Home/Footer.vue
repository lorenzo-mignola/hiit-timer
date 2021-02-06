<template>
  <div class="footer">
    <div @click="goToTimer"><img src="../../assets/Timer.svg" /></div>
    <div class="add_button" @click="goToAdd">+</div>
    <div @click="goToStopwatch"><img src="../../assets/Stopwatch.svg" /></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Footer extends Vue {
  goToStopwatch() {
    this.$router.push({ path: '/stopwatch' });
  }

  goToAdd() {
    this.$router.push({ path: '/add/reps' });
  }

  goToTimer() {
    this.$router.push({ path: '/timer/set-timer' });
  }
}
</script>

<style lang="scss" scoped>
@import '../../main.scss';

$img-shadow: 6px 6px 9px rgba(3, 63, 99, 0.41);
.footer {
  background-color: #242627;
  z-index: 10;
  position: fixed;
  width: calc(100vw + 1px);
  height: 10vh;
  bottom: -1px;
  display: flex;
  padding: 16px;
  align-items: center;
  justify-content: space-around;
  box-sizing: border-box;
  div {
    cursor: pointer;
  }
  img {
    transition: all ease-in 0.2s;
    &:hover {
      filter: drop-shadow($img-shadow);
    }
  }
}
.add_button {
  @include align-center;
  font-size: 3.5em;
  width: 60px;
  height: 60px;
  padding: 4px;
  background-color: $light;
  color: $white;
  border-radius: 50%;
  transform: translateY(-40px);
  transition: all 0.2s;
  &:hover {
    font-weight: bold;
    font-size: 3.6em;
  }
}
</style>
