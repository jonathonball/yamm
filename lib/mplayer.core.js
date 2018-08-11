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
        if (input.indexOf('EOF') !== -1) {
            if (input.indexOf('1') !== -1) {
                this.emit('eof_natural');
            }
            if (input.indexOf('4') !== -1 || input.indexOf('2') !== -1) {
                this.emit('eof_user');
            }
        } else if (input.indexOf('A:') === 0) {
            let time = this.parseCurrentTime(input);
            let total = this.parseRemainingTime(input);
            this.emit('timechange', time, total, input);
        } else if(input.indexOf('Starting playback...') !== -1) {
            this.emit('playstart');
        }
    }

}

module.exports = MPlayerCore;
