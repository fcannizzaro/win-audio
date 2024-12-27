import EventEmitter from "events";
import bindings from "bindings";

const audio = bindings("../build/Release/audio.node");

type Event<T extends EventType> = T extends "change"
  ? {
      old: number;
      new: number;
    }
  : {
      old: boolean;
      new: boolean;
    };

type EventType = "change" | "toggle";

const initDevice = (device: number) => {
  const events = new EventEmitter();

  const data = {
    audio: audio.get(device),
    status: audio.isMuted(device),
  };

  let interval: NodeJS.Timeout;

  /**
   * Check and update current volume. [Generic]
   */
  const update = (
    fn: (v: number) => number | boolean,
    key: "status" | "audio",
    event: EventType
  ) => {
    let now = fn(Number(device));

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
  const check = () => {
    update(audio.get, "audio", "change");
    update(audio.isMuted, "status", "toggle");
  };

  /**
   * Get current audio
   */
  const get = (): number => audio.get(device);

  /**
   * Update current and delegate audio set to native module.
   */
  const set = (value: number) => {
    audio.set(value, device);
    check();
  };

  /**
   * Save current status and mute volume.
   */
  const mute = (): void => audio.mute(device, 1);

  /**
   * Restore previous volume.
   */
  const unmute = (): void => audio.mute(device, 0);

  /**
   * Mute/Unmute volume.
   */
  const toggle = () => {
    const fn = audio.isMuted(device) ? unmute : mute;
    fn();
  };

  /**
   * React to volume changes using polling check.
   */
  const start = (every: number) => {
    interval = setInterval(check, every || 500);
  };

  /**
   * Stop polling check.
   */
  const stop = () => {
    clearInterval(interval);
  };

  /**
   * Increase current volume of value%
   */
  const increase = (value: number) => {
    unmute();
    set(Math.min(Math.max(0, data.audio + value), 100));
  };

  /**
   * Decrease current volume of value%
   */
  const decrease = (value: number) => increase(-value);

  /**
   * Check if is muted
   */
  const isMuted = () => audio.isMuted(device) === 1;

  return {
    // Events
    on: <T extends EventType>(event: T, cb: (v: Event<T>) => void) =>
      events.on(event, cb),
    off: <T extends EventType>(event: T, cb: (v: Event<T>) => void) =>
      events.off(event, cb),
    once: <T extends EventType>(event: T, cb: (v: Event<T>) => void) =>
      events.once(event, cb),
    removeAllListeners: () => events.removeAllListeners(),
    // Methods
    start,
    stop,
    get,
    set,
    increase,
    decrease,
    mute,
    unmute,
    isMuted,
    toggle,
  };
};

type Instance = ReturnType<typeof initDevice>;

type ProxyInstances = {
  speaker: Instance;
  mic: Instance;
};

const instances: Partial<ProxyInstances> = {};

const proxy = new Proxy(
  {},
  {
    get: (_, prop: "speaker" | "mic") => {
      let instance = instances[prop];
      if (!instance) {
        instance = initDevice(prop === "mic" ? 1 : 0);
        instances[prop] = instance;
      }
      return instance;
    },
  }
) as ProxyInstances;

export default proxy;

module.exports = proxy;
