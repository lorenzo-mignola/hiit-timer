<template>
  <div id="app">
    <transition name="fade">
      <router-view />
    </transition>
    <ErrorSnackbar />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import ErrorSnackbar from './components/ErrorSnackbar.vue';

@Component({
  components: { ErrorSnackbar },
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import './main.scss';
* {
  font-family: 'Exo 2', sans-serif;
}

#app {
  background-color: #1e1f20;
  color: $white;
}

.container {
  z-index: 9;
  border-top-left-radius: 35px;
  border-top-right-radius: 35px;
  height: 96vh;
  width: 100vw;
  position: fixed;
  top: 5vh;
  padding: 25px 30px;
  box-sizing: border-box;
}

.button-primary {
  @include button;
  background-color: $primary;
  box-shadow: 10px 14px 19px -7px rgba(3, 63, 99, 0.51);
  &:hover {
    box-shadow: 10px 14px 19px -7px rgba(3, 63, 99, 0.71);
  }
}

.button-green {
  @include button;
  background-color: #427c5f;
  box-shadow: 10px 14px 19px -7px rgba(66, 124, 95, 0.51);
  &:hover {
    box-shadow: 10px 14px 19px -7px rgba(66, 124, 95, 0.71);
  }
}

.button-red {
  @include button;
  background-color: #9b252d;
  box-shadow: 10px 14px 19px -7px rgba(155, 37, 45, 0.51);
  &:hover {
    box-shadow: 10px 14px 19px -7px rgba(155, 37, 45, 0.71);
  }
}

.button-grey {
  @include button;
  background-color: #e9e9e9;
  color: #1e1f20 !important;
  box-shadow: 10px 14px 19px -7px rgba(163, 163, 163, 0.51);
  &:hover {
    box-shadow: 10px 14px 19px -7px rgba(163, 163, 163, 0.71);
  }
  &:disabled {
    color: #666666 !important;
  }
}

.buttons {
  display: flex;
  flex-direction: column;
}
</style>
