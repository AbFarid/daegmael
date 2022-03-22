import Vue from 'vue';
import Vuex from 'vuex';
import Timer from 'easytimer.js';
import * as romanize from 'romanize';
import * as deromanize from 'deromanize';

import { toggleAOD, burnInProtector } from './utils/screen-tools';

const dayLength = 4 * 60; // seconds
const daytimeLength = 165; // seconds
const seasonLength = 16; // days
const seasons = ['spring', 'summer', 'autumn', 'winter'];

const getUA = () => {
  const ua = navigator.userAgent;
  let agent = '';
  const targets = [
    { input: 'Android', output: 'android' },
    { input: 'iPhone|iPad', output: 'ios' },
    { input: 'Chrome|CriOS', output: 'chrome' },
    { input: 'wv', output: 'webview' },
  ];
  for (const { input, output } of targets)
    if (new RegExp(input).test(ua)) agent += agent ? ` ${output}` : output;

  return agent;
}

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentDay: 'i',

    timer: new Timer(),
    timerRunning: false,

    elapsedTime: '0:00',
    elapsedSeconds: 0,
    elapsedDays: 0,

    AODmode: false,
    offset: { x: 0, y: 0 },
    userAgent: getUA(),
  },

  mutations: {
    setCurrentDay(state, value: string) {

      // remove uppercase and invalid roman numerals
      const processed = value
        .toLowerCase()
        .split('')
        .filter(s => /i|v|x|l|c|d|m/.test(s))
        .join('');

      state.currentDay = processed;
      // IDK why setting the last numeral to a valid one
      // is necessary for the change detection to work,
      // but if You know why, please, do tell.
      state.currentDay += 'i';
      state.currentDay = processed;
    },
    setElapsedTime(state, value) {
      state.elapsedTime = value;
    },
    setElapsedSeconds(state, value) {
      state.elapsedSeconds = value;
    },
    incrementElapsedDay(state) {
      state.elapsedDays += 1;
    },
    setTimerState(state, boolean) {
      state.timerRunning = boolean;
    },
    setAODmode(state, boolean) {
      state.AODmode = boolean;
    },
    setOffset(state, values) {
      state.offset = values;
    }
  },

  getters: {
    deromanized({ currentDay }): number {
      return deromanize(currentDay);
    },

    season(state, { deromanized }): string {
      let currentSeasonNum = Math.ceil(deromanized / seasonLength);
      while (currentSeasonNum > 4) currentSeasonNum -= 4;
      return seasons[currentSeasonNum - 1];
    },

    nextSeason(state, { deromanized }): string {
      const day = deromanized;
      let currentSeasonNum = Math.ceil(day / seasonLength);
      while (currentSeasonNum > 4) currentSeasonNum -= 4;
      return seasons[currentSeasonNum] || 'spring';
    },

    daysTillNextSeason(state, { deromanized }): number {
      const day = deromanized;
      return (seasonLength - (day % seasonLength)) % seasonLength;
    },

    daysTillWinter(state, { season, daysTillNextSeason }): number {
      const seasonIndex = seasons.indexOf(season);
      const daysTillWinter = (2 - seasonIndex) * seasonLength + daysTillNextSeason;
      return daysTillWinter < 0 ? 0 : daysTillWinter;
    },

    // Timer getters
    elapsedDayPercentage({ elapsedSeconds }): number {
      return (elapsedSeconds * 100) / dayLength;
    },

    timeOfDay({ elapsedSeconds }): string {
      return elapsedSeconds < daytimeLength ? 'daytime' : 'night';
    },

    daytimeCountdown({ elapsedSeconds }): string {
      if (elapsedSeconds < daytimeLength) {
        const remainingSeconds = daytimeLength - elapsedSeconds;
        const minutes = Math.floor(remainingSeconds / 60);
        let seconds = remainingSeconds % 60;
        return `${minutes}:${('0' + seconds).slice(-2)}`;
      } else {
        return '0:00';
      }
    },

    dayCountdown({ elapsedSeconds }): string {
      const remainingSeconds = dayLength - elapsedSeconds;
      const minutes = Math.floor(remainingSeconds / 60);
      let seconds = remainingSeconds % 60;
      return `${minutes}:${('0' + seconds).slice(-2)}`;
    }
  },

  actions: {
    changeDay({ getters, commit }, delta): void {
      const day = getters.deromanized;
      commit('setCurrentDay', romanize(day + delta).toLowerCase());
    },

    initTimer({ state, commit, dispatch }): void {
      const { timer } = state;
      timer.on('secondsUpdated', () => {
        const { elapsedSeconds } = state;
        const time = timer.getTimeValues();
        commit('setElapsedTime', time.toString().replace('00:0', ''));
        commit('setElapsedSeconds', time.minutes * 60 + time.seconds);
        // + 1 cause 0s second
        if (elapsedSeconds + 1 >= dayLength) {
          commit('incrementElapsedDay');
          dispatch('changeDay', 1);
          dispatch('resetTimer');
        }
      });
    },

    startTimer({ state, commit }) {
      commit('setTimerState', true);
      state.timer.start();
    },

    pauseTimer({ state, commit }) {
      commit('setTimerState', false);
      state.timer.pause();
    },

    stopTimer({ state, commit }) {
      commit('setTimerState', false);
      commit('setElapsedTime', '0:00');
      commit('setElapsedSeconds', 0);
      state.timer.stop();
    },

    resetTimer({ state, commit }): void {
      commit('setElapsedTime', '0:00');
      commit('setElapsedSeconds', 0);
      commit('setTimerState', true);
      state.timer.reset();
    },

    toggleAOD({ state, commit }) {
      toggleAOD(state.AODmode, val => commit('setAODmode', val));
      
      burnInProtector((y, x) => {
        commit('setOffset', { y, x });
      });
    },
  },
});
