<template>
  <!-- <div class="wrapper"> -->
    <div class="container">

      <div class="header">
        <div class="crown"></div>
        <img src="../assets/img/banner.png" alt="header">
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
            <img src="../assets/img/ornament_gold.png" alt="ornament">
            <p class="uppercase">Season tracker</p>
            <img src="../assets/img/ornament_gold.png" alt="ornament">
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

        <div class="section">
          <div class="title">
            <img src="../assets/img/ornament_gold.png" alt="ornament">
            <p class="uppercase">Day tracker</p>
            <img src="../assets/img/ornament_gold.png" alt="ornament">
          </div>

          <div class="row uppercase">
            <span>Time of day:</span>
            <span class="spacer"></span>
            <img src="../assets/img/sun.png" alt="sun" class="icon" v-if="timeOfDay == 'daytime'">
            <img src="../assets/img/moon.png" alt="moon" class="icon" v-else>
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
            <button @click="toggleAOD" class="icon" id="led"
                    v-if="UA.includes('ios') || UA.includes('android')"
            >
              <img src="../assets/img/led_mini_dark.png" alt="led_icon">
            </button>
          </div>
        </div>

      </div>

      <div class="footer">
        <a href="https://github.com/AbFarid/daegmael" rel="noopener">
          <img src="../assets/img/GitHub_mark.png" alt="github_mark">
        </a>
        <a href="https://vuejs.org/" target="_blank" rel="noopener">
          <img src="../assets/img/Vue_logo.png" alt="vue_logo">
        </a>
        <a href="https://www.kingdomthegame.com/" target="_blank" rel="noopener">
          <img src="../assets/img/kingdom_crown.png" alt="crown"
               style="max-width: 22px; padding: 3px 0 0 1px;"
          >
        </a>
      </div>

    </div>
  <!-- </div> -->
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { State, Getter, Action } from '../utils/decorators';

@Component({ data: () => ({ publicPath: process.env.BASE_URL }) })
export default class Home extends Vue {

  @State() currentDay;
  @State() timerRunning;

  @State('userAgent') UA;

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

  @Action() toggleAOD;


  created() {
    this.initTimer();
  }
}
</script>

<style scoped lang="scss">
@import '@/_vars.scss';

@keyframes shine {
  20% {
    background-position: -512px;
  }
  100% {
    background-position: -512px;
  }
}

// .container {
//   padding-bottom: 20px;
// }

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
    background: url('../assets/img/crown.png') left center;
    animation: shine 6s steps(16) infinite;
  }
}

.footer {
  display: flex;
  justify-content: center;
  margin-top: 4px;

  img {
    margin: 0 5px;
    filter: brightness(10);
    opacity: 0.15;

    &:hover {
      opacity: 1;
      filter: brightness(1);
    }
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
  border-image-source: url('../assets/img/menu.png');

  input {
    padding: 8px 12px 6px;
    background-color: $color-input;
    color: $color-text;
    border-image-slice: 16 16 16 16;
    border-image-width: 4px 4px 4px 4px;
    border-image-outset: 0px 0px 0px 0px;
    border-image-repeat: repeat repeat;
    border-image-source: url('../assets/img/input.png');
    outline: none;

    &:focus {
      border-image-source: url('../assets/img/input_focus.png');
    }
  }

  button {
    background-color: $color-button;
    color: $color-button-text;
    font-family: Archer;
    padding: 5px 11px 10px 13px;
    border-image-slice: 16 23 32 23;
    border-image-width: 3px 6px 9px 6px;
    border-image-outset: 0px 0px 0px 0px;
    border-image-repeat: repeat repeat;
    border-image-source: url('../assets/img/button.png');
    outline: none;
    cursor: pointer;
    font-size: 12px;

    &:hover {
      border-image-source: url('../assets/img/button_hover.png');
    }
    &:active {
      border-image-source: url('../assets/img/button_active.png');
      padding: 6px 11px 9px 13px;
    }
    &:disabled {
      background-color: $color-button-disabled;
      border-image-source: url('../assets/img/button_disabled.png');
    }

    &.gothic {
      font-family: StGothic;
      padding: 3px 10px 6px;
      &:active {
        padding: 4px 10px 5px;
      }
    }

    &.icon{
      padding: 3px 7px 8px;
      img {
        width: 18px;
      }
      &:active:not(:disabled) {
        padding: 4px 7px 7px;
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

.android, .ios {
  button {
    padding: 5px 7px 10px 9px;
    &:active {
      padding: 6px 7px 10px 8px;
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

    img.icon {
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

.oled {
  .header {
    img,
    .crown {
      opacity: 0;
    }
  }

  .footer {
    opacity: 0;
  }

  .panel {
    &,
    button,
    input {
      border-image-source: none;
      background-color: black;
      color: white;
      border-radius: 4px;
    }
    button,
    input {
      border: 2px solid white;
    }

    button:disabled {
      border-color: gray;
      color: gray;
    }

    #led img {
      content: url('../assets/img/led_mini_light.png')
    }
  }

  .title {
    p {
      color: white;
    }
    img {
      content: url('../assets/img/ornament.png')
    }
  }
}
</style>
