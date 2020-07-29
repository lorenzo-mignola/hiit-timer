import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home/Home.vue';
import Stopwatch from '../views/Stopwatch/Stopwatch.vue';
import Add from '../views/Add/Add.vue';
import Reps from '../views/Add/Reps.vue';
import WorkTime from '../views/Add/WorkTime.vue';
import RestTime from '../views/Add/RestTime.vue';
import WorkoutName from '../views/Add/WorkoutName.vue';
import Timer from '../views/Timer/Timer.vue';
import SetTimer from '../views/Timer/SetTimer.vue';
import TimerClock from '../views/Timer/TimerClock.vue';
import WorkoutElement from '../views/Workout/WorkoutElement.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/stopwatch',
    component: Stopwatch,
  },
  {
    path: '/add',
    component: Add,
    children: [
      {
        path: 'reps',
        component: Reps,
      },
      {
        path: 'work-time',
        component: WorkTime,
      },
      {
        path: 'rest-time',
        component: RestTime,
      },
      {
        path: 'workout-name',
        component: WorkoutName,
      },
    ],
  },
  {
    path: '/timer',
    component: Timer,
    children: [
      {
        path: 'set-timer',
        component: SetTimer,
      },
      {
        path: 'timer-clock',
        component: TimerClock,
      },
    ],
  },
  {
    path: '/workout/:id',
    component: WorkoutElement,
    props: true,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
