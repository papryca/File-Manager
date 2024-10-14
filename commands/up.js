import {Command} from "./command.js";
import path from "path";

export class Up extends Command {
    async validate(app, args) {
        if (args.getArgs().length !== 0) {
            throw new Error('Invalid arguments for "up" command. No arguments expected.');
        }
    }
    async execute(app, args) {
        const pathFile = app.getCurrentPath();
        app.setCurrentPath(path.resolve(pathFile, '..'))
    }
}
