import os from "os";
import {ChangeDirectory} from "./commands/changeDirectory.js";
import {List} from "./commands/list.js";
import {Arguments} from "./arguments.js";
import {Up} from "./commands/up.js";

export class Application {
    constructor() {
        this.currentPath = os.homedir();

        this.commands = {
            'cd': new ChangeDirectory(),
            'ls': new List(),
            'up': new Up(),
        }
    }

    start() {
        const args = new Arguments(process.argv.slice(2));

        const userName = args.getNamed('username');
        console.log(`Welcome to the File Manager, ${userName}!`);

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

            let call = input.split(' ');
            if (call[0] in this.commands) {
                let argString = '';
                if (call[1]) {
                    argString = call[1]
                }
                const callArgs = new Arguments(argString.split(' '))
                try{
                    await this.commands[call[0]].validate(this, callArgs)
                    await this.commands[call[0]].execute(this, callArgs)
                } catch (e) {
                    console.log(e.message);
                }

            } else {
                console.log('NO such command')
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
