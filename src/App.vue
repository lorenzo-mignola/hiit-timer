<template>
  <div id="app">
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<style lang="scss">
@import './main.scss';
* {
  font-family: 'Exo 2', sans-serif;
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
  color: white;
  box-shadow: 10px 14px 19px -7px rgba(3, 63, 99, 0.51);
  &:hover {
    box-shadow: 10px 14px 19px -7px rgba(3, 63, 99, 0.71);
  }
}

.button-green {
  @include button;
  background-color: #68b684;
  color: white;
  box-shadow: 10px 14px 19px -7px rgba(104, 182, 132, 0.51);
  &:hover {
    box-shadow: 10px 14px 19px -7px rgba(104, 182, 132, 0.71);
  }
}

.button-red {
  @include button;
  background-color: #cc2936;
  color: white;
  box-shadow: 10px 14px 19px -7px rgba(146, 105, 108, 0.51);
  &:hover {
    box-shadow: 10px 14px 19px -7px rgba(146, 105, 108, 0.71);
  }
}

.button-grey {
  @include button;
  background-color: #e9e9e9;
  box-shadow: 10px 14px 19px -7px rgba(163, 163, 163, 0.51);
  &:hover {
    box-shadow: 10px 14px 19px -7px rgba(163, 163, 163, 0.71);
  }
}

.buttons {
  display: flex;
  flex-direction: column;
}
</style>
