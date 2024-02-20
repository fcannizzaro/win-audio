# win-audio

Get, set and watch speaker/microphone volumes on Windows

[![Publish package to npmjs](https://github.com/fcannizzaro/win-audio/actions/workflows/publish-package.yaml/badge.svg)](https://github.com/fcannizzaro/win-audio/actions/workflows/publish-package.yaml)
[![npm](https://img.shields.io/npm/v/win-audio.svg)](https://www.npmjs.com/package/win-audio)
[![npm](https://img.shields.io/npm/dm/win-audio.svg)](https://www.npmjs.com/package/win-audio)

## Install

```sh
npm i --save win-audio
# or
yarn add win-audio
# or
pnpm add win-audio
```

## Requirements

[node-gyp](https://github.com/nodejs/node-gyp#installation) to build **audio-napi.cc**

This version requires **N-API**, and **node** version **>= 8.6.0**

## Module

```typescript
import audio from 'win-audio';

 // manage speaker volume
 const speaker = audio.speaker;

 // manage mic volume
 const microphone = audio.mic;
```

## Usage

```javascript
import audio from 'win-audio';

const speaker = audio.speaker;

// start watching audio devices
speaker.start(200);

// listen for volume changes
speaker.on('change', (volume) => {
  console.log("old %d%% -> new %d%%", volume.old, volume.new);
});

// listen for mute changes
speaker.on('toggle', (status) => {
  console.log("muted: %s -> %s", status.old, status.new);
});

// set volume to 40%
speaker.set(40);

// increase volume by 20%
speaker.increase(20);

// decrease volume by 10%
speaker.decrease(10);

// mute volume
speaker.mute();

// unmute volume
speaker.unmute();

// get volume
console.log(speaker.get());

// stop watching audio devices
speaker.stop()
```

## Thanks to

[Sebastian R (11AND2)](https://github.com/11AND2)

[Emilijus436](https://github.com/Emilijus436)

## Author

Francesco Saverio Cannizzaro (fcannizzaro)
