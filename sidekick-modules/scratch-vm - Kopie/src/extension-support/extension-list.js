// !!! EXTENSION TOOL
// !!!
// !!!

// !!! IDEE
// !!! Sobald Sidekick-Erweiterung fertig ist, könnte man die Erweiterung eventuell dauerhaft hier einfuegen.
// !!! Oder auch: Skript schreiben, um es hier einzufuegen; auch wenn z. B. Sidekick schon als Anwendung exportiert ist.

const builtinExtensions = {
    // This is an example that isn't loaded with the other core blocks,
    // EXTENSION
    // but serves as a reference for loading core blocks as extensions.
    // ??? Funktion, etc. ... ???
    // !!! TESTEN
    // !!!
    coreExample: () => require('../blocks/sidekick_core_example'),
    // ??? Ja, und ... ???
    // !!!
    // These are the non-core built-in extensions.
    pen: () => require('../extensions/sidekick_pen'),
    wedo2: () => require('../extensions/sidekick_wedo2'),
    music: () => require('../extensions/sidekick_music'),
    microbit: () => require('../extensions/sidekick_microbit'),
    text2speech: () => require('../extensions/sidekick_text2speech'),
    translate: () => require('../extensions/sidekick_translate'),
    videoSensing: () => require('../extensions/sidekick_video_sensing'),
    ev3: () => require('../extensions/sidekick_ev3'),
    makeymakey: () => require('../extensions/sidekick_makeymakey'),
    boost: () => require('../extensions/sidekick_boost'),
    gdxfor: () => require('../extensions/sidekick_gdx_for'),
    httpio: () => require('../extensions/sidekick_httpio'),
    json: () => require('../extensions/sidekick_json')
};

module.exports = builtinExtensions;
