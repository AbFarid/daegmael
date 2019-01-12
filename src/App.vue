<template>
  <div id="app" :class="UA" >
    <Home />
    <!-- <p style="position: fixed; bottom: 0">{{UA}}</p> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Home from './views/Home.vue';

@Component({
  components: {
    Home,
  },
})
export default class App extends Vue {
  get UA() {
    const ua = navigator.userAgent;
    let agent = '';
    const targets = [
      { input: 'Android', output: 'android' },
      { input: 'iPhone|iPad', output: 'ios' },
      { input: 'Chrome|CriOS', output: 'chrome' },
      { input: 'wv', output: 'webview' },
    ];
    for (const { input, output } of targets)
      if (new RegExp(input).test(ua)) agent += output ? ` ${output}` : output;

    return agent;
  }
}
</script>

<style lang="scss">
@font-face {
  font-family: StGothic;
  src: url(require('@/public/Stgotic.otf')) format('opentype');
}
@font-face {
  font-family: OrangeKid;
  src: url('/fonts/orange_kid.ttf') format('opentype');
}
@font-face {
  font-family: Archer;
  src: url('/fonts/archer.ttf') format('opentype');
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
  background-image: url('~/img/brick_wall_pattern.png');
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  image-rendering: pixelated;
  color: gold;

  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;

  &.chrome {
    &.android {
      height: calc(100vh - 56px);
    }
    // &.ios {
    //   height: calc(100vh + 56px);
    // }
  }
}

.spacer {
  flex-grow: 1;
}
.uppercase {
  text-transform: uppercase;
}
</style>
