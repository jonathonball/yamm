const EventEmitter = require('events');


class StreamPlayer extends EventEmitter {

    constructor() {
        this.playback = false;
        this.timeIndex = 0;
        this.timeTotal = 0;
        this.commandName = 'MPlayer';
        this.command = '/usr/bin/mplayer';
        this.playerInstance = null;
        this.defaultArgs = [];
    }

    spawn(args) {
        args = defaultArgs.concat(args);

        this.playerInstance = Spawn('mplayer', args);

        this.playerInstance.stderr.on('data', (data) => {
            this.emit('error', data.toString());
        });
        this.playerInterface = readline.createInterface({ 
            input: this.playerInstance.stdout 
        });

        playerInterface.on('close', () => {
            this.emit('player_exit');
        });

        playerInterface.on('line', (input) => {
            this.parseStreamOutput(input);
        });
    }

    command(command, args = []) {
         if(typeof args === 'string') {
             args = [args];
         }
         this.playerInstance.stdin.write([command].concat(args).join(' ') + "\n");
     }

     parseStreamOutput(input) {
         if (input.indexOf('EOF') !== -1) {
             if (input.indexOf('1') !== -1) {
                 this.emit('stop_eof');
             }
             if (input.indexOf('4') !== -1 || input.indexOf('2') !== -1) {
                 this.emit('stop_user');
             }
             return true;
         }
         if(input.indexOf('A:') === 0) {
             let time = this.parseCurrentTime(input);
             let total = this.parseRemainingTime(input);
             this.emit('time', time, total, input);
             return true;
         }
         if(input.indexOf('Starting playback...') !== -1) {
             this.emit('playstart');
         }
     }

     play() {
         
     }

     pause() {
         
     }

     closeStream() {
         
     }

     seekToTimeIndex(seconds) {
         
     }

     seekToPercent(percent) {
         
     }

     seekByInterval(seconds) {
         
     }

     update() {
         
     }

     /**
      * BEGIN mplayer specific functions
      */

     parseCurrentTime(input) {
         let timeStart, timeEnd;
         timeStart = input.indexOf('A:') + 2;
         timeEnd = input.indexOf(' (');
         return input.substring(timeStart, timeEnd).trim();
     }

     parseRemainingTime(input) {
         let start, end;
         start = input.indexOf('of') + 2;
         end = input.indexOf('(', input.indexOf('(') + 1);
         return input.substring(start, end);
     }

}
