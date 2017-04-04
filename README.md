# win-audio
Get, Set and Watch Master Audio Volume

[![npm](https://img.shields.io/npm/v/win-audio.svg)](https://www.npmjs.com/package/win-audio)
[![npm](https://img.shields.io/npm/dm/win-audio.svg)](https://www.npmjs.com/package/win-audio)

# Install

```sh
npm i --save win-audio
```

### Requirements
[node-gyp](https://github.com/nodejs/node-gyp#installation) to build **src/audio.cc**

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
var audio = require('../index').speaker;

audio.polling(200);

audio.events.on('change', (volume) => {
  console.log("volume: old %d%% -> new %d%%", volume.old, volume.new);
});

audio.events.on('toggle', (status) => {
  console.log("muted: %s -> %s", status.old, status.new);
});

audio.set(40);

audio.increase(20);

audio.decrease(10);

audio.mute();
```

## Breaking changes version 1.0.1 -> 1.1.0
- **EventEmitter** is now audio.events
- **all functions** should be called on "speaker" or "mic" object

# Functions

### polling(interval)

- `Number` interval: milliseconds for check volume changes. (**Default** 500)

### get()
**Return** current percentage of volume.

### set(value)

Set a new master volume.

- `Number` value: percentage of new volume. **[0-100]**

### increase(value)

Increase current volume of value %.

- `Number` value: percentage. **[0-100]**

### decrease(value)

Decrease current volume of value %.

- `Number` value: percentage. **[0-100]**

### mute()
Mute volume.

### unmute()
Unmute volume.

### toggleMute()
Mute/Unmute volume according to current status.

# Events

### change
Called when volume is changed.

### toggle
Called when volume is muted/unmuted.

# Author
Francesco Cannizzaro
