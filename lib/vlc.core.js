const PlayerCore = require('./player.core');

class VlcCore extends PlayerCore {

    constructor() {
        super();
        this.core = 'vlc';
        this.defaultArgs = [];
    }

}

module.exports = VlcCore;
