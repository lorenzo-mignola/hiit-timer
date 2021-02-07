<template>
  <div class="circle-container">
    <VueCircle
      :progress="progress"
      :show-percent="false"
      :size="300"
      line-cap="round"
      :start-angle="startAngle"
      :fill="fill"
      :animation="animation"
      ref="circle"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import VueCircle from 'vue2-circle-progress/src/index.vue';
import { Prop, Ref } from 'vue-property-decorator';

const gradientWork = ['#033f63', '#02705F'];
const gradientRest = ['#D95221', '#cc2936'];

@Component({
  components: { VueCircle },
})
export default class CircleProgress extends Vue {
  @Prop({ default: 'work' }) type?: 'work' | 'rest';

  @Prop({ required: true }) total!: number;

  @Prop({ required: true }) actual!: number;

  @Ref('circle') circle!: typeof VueCircle & {
    updateProgress: (value: number) => void;
    updateFill: (value: any) => void;
  };

  startAngle = -(Math.PI / 2);

  animation = { duration: 600, easing: 'circleProgressEasing' };

  fill = {};

  mounted() {
    this.fill = {
      gradient: this.type === 'rest' ? gradientRest : gradientWork,
      gradientAngle: -this.startAngle,
    };
  }

  beforeUpdate() {
    if (this.actual === this.total) {
      this.circle.updateFill({
        gradient: this.type === 'rest' ? gradientRest : gradientWork,
        gradientAngle: -this.startAngle,
      });
    }
  }

  get progress() {
    const p = 100 - (this.actual / this.total) * 100;
    if (this.circle) {
      this.circle.updateProgress(p);
    }
    return p;
  }
}
</script>

<style lang="scss" scoped>
.circle-container {
  margin: 10vh 0px;
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
