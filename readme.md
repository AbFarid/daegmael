# ![logo](https://github.com/AbFarid/daegmael/blob/master/public/img/icons/icon.png?raw=true) Daegmael
> **Dæg-Mæl** - Anglo-Saxon for "day measure".

  
## Introduction

Unofficial companion app for game __Kingdom: Two Crowns__.
http://abfarid.github.io/daegmael/


#### Features:
* __convert Roman numerals__ (into Arabic numerals, with which you don't have to do a bunch of math)
* __show current season__
* __show amount of days left till winter comes__ (and crushes you)
* __shows time till sunset/sunrise__ (slightly more precisely than Sun and Moon)
* __always-on display that keeps your info at a glance__ (even has burn-in protection for OLED screens)
* __offline installation for compatible devices__ (as a PWA app, it can be installed into your app drawer)

# Usage

### Season tracker
Enter your current in-game campaign day (shown in the pause menu) using the in app buttons (or keyboard; only valid Roman numerals):
* ___-i___ / ___+i___ jumps a day backwards/forwards
* ___-xvi___ / ___+xvi___ jumps a season backwards/forwards

You can now see your season related information:
* Current day in Arabic numerals
* Current season
* Days left till winter starts/ends

### Day tracker
If you'd like to use automatic day progression and/or see daytime countdown to know precise time, use the countdown timer.

Timer buttons:
* __START__ - Starts or resumes the countdown
* __PAUSE__ - Pauses the countdown
* __STOP__ - Stops and resets the countdown
* __RESET__ - Resets and starts countdown immediately (useful for readjusting timer)
    
Optionally, if you're on a mobile device (Android/iOS) you'll see a button with an LED (![LED](https://github.com/AbFarid/daegmael/blob/master/src/assets/img/led_mini_dark.png?raw=true)) icon, that will enable the _always-on display_ (AOD). This will remove the unnecessary UI element and keep your screen awake untill you press the button again. There's a basic OLED screen burn-in protection enabled, where the content will move around once a minute.

## Installation as native(ish) app for offline use
The web app can be installed onto your compatible device (Windows/Android/iOS) as a Progressive Web App (PWA). Doing so enables offline usage of the app.
