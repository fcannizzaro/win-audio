import audio from "../src";

const speaker = audio.speaker;

speaker.start(200);

speaker.on("change", (volume) => {
  console.log("old %d%% -> new %d%%", volume.old, volume.new);
});

speaker.on("toggle", (status) => {
  console.log("muted: %s -> %s", status.old, status.new);
});

speaker.set(40);

speaker.increase(20);

speaker.decrease(10);

speaker.mute();

console.log("isMuted", speaker.isMuted());

speaker.stop();
