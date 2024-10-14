import os from "os";
import {ChangeDirectory} from "./commands/changeDirectory.js";
import {List} from "./commands/list.js";
import {Arguments} from "./arguments.js";
import {Up} from "./commands/up.js";
import {Cat} from "./commands/cat.js";
import {Add} from "./commands/add.js";
import {Rn} from "./commands/rn.js";
import {Cp} from "./commands/cp.js";
import {Mv} from "./commands/mv.js";
import {Rm} from "./commands/rm.js";
import {Hash} from "./commands/hash.js";
import {Compress} from "./commands/compress.js";
import {Decompress} from "./commands/decompress.js";
import {Os} from "./commands/os.js";



export class Application {
    constructor() {
        this.currentPath = os.homedir();

        this.commands = {
            'cd': new ChangeDirectory(),
            'ls': new List(),
            'up': new Up(),
            'cat': new Cat(),
            'add': new Add(),
            'rn': new Rn(),
            'cp': new Cp(),
            'mv': new Mv(),
            'rm': new Rm(),
            'hash': new Hash(),
            'compress': new Compress(),
            'decompress': new Decompress(),
            'os': new Os(),
        }
    }

    start() {
        const args = new Arguments(process.argv.slice(2));

        const userName = args.getNamed('username');
        console.log(`Welcome to the File Manager, ${userName}!`);
        console.log(`You are currently in ${this.getCurrentPath()}`);
        console.log('Enter the command:');

        function exitFunc(name) {
            console.log(`Thank you for using File Manager, ${name}, goodbye!`);
            process.exit(0);
        }

        process.on('SIGINT', async () => {
            exitFunc(userName);
        });

        process.stdin.on('data', async (data) => {
            const input = data.toString().trim();
            if (input === '.exit') {
                exitFunc(userName);
            }

            const call = input.split(' ');
            const command = call.shift();
            if (command in this.commands) {
                const callArgs = new Arguments(call)
                try {
                    await this.commands[command].validate(this, callArgs)

                    try {
                        await this.commands[command].execute(this, callArgs)
                    }catch(e) {
                        console.log('Operation failed')
                        console.log(e.message)
                    }
                }catch(e) {
                    console.log('Invalid input')
                    console.log(e.message)
                }



                console.log(`You are currently in ${this.getCurrentPath()}`);
            } else {
                console.log('No such command')
            }
        })
    }

    getCurrentPath() {
        return this.currentPath;
    }

    setCurrentPath(path) {
        this.currentPath = path;
    }
}
