import {Command} from "./command.js";
import fs from "fs/promises";
import * as path from "path";

export class ChangeDirectory extends Command {

    async validate(app, args) {
        if (args.getArgs().length !== 1) {
            throw new Error('Invalid argument count');
        }

        const dirName = args.getIndexArg(0);

        const filePath = path.join(app.getCurrentPath(), dirName);
        const stat  = await fs.stat(filePath)
        if (!stat.isDirectory()) {
            throw new Error('Cannot change directory to file');
        }
    }

    async execute(app, args) {
        const dirName = args.getIndexArg(0);
        app.setCurrentPath(path.join(app.getCurrentPath(), dirName))
    }
}
