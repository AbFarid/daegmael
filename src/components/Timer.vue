<template>
  <div>
    <div class="row uppercase" v-if="0">
      <span>{{ elapsedTime }}</span>
      <span class="spacer"></span>
      <span>{{ elapsedSeconds }}</span>
      <span class="spacer"></span>
      <span>{{ elapsedDayPercentage.toFixed(2) }} <span style="font-size: 10px">per centum</span></span>
      <span class="spacer"></span>
      <span>{{ elapsedDays }}</span>
    </div>

    <div class="row uppercase">
      <span>Time of day:</span>
      <span class="spacer"></span>
      <span>{{timeOfDay}}</span>
    </div>

    <div class="row uppercase" v-if="timeOfDay == 'day'">
      <span>Sunset in:</span>
      <span class="spacer"></span>
      <span>{{daytimeCountdown}}</span>
    </div>
    <div class="row uppercase" v-else>
      <span>Sunrise in:</span>
      <span class="spacer"></span>
      <span>{{dayCountdown}}</span>
    </div>

    <div class="row uppercase">
      <button @click="timer.start()">Start</button>
      <button @click="timer.stop()">Stop</button>
      <button @click="resetTimer">Reset</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Timer as ET } from 'easytimer.js';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Timer extends Vue {
  timer = new ET();
  dayLength = 4 * 60;
  daytimeLength = 165;

  elapsedTime = '0:00';
  elapsedSeconds = 0;
  elapsedDays = 0;

  get elapsedDayPercentage(): number {
    return (this.elapsedSeconds * 100) / this.dayLength;
  }

  // get daysTillWinter(): number {
  //   if ()
  // }

  get timeOfDay(): string {
    return this.elapsedSeconds < this.daytimeLength ? 'day' : 'night';
  }

  get daytimeCountdown(): string {
    if (this.elapsedSeconds < this.daytimeLength) {
      const remainingSeconds = this.daytimeLength - this.elapsedSeconds;
      const minutes = Math.floor(remainingSeconds / 60);
      let seconds = remainingSeconds % 60;
      return `${minutes}:${('0' + seconds).slice(-2)}`;
    } else {
      return '0:00';
    }
  }

  get dayCountdown(): string {
    const remainingSeconds = this.dayLength - this.elapsedSeconds;
    const minutes = Math.floor(remainingSeconds / 60);
    let seconds = remainingSeconds % 60;
    return `${minutes}:${('0' + seconds).slice(-2)}`;
  }

  resetTimer(): void {
    this.elapsedTime = '0:00';
    this.elapsedSeconds = 0;
    this.timer.reset();
  }

  incrementDay(): void {
    this.elapsedDays++;
    this.$emit('dayIncrement');
  }

  mounted() {
    this.timer.start();
    this.timer.addEventListener('secondsUpdated', () => {
      const time = this.timer.getTimeValues();
      this.elapsedTime = time.toString().replace('00:0', '');
      this.elapsedSeconds = time.minutes * 60 + time.seconds;
      if (this.elapsedSeconds >= this.dayLength) {
        this.incrementDay();
        this.resetTimer();
      }
    });
  }
}
</script>

<style></style>
