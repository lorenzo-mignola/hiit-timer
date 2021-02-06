<template>
  <div>
    <Cancel icon="true" />
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Cancel from '@/components/Cancel.vue';

@Component({
  components: { Cancel },
})
export default class Timer extends Vue {}
</script>

<style lang="scss" scoped>
@import '../../main.scss';

.container {
  background-color: $grey-dark;
  & > div {
    display: grid;
    grid-template-rows: 4fr 1fr;
  }
}
</style>
