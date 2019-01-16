<template>
  <div id="app" :class="[userAgent, {oled: AODmode}, {isPWA}]" >
    <Home :style="{transform: 'translate('+ offset.x +'px, '+ offset.y +'px)'}" />

    <!-- <div class="footer">
      <p @click="oled = !oled">
        {{UA}}
        <span v-if="isPWA">PWA</span>
      </p>
      <p @click="toggleFullScreen">fullscreen: {{fullscreen ? 'on' : 'off'}}</p>
      <p @click="toggleNoSleep">noSleep: {{wakelock ? 'on' : 'off'}}</p>
    </div> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Home from './views/Home.vue';
import { State } from './utils/decorators';

@Component({ components: { Home } })
export default class App extends Vue {
  @State() AODmode;
  @State() offset;
  @State() userAgent;

  get isPWA() {
    return window.matchMedia('(display-mode: fullscreen)').matches;
  }

}
</script>

<style lang="scss">
@font-face {
  font-family: StGothic;
  font-display: auto;
  src: url('./assets/fonts/Stgotic.otf') format('opentype');
}
@font-face {
  font-family: OrangeKid;
  font-display: auto;
  src: url('./assets/fonts/orange_kid.ttf') format('opentype');
}
@font-face {
  font-family: Archer;
  font-display: auto;
  src: url('./assets/fonts/archer.ttf') format('opentype');
}

.gothic {
  font-family: StGothic;
}
.retro {
  font-family: OrangeKid;
}
.archer {
  font-family: Archer;
}

// html { background-image: url('/img/brick_wall_pattern.png'); }

body {
  background-color: black;
  background-image: url('./assets/img/brick_wall_pattern.png');
  margin: 0;
}

#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  image-rendering: pixelated;
  color: gold;

  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;

  * {
    transition: opacity 0.3s ease, color 0.3s ease, background-color 0.3s ease;
    transition-delay: none;
  }

  &.chrome {
    &.android {
      height: calc(100vh - 56px);
    }
  }

  &.oled {
    background-color: black;
    color: white;
  }

  > .footer {
    position: fixed;
    bottom: 0;
    display: flex;
    width: 100%;
    justify-content: space-around;
  }
}

:-webkit-full-screen #app.chrome.android,
#app.chrome.android.isPWA {
  height: 100vh;
}

.spacer {
  flex-grow: 1;
}
.uppercase {
  text-transform: uppercase;
}

$color-container: black;
/* Pixel Border Colors */
$color-border: black; 
$color-border-accent: white;

/******** PIXEL BORDER ********/
.pxl-border {
  background: $color-container;
  color: white;
  font-family: Archer;
  padding: 3px 20px !important;
  margin-bottom: 10px;
  box-shadow:
    /* Inner Background Color */
      0   -6px 0  -2px $color-container,
      0    6px 0  -2px $color-container,
      0  -12px 0  -4px $color-container,
      0   12px 0  -4px $color-container,
      0  -18px 0  -8px $color-container,
      0   18px 0  -8px $color-container,
      0  -24px 0 -12px $color-container,
      0   24px 0 -12px $color-container,
    /* Inner Border */
     -2px  0   0   0   $color-border,
      2px  0   0   0   $color-border,
      0   -4px 0   0   $color-border,
      0    4px 0   0   $color-border,
      0  -10px 0  -2px $color-border,
      0   10px 0  -2px $color-border,
      0  -14px 0  -4px $color-border,
      0   14px 0  -4px $color-border,
      0  -20px 0  -8px $color-border,
      0   20px 0  -8px $color-border,
      0  -26px 0 -12px $color-border,
      0   26px 0 -12px $color-border,
    /* Middle Border */
     -4px  0   0   0   $color-border-accent,
      4px  0   0   0   $color-border-accent,
      0   -2px 0   2px $color-border-accent,
      0    2px 0   2px $color-border-accent,
      0   -8px 0   0px $color-border-accent,
      0    8px 0   0px $color-border-accent,
      0  -12px 0  -2px $color-border-accent,
      0   12px 0  -2px $color-border-accent,
      0  -16px 0  -4px $color-border-accent,
      0   16px 0  -4px $color-border-accent,
      0  -22px 0  -8px $color-border-accent,
      0   22px 0  -8px $color-border-accent,
      0  -28px 0 -12px $color-border-accent,
      0   28px 0 -12px $color-border-accent,
    /* Outer Border */
     -6px  0   0   0   $color-border,
      6px  0   0   0   $color-border,
      0    0   0   4px $color-border,
      0   -6px 0   2px $color-border,
      0    6px 0   2px $color-border,
      0  -10px 0   0   $color-border,
      0   10px 0   0   $color-border,
      0  -14px 0  -2px $color-border,
      0   14px 0  -2px $color-border,
      0  -18px 0  -4px $color-border,
      0   18px 0  -4px $color-border,
      0  -24px 0  -8px $color-border,
      0   24px 0  -8px $color-border,
      0  -30px 0 -12px $color-border,
      0   30px 0 -12px $color-border
      !important;
}
</style>
