<template>
  <div id="app"><Home /></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Home from './views/Home.vue';

@Component({
  components: {
    Home,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
@font-face {
  font-family: StGothic;
  src: url('/fonts/Stgotic.otf') format('opentype');
}
@font-face {
  font-family: OrangeKid;
  src: url('/fonts/orange_kid.ttf') format('opentype');
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.gothic {
  font-family: StGothic;
}
.retro {
  font-family: OrangeKid;
}
</style>
