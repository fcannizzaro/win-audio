"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("../src");
var speaker = src_1.default.speaker;
speaker.start(200);
speaker.on("change", function (volume) {
    console.log("old %d%% -> new %d%%", volume.old, volume.new);
});
speaker.on("toggle", function (status) {
    console.log("muted: %s -> %s", status.old, status.new);
});
speaker.set(40);
speaker.increase(20);
speaker.decrease(10);
speaker.mute();
console.log("isMuted", speaker.isMuted());
speaker.stop();
