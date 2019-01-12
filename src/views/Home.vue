<template>
  <!-- <div class="wrapper"> -->
    <div class="container">

      <div class="header">
        <div class="crown"></div>
        <img :src="`${publicPath}img/banner.png`" alt="header">
        <p class="gothic shadow">Daeg-Mael</p>
        <p class="gothic">Daeg-Mael</p>
      </div>

      <div class="panel">
        <div class="section">
          <div class="row">
            <input
              type="text"
              class="input center-text gothic"
              placeholder="nulla"
              v-model="currentDay"
            >
          </div>

          <div class="row">
            <button class="btn wide gothic" :disabled="deromanized <= 16" @click="changeDay(-16)">-xvi</button>
            <button class="btn wide gothic" :disabled="deromanized <= 1" @click="changeDay(-1)">-i</button>
            <button class="btn wide gothic" @click="changeDay(1)">+i</button>
            <button class="btn wide gothic" @click="changeDay(16)">+xvi</button>
          </div>
        </div>

        <div class="section">
          <div class="title">
            <img :src="`${publicPath}img/ornament_gold.png`" alt="ornament">
            <p class="uppercase">Season tracker</p>
            <img :src="`${publicPath}img/ornament_gold.png`" alt="ornament">
          </div>

          <div class="row uppercase">
            <span>Current day:</span>
            <span class="spacer"></span>
            <span>{{ deromanized }}</span>
          </div>

          <div class="row uppercase">
            <span>Current season:</span>
            <span class="spacer"></span>
            <span>{{ season }}</span>
          </div>

          <!-- <div class="row uppercase">
            <span>Next season:</span>
            <span class="spacer"></span>
            <span>{{ nextSeason }}</span>
          </div>-->
          <div class="row uppercase" v-if="season != 'winter'">
            <span>Winter in:</span>
            <span class="spacer"></span>
            <span>{{ daysTillWinter }} days</span>
          </div>

          <div class="row uppercase" v-else>
            <span>{{ nextSeason }} in:</span>
            <span class="spacer"></span>
            <span>{{ daysTillNextSeason }} days</span>
          </div>
        </div>

        <!-- <div class="section">
          <Timer @dayIncrement="changeDay(1)" />
        </div> -->
        <!-- <h3 class="title uppercase">Day tracker</h3> -->

        <div class="section">
          <div class="title">
            <img :src="`${publicPath}img/ornament_gold.png`" alt="ornament">
            <p class="uppercase">Day tracker</p>
            <img :src="`${publicPath}img/ornament_gold.png`" alt="ornament">
          </div>

          <div class="row uppercase">
            <span>Time of day:</span>
            <span class="spacer"></span>
            <img :src="`${publicPath}img/sun.png`" alt="sun" class="icon" v-if="timeOfDay == 'daytime'">
            <img :src="`${publicPath}img/moon.png`" alt="moon" class="icon" v-else>
            <span>{{timeOfDay}}</span>
          </div>

          <div class="row uppercase" v-if="timeOfDay == 'daytime'">
            <span>Sunset in:</span>
            <span class="spacer"></span>
            <span>{{daytimeCountdown}}</span>
          </div>
          <div class="row uppercase" v-else>
            <span>Sunrise in:</span>
            <span class="spacer"></span>
            <span>{{dayCountdown}}</span>
          </div>
        </div>

        <div class="section">
          <div class="row">
            <button @click="startTimer" :disabled="timerRunning">Start</button>
            <button @click="pauseTimer" :disabled="!timerRunning">Pause</button>
            <button @click="stopTimer">Stop</button>
            <button @click="resetTimer">Reset</button>
          </div>
        </div>

      </div>

    </div>
  <!-- </div> -->
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

// import store from '../store';
import { State, Getter, Action } from '../utils/decorators';
import Timer from '../components/Timer.vue';

@Component({ components: { Timer }, data: () => ({ publicPath: process.env.BASE_URL }) })
export default class Home extends Vue {

  @State() currentDay;
  @State() timerRunning;

  @Getter() deromanized;
  @Getter() season;
  @Getter() nextSeason;
  @Getter() daysTillNextSeason;
  @Getter() daysTillWinter;
  // Timer getters
  @Getter() timeOfDay;
  @Getter() daytimeCountdown;
  @Getter() dayCountdown;
  @Getter() elapsedDayPercentage;

  @Action() changeDay;
  // Timer Actions
  @Action() initTimer;
  @Action() startTimer;
  @Action() pauseTimer;
  @Action() stopTimer;
  @Action() resetTimer;


  created() {
    this.initTimer();

    document.ontouchmove = function (e) {
      e.preventDefault();
    }
  }
}
</script>

<style lang="scss">
@import '../../public/styles/_vars.scss';

@keyframes shine {
  20% {
    background-position: -512px;
  }
  100% {
    background-position: -512px;
  }
}

// .wrapper {
//   height: 100vh;
//   width: 100vw;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// }

.container {
  padding-bottom: 20px;
}

.header {
  position: relative;
  width: 320px;
  margin: 0 auto 12px;

  img {
    // width: 244px;
    image-rendering: pixelated;
    display: block;
    margin: auto;
  }

  p {
    position: absolute;
    margin: auto;
    top: 45px;
    left: 77px;
  }

  .shadow {
    top: 47px;
    color: $color-input;
  }

  .crown {
    width: 32px;
    height: 32px;
    margin: auto;
    background: url('/img/crown.png') left center;
    animation: shine 6s steps(16) infinite;
  }
}

.panel {
  font-family: Archer;
  padding: 20px;
  width: 300px;
  margin: auto;
  background-color: $color-panel;
  color: $color-text;
  border-image-slice: 40 60 40 60 fill;
  border-image-width: 14px 22px 14px 22px;
  border-image-outset: 0px 0px 0px 0px;
  border-image-repeat: repeat repeat;
  border-image-source: url('/img/menu.png');

  input {
    padding: 8px 12px 6px;
    background-color: $color-input;
    color: $color-text;
    border-image-slice: 16 16 16 16;
    border-image-width: 4px 4px 4px 4px;
    border-image-outset: 0px 0px 0px 0px;
    border-image-repeat: repeat repeat;
    border-image-source: url('/img/input.png');
    outline: none;

    &:focus {
      border-image-source: url('/img/input_focus.png');
    }
  }

  // @media screen and  {
    
  // }

  button {
    background-color: $color-button;
    color: $color-button-text;
    font-family: Archer;
    // margin: 2px;
    padding: 5px 12px 10px;
    border-image-slice: 16 23 32 23;
    border-image-width: 3px 6px 9px 6px;
    border-image-outset: 0px 0px 0px 0px;
    border-image-repeat: repeat repeat;
    border-image-source: url('/img/button.png');
    outline: none;
    cursor: pointer;
    font-size: 12px;

    &:hover {
      border-image-source: url('/img/button_hover.png');
    }
    &:active {
      border-image-source: url('/img/button_active.png');
      padding: 6px 12px 9px;
    }
    &:disabled {
      background-color: $color-button-disabled;
      border-image-source: url('/img/button_disabled.png');
    }

    &.gothic {
      font-family: StGothic;
      padding: 3px 10px 6px;
      &:active {
        padding: 4px 10px 5px;
      }
    }

    &.wide {
      padding: 5px 14px 10px;
      &:active {
        padding: 6px 14px 9px;
      }
    }
  }
}

.center-text {
  text-align: center;
}

.section {
  display: flex;
  flex-direction: column;
  width: 280px;
  margin: auto;

  &:not(:first-child) {
    margin-top: 32px;
  }
  .row {
    display: flex;
    width: 100%;
    justify-content: space-between;

    &:not(:first-child) {
      margin-top: 12px;
    }

    input {
      width: 100%;
    }

    .icon {
      width: 25px;
      height: 25px;
      // margin: -6px 0 -6px 4px;
      margin: -6px 4px -6px 0;
    }
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 8px;

    p {
      margin: 0;
      color: gold;
      text-decoration: underline;
    }
  }
}
.buttons {
  display: flex;
}
</style>
