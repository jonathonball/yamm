const EventEmitter = require('events');
const fs = require('fs');

class Yamm extends EventEmitter {

    constructor(core, args = []) {
        super();
        this.loadPlayerCore(core);
        this.player.spawn(args).catch((err) => {
            if (err) throw err;
        });
        this.player.events();
    }

    loadPlayerCore(core) {
        this.core = core;
        const Player = require('./lib/' + this.core + '.core');
        this.player = new Player();
    }

}
