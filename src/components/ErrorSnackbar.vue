<template>
  <div class="error" v-if="error">
    Sorry we had some truble to process your request
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { State, Action } from 'vuex-class';

@Component
export default class ErrorSnackbar extends Vue {
  @State('error') error!: boolean;

  @Action('closeError') closeError!: () => void;

  updated() {
    console.log('clg');
    setTimeout(() => {
      this.closeError();
    }, 5000);
  }
}
</script>

<style lang="scss" scoped>
.error {
  background: adjust-color($color: #cc2936, $alpha: -0.1);
  color: white;
  padding: 12px;
  position: fixed;
  top: -20px;
  left: 0px;
  margin: 8px;
  border-radius: 8px;
  width: calc(100vw - 40px);
  -webkit-animation: slide-fwd-bottom 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: slide-fwd-bottom 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

@-webkit-keyframes slide-fwd-bottom {
  0% {
    -webkit-transform: translateZ(0) translateY(0);
    transform: translateZ(0) translateY(0);
  }
  100% {
    -webkit-transform: translateZ(160px) translateY(28px);
    transform: translateZ(160px) translateY(28px);
  }
}
@keyframes slide-fwd-bottom {
  0% {
    -webkit-transform: translateZ(0) translateY(0);
    transform: translateZ(0) translateY(0);
  }
  100% {
    -webkit-transform: translateZ(160px) translateY(28px);
    transform: translateZ(160px) translateY(28px);
  }
}
</style>
