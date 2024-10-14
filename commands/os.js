import {Command} from './command.js';
import os from 'os';

export class Os extends Command {
    async validate(app, args) {
        if (!args.exists('EOL')) {
            return;
        }
        if (!args.exists('cpus')) {
            return;
        }
        if (!args.exists('homedir')) {
            return;
        }
        if (!args.exists('username')) {
            return;
        }
        if (!args.exists('architecture')) {
            return;
        }

        throw new Error('Invalid argument. Use: os --EOL');
    }

    async execute(app, args) {

        if (args.exists('EOL')) {
            console.log(`EOL: "${os.EOL}"`);
        }
        if (args.exists('cpus')) {
            const cpus = os.cpus();
            console.log(`CPUs: ${cpus.length}`);
        }
        if (args.exists('homedir')) {
            console.log(`Home Directory: "${os.homedir()}"`);
        }
        if (args.exists('username')) {
            console.log(`Username: "${os.userInfo().username}"`);
        }
        if (args.exists('architecture')) {
            console.log(`Architecture: "${os.arch()}"`);
        }
    }
}
