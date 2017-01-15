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

# Usage

```javascript
var audio = require('win-audio')

audio.polling(200)

audio.on('change', (volume) => {
  console.log("old %d%% -> new %d%%", volume.old, volume.new)
})

audio.set(75)

audio.increase(25)

audio.mute()

audio.decrease(10)
```

# Functions

### module(interval)

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

# Author
Francesco Cannizzaro
