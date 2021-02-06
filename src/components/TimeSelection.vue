<template>
  <div class="time-selection">
    <button @click="add" :disabled="value >= max">+</button>
    <div class="type">{{ capitalize(type) }}</div>
    <div class="number" @click="toggleSelection">{{ value > 9 ? value : `0${value}` }}</div>
    <button :disabled="value <= 0" @click="remove">-</button>
    <div class="selection" v-if="showSelection">
      <li></li>
      <li v-for="nr in max + 1" :key="nr" @click="selectValue(nr - 1)">
        {{ nr - 1 > 9 ? nr - 1 : `0${nr - 1}` }}
      </li>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class TimeSelection extends Vue {
  @Prop({ required: true }) type!: 'hour' | 'min' | 'sec';

  @Prop({ default: 0 }) value!: number;

  max = this.type === 'hour' ? 24 : 59;

  showSelection = false;

  add() {
    if (this.value < this.max) {
      this.$emit('changeValue', this.value + 1);
    }
  }

  remove() {
    if (this.value > 0) {
      this.$emit('changeValue', this.value - 1);
    }
  }

  selectValue(value: number) {
    this.$emit('changeValue', value);
    this.showSelection = false;
  }

  capitalize(type: string) {
    const first = type.charAt(0).toUpperCase();
    const lower = type.substring(1, type.length);
    return `${first}${lower}`;
  }

  toggleSelection() {
    this.showSelection = !this.showSelection;
  }
}
</script>

<style lang="scss" scoped>
@import '../main.scss';

.time-selection {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px 4px;
  & > button {
    color: $white;
  }
}
button {
  transition: font-weight 0.2s;
  border: 0;
  background-color: transparent;
  font-size: 2em;
  margin: 8px 0px;
  &:hover {
    cursor: pointer;
    font-weight: 600;
  }
  &:disabled {
    color: grey;
  }
}
div {
  font-size: 2em;
}
.number {
  background-color: $dark;
  box-shadow: $shadow-dark;
  padding: 8px;
  border-radius: 12px;
  cursor: pointer;
  font-family: 'Courier Prime', monospace;
}
.type {
  font-size: 0.7em;
  font-weight: 300;
}
.selection {
  position: relative;
  top: -120px;
  margin-top: 10px;
  font-size: 0.7em;
  max-height: 30vh;
  overflow: scroll;
  width: 100%;
  background-color: $dark;
  box-shadow: $shadow-dark;
  border-radius: 12px;

  /* Scroll */
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: adjust-color($color: $light, $alpha: -0.6);
    border-radius: 4px;
  }
  &::-webkit-scrollbar-button {
    background-color: transparent;
    display: none;
  }
  &::-webkit-scrollbar-corner {
    background-color: transparent;
    display: none;
  }
  /* Scroll */

  & li {
    margin: 8px 0px;
    display: flex;
    justify-content: center;
    list-style-type: none;
    transition: background-color ease-in-out 0.1s;
    &:hover {
      cursor: pointer;
      background-color: #d9e4eb;
      color: $primary;
    }
  }
}
</style>
