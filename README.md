# win-audio
Get, Set and Watch Speaker/Microphone Volume on Windows

[![Build Status](https://travis-ci.org/fcannizzaro/win-audio.svg?branch=master)](https://travis-ci.org/fcannizzaro/win-audio)
[![npm](https://img.shields.io/npm/v/win-audio.svg)](https://www.npmjs.com/package/win-audio)
[![npm](https://img.shields.io/npm/dm/win-audio.svg)](https://www.npmjs.com/package/win-audio)

# Install

```sh
npm i --save win-audio
```

### Requirements
[node-gyp](https://github.com/nodejs/node-gyp#installation) to build **audio.cc**

# Module
```javascript
 var win = require('win-audio');

 // manage speaker volume
 var speaker = win.speaker;

 // manage mic volume
 var microphone = win.mic;
```

# Usage

```javascript
var audio = require('win-audio').speaker;

audio.polling(200);

audio.events.on('change', (volume) => {
  console.log("old %d%% -> new %d%%", volume.old, volume.new);
});

audio.events.on('toggle', (status) => {
  console.log("muted: %s -> %s", status.old, status.new);
});

audio.set(40);

audio.increase(20);

audio.decrease(10);

audio.mute();
```

# Functions

#### `polling(interval: int = 500)`

- interval: milliseconds for check volume changes.

#### `get()`
**Return** current percentage of volume.

#### `isMuted()`
**Return** if speaker/mic is muted.

#### `set(value: int)`

 Set a new master volume.
 
 - value: percentage of new volume. **[0-100]**

#### `increase(value: int)`

Increase current volume of value %.

- value: percentage. **[0-100]**

#### `decrease(value: int)`

Decrease current volume of value %.

- value: percentage. **[0-100]**

#### `mute()`
Mute volume.

#### `unmute()`
Unmute volume.

#### `toggle()`
Mute/Unmute volume according to current status.

## Events

#### `change`
Called when volume is changed.

#### `toggle`
Called when volume is muted/unmuted.

# Thanks to
[Sebastian R (11AND2)](https://github.com/11AND2)


# Author
Francesco Cannizzaro
