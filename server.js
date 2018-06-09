const EventEmitter = require('events');
const fs = require('fs');

class Yamm extends EventEmitter {

    constructor(core) {
        super();
        this.loadPlayerCore(core);
        this.player.spawn().then(() => {
            console.log('after spawn()');
        }).catch((err) => {
            console.log(err);
        });
        this.events();
    }

    loadPlayerCore(core) {
        this.core = core;
        const Player = require('./lib/' + this.core + '.core');
        this.player = new Player();
    }

    events() {
        // stubbed
    }

}
