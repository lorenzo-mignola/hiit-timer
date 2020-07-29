<template>
  <div :class="getClass">
    <img v-if="icon" @click="goHome" :src="imgSrc" />
    <span v-else @click="goHome">Cancel</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import BackWhite from '@/assets/BackWhite.svg';
import Back from '@/assets/Back.svg';

const newWorkout = namespace('newWorkout');
const pathToNotClear = ['/stopwatch'];

@Component
export default class Cancel extends Vue {
  @Prop({ default: false }) icon?: boolean;

  @Prop({ default: null }) color!: 'red' | 'blue';

  @newWorkout.Action('clearNew') clear!: () => void;

  imgSrc = this.color ? BackWhite : Back;

  goHome() {
    if (!pathToNotClear.includes(this.$route.path)) {
      this.clear();
    }
    this.$router.push({ path: '/' });
  }

  get getClass() {
    switch (this.color) {
      case 'red':
        return 'classRed';
      case 'blue':
        return 'classBlue';
      default:
        return '';
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../main.scss';
div {
  height: 9vh;
  box-sizing: border-box;
  padding: 12px 16px;
  color: $primary;
  font-weight: 500;
  & > img:hover {
    cursor: pointer;
  }
  & > span:hover {
    cursor: pointer;
  }
}
img {
  height: 25px;
  width: 25px;
}
.classRed {
  background-color: #cc2936;
}
.classBlue {
  background-color: $primary;
}
</style>
