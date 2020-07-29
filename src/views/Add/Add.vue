<template>
  <div>
    <Cancel />
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Cancel from '@/components/Cancel.vue';

@Component({
  components: { Cancel },
})
export default class Add extends Vue {}
</script>

<style lang="scss" scoped>
@import '../../main.scss';

.container {
  background-color: $grey-light;
  & > div {
    display: grid;
    grid-template-rows: 4fr 1fr;
  }
}
</style>
