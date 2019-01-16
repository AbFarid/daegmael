import NoSleep from 'nosleep.js';
import Toastify from 'toastify-js';

const rng = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const doc = window.document;
const docEl = doc.documentElement;
const fullscreenIsOn = () => !(!doc['fullscreenElement'] && !doc['webkitFullscreenElement']);
const toggleFullScreen = (): void => {
  const requestFullScreen = docEl.requestFullscreen || docEl['webkitRequestFullScreen'];
  const cancelFullScreen = doc.exitFullscreen || doc['webkitExitFullscreen'];

  if (!fullscreenIsOn()) requestFullScreen.call(docEl);
  else cancelFullScreen.call(doc);
}

let noSleep: NoSleep;
let wakelockIsOn = false;
const toggleNoSleep = (): void => {
  if (noSleep === undefined) noSleep = new NoSleep();

  if (!wakelockIsOn) {
    noSleep.enable();
    wakelockIsOn = true;
  } else {
    noSleep.disable();
    wakelockIsOn = false;
  }
}

const toggleAOD = (AODisOn: boolean, callback: Function): void => {
  const options = {
    text: 'Whoops!',
    duration: 3000,
    gravity: 'bottom',
    positionLeft: true,
    backgroundColor: 'black',
    className: "pxl-border",
  }

  if (AODisOn) {
    // AOD on
    options.text = 'ALWAYS-ON DISPLAY: INACTIVE';
    callback(false);
  } else {
    // AOD off
    options.text = 'ALWAYS-ON DISPLAY: ACTIVE';
    callback(true);
  }

  Toastify(options).showToast();
  toggleNoSleep();
  if (AODisOn == fullscreenIsOn()) toggleFullScreen();
}


let BIPrunning = false; // burn-in protector
let intervalRef: number | null;
const deviation = { 
  ver: { min: -70, max: 10 },
  hor: { min: -16, max: 16 }
};
const burnInProtector = (callback: Function) => {
  if (!intervalRef) {
    callback(
      rng(deviation.ver.min, deviation.ver.max),
      rng(deviation.hor.min, deviation.hor.max)
    );
    intervalRef = setInterval(() => {
      callback(
        rng(deviation.ver.min, deviation.ver.max),
        rng(deviation.hor.min, deviation.hor.max)
      );
    }, 60 * 1000);
  } else {
    clearInterval(intervalRef);
    intervalRef = null;
    callback(0, 0);
  }
}

export { toggleFullScreen, toggleNoSleep, toggleAOD, burnInProtector };