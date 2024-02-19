"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_events_1 = require("node:events");
var bindings_1 = require("bindings");
var audio = (0, bindings_1.default)("../build/Release/audio.node");
var initDevice = function (mic) {
    var events = new node_events_1.default();
    var data = {
        audio: audio.get(mic),
        status: audio.isMuted(mic),
    };
    var interval;
    /**
     * Check and update current volume. [Generic]
     */
    var update = function (fn, key, event) {
        var now = fn(Number(mic));
        if (key === "status") {
            now = Boolean(now);
        }
        if (data[key] !== now) {
            events.emit(event, {
                old: data[key],
                new: now,
            });
        }
        data[key] = now;
    };
    /**
     * Check and update current volume.
     */
    var check = function () {
        update(audio.get, "audio", "change");
        update(audio.isMuted, "status", "toggle");
    };
    /**
     * Get current audio
     */
    var get = function () { return audio.get(mic); };
    /**
     * Update current and delegate audio set to native module.
     */
    var set = function (value) {
        audio.set(value, mic);
        check();
    };
    /**
     * Save current status and mute volume.
     */
    var mute = function () { return audio.mute(mic, 1); };
    /**
     * Restore previous volume.
     */
    var unmute = function () { return audio.mute(mic, 0); };
    /**
     * Mute/Unmute volume.
     */
    var toggle = function () {
        var fn = audio.isMuted(mic) ? unmute : mute;
        fn();
    };
    /**
     * React to volume changes using polling check.
     */
    var start = function (every) {
        interval = setInterval(check, every || 500);
    };
    /**
     * Stop polling check.
     */
    var stop = function () {
        clearInterval(interval);
    };
    /**
     * Increase current volume of value%
     */
    var increase = function (value) {
        unmute();
        set(Math.min(Math.max(0, data.audio + value), 100));
    };
    /**
     * Decrease current volume of value%
     */
    var decrease = function (value) { return increase(-value); };
    /**
     * Check if is muted
     */
    var isMuted = function () { return audio.isMuted(mic) === 1; };
    return {
        // Events
        on: function (event, cb) {
            return events.on(event, cb);
        },
        off: function (event, cb) {
            return events.off(event, cb);
        },
        once: function (event, cb) {
            return events.once(event, cb);
        },
        removeAllListeners: function () { return events.removeAllListeners(); },
        // Methods
        start: start,
        stop: stop,
        get: get,
        set: set,
        increase: increase,
        decrease: decrease,
        mute: mute,
        unmute: unmute,
        isMuted: isMuted,
        toggle: toggle,
    };
};
var instances = {};
exports.default = new Proxy({}, {
    get: function (_, prop) {
        var instance = instances[prop];
        if (!instance) {
            instance = initDevice(prop === "mic");
            instances[prop] = instance;
        }
        return instance;
    },
});
