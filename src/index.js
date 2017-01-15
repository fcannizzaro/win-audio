const EventEmitter = require('events')
const events = new EventEmitter()
const audio = require('../build/Release/audio')

var current = audio.get()
var stored = current

/**
 * Check and update current volume.
 */
var check = () => {

  let now = audio.get()

  if (current != null && current != now)
    events.emit('change', {
      old: current,
      new: now
    })

  current = now

  if (current > 0)
    stored = current

}

/**
 * Update current and delegate audio set to native module.
 */
var set = (value) => {
  audio.set(value)
  check()
}

/**
 * Save current status and mute volume.
 */
var mute = () => {
  stored = audio.get()
  set(0)
}

/**
 * Restore previous volume.
 */
var unmute = () => {
  if (stored) {
    set(stored)
    stored = null
  }
}

/**
 * Mute/Unmute volume.
 */
var toggleMute = () => {
  if (stored > 0)
    mute()
  else
    unmute()
}

/**
 * React to volume changes using polling check.
 */
var polling = (interval) => {
  setInterval(check, interval || 500)
}

/**
 * Increase current volume of value%
 */
var increase = (value) => {

  unmute()

  let perc = current + value

  if (perc < 0)
    perc = 0

  if (perc > 100)
    perc = 100

  set(perc)

}

/**
 * Decrease current volume of value%
 */
var decrease = (value) => {
  increase(-value)
}

module.exports = events
module.exports.polling = polling

// get/set
module.exports.get = audio.get
module.exports.set = set

// volume helpers
module.exports.increase = increase
module.exports.decrease = decrease

// mute/unmute
module.exports.mute = mute
module.exports.unmute = unmute
module.exports.toggleMute = toggleMute
