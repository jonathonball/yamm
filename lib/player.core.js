const EventEmitter = require('events');
const Spawn = require('child_process').spawn;
const readline = require('readline');

class PlayerCore extends EventEmitter {

    constructor() {
        super();
        this.process_running = false;
        this.options = {
            args: [],
        };
    }

    spawn(args = []) {
        return new Promise((resolve, reject) => {
            if (! this.core) reject(Error('core not defined'));
            if (! this.defaultArgs) reject(Error('defaultArgs not defined'));
            if (typeof this.parseStdout != 'function') reject(Error('player core interface not met'));
            this.instance = Spawn(this.core, this.defaultArgs.concat(args));
            this.instance.stderr.on('data', (data) => {
                this.emit('error', data.toString());
            });
            this.process_running = true;
            this.stdin = this.instance.stdin;
            this.stdout = readline.createInterface({ input: this.instance.stdout });
            this.stdout.on('close', () => {
                this.emit('player_exit');
            });
            this.stdout.on('line', (input) => {
                this.parseStdout(input);
            });
            resolve();
        });
    }

    command(command, args = []) {
        if (! Array.isArray(args)) {
            args = [args];
        }
        this.stdin.write([command].concat(args).join(' ') + "\n");
    }

}

module.exports = PlayerCore;
