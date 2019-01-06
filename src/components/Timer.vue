<template>
  <div>
    <p>{{ elapsedTime }}</p>
    <p>{{ elapsedSeconds }}</p>
    <p>{{ elapsedDayPortion.toFixed(2) }}%</p>
    <p>{{ elapsedDays }}</p>
  </div>
</template>

<script lang="ts">
import { Timer as ET } from 'easytimer.js';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Timer extends Vue {
  timer = new ET();
  dayLength = 4 * 60;

  elapsedTime = '00:00:00';
  elapsedSeconds = 0;
  elapsedDays = 0;

  get elapsedDayPortion(): number {
    return (this.elapsedSeconds * 100) / this.dayLength;
  }

  resetTime(): void {
    this.elapsedTime = '00:00:00';
    this.elapsedSeconds = 0;
    this.timer.reset();
  }

  mounted() {
    this.timer.start();
    this.timer.addEventListener('secondsUpdated', () => {
      const time = this.timer.getTimeValues();
      this.elapsedTime = time.toString();
      this.elapsedSeconds = time.minutes * 60 + time.seconds;
      if (this.elapsedSeconds >= this.dayLength) {
        this.elapsedDays++;
        this.resetTime();
      }
    });
  }
}
</script>

<style></style>
