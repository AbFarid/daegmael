<template>
  <div>
    <p class="gothic">Kingdom</p>

    <br />

    <input
      type="text"
      class="gothic"
      placeholder="Roman"
      v-model="currentDay"
    />

    <p class="retro">{{ deromanized }}</p>

    <ul class="retro">
      <li>Current day: {{ deromanized }}</li>
      <li>Current season: {{ season }}</li>
      <li>Days left in season: {{ daysLeft }}</li>
    </ul>

    <button class="gothic" @click="changeDay(1)">+i</button>
    <button class="gothic" :disabled="!deromanized > 0" @click="changeDay(-1)">
      -i
    </button>

    <Timer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as romanize from 'romanize';
import * as deromanize from 'deromanize';

import Timer from '../components/Timer.vue';

@Component({ components: { Timer } })
export default class Home extends Vue {
  // inputArabic: number = 0;
  currentDay: string = '';

  get deromanized(): number {
    return deromanize(this.currentDay);
  }

  get season(): string {
    const day = this.deromanized;
    const seasonLength = 16; // days
    const seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];
    let currentSeasonNum = Math.ceil(day / seasonLength);
    while (currentSeasonNum > 4) currentSeasonNum -= 4;
    // console.log(day, seasonLength, currentSeasonNum);
    return seasons[currentSeasonNum - 1];
  }

  get daysLeft(): number {
    const day = this.deromanized;
    const seasonLength = 16; // days
    return (seasonLength - (day % seasonLength)) % seasonLength;
  }

  changeDay(delta: number) {
    const day = this.deromanized;
    this.currentDay = romanize(day + delta).toLowerCase();
  }

  // get romanized() {
  //   return romanize(this.inputArabic).toLowerCase();
  // }

  created() {}
}
</script>

<style scoped lang="scss"></style>
