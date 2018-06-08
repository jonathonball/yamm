const PlayerCore = require('./player.core');

class MpvCore extends PlayerCore {

    constructor() {
        super();
        this.core = 'mpv';
        this.defaultArgs = [];
    }

}

module.exports = MpvCore;
