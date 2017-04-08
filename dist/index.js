'use strict';

var EventEmitter = require('events');
var audio = require('./build/Release/audio');

var init = function init(mic) {

  var events = new EventEmitter();

  var data = {
    audio: audio.get(mic),
    status: audio.isMute(mic)
  };

  audio.mute(mic, 1);

  /**
   * Check and update current volume. [Generic]
   */
  var _check = function _check(fn, key, event) {

    var now = fn(mic);

    if (data[key] != now) {
      events.emit(event, {
        old: data[key],
        new: now
      });
    }

    data[key] = now;
  };

  /**
   * Check and update current volume.
   */
  var check = function check() {
    _check(audio.get, 'audio', 'change');
    _check(audio.isMute, 'status', 'toggle');
  };

  /**
   * Get current audio
   */
  var get = function get() {
    return audio.get(mic);
  };

  /**
   * Update current and delegate audio set to native module.
   */
  var set = function set(value) {
    audio.set(value, mic);
    check();
  };

  /**
   * Save current status and mute volume.
   */
  var mute = function mute() {
    audio.mute(mic, 1);
  };

  /**
   * Restore previous volume.
   */
  var unmute = function unmute() {
    audio.mute(mic, 0);
  };

  /**
   * Mute/Unmute volume.
   */
  var toggle = function toggle() {
    if (audio.isMute(mic)) unmute();else mute();
  };

  /**
   * React to volume changes using polling check.
   */
  var polling = function polling(interval) {
    setInterval(check, interval || 500);
  };

  /**
   * Increase current volume of value%
   */
  var increase = function increase(value) {

    unmute();

    var perc = data.audio + value;

    if (perc < 0) perc = 0;

    if (perc > 100) perc = 100;

    set(perc);
  };

  /**
   * Decrease current volume of value%
   */
  var decrease = function decrease(value) {
    increase(-value);
  };

  return {
    events: events,
    polling: polling,
    get: get,
    set: set,
    increase: increase,
    decrease: decrease,
    mute: mute,
    unmute: unmute,
    toggle: toggle
  };
};

module.exports = {
  speaker: init(0),
  mic: init(1)
};