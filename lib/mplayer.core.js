const PlayerCore = require('./player.core');

class MPlayerCore extends PlayerCore {

    constructor() {
        super();
        this.core = 'mplayer';
        this.defaultArgs = [
            '-novideo',
            '-nolirc',
            '-msglevel', 'global=6',
            '-msglevel', 'cplayer=4',
            '-slave',
            '-idle'
        ];
    }

    parseStdout(input) {
        // stubbed
    }

}

module.exports = MPlayerCore;
