import {Command} from "./command.js";
import path from "path";
import fs from "fs";

export class Rm extends Command {
    async validate(app, args) {
        if (args.getArgs().length !== 1) {
            throw new Error('Invalid argument count');
        }
        const filePath = path.join(app.getCurrentPath(), args.getIndexArg(0));

        const stat = await fs.promises.stat(filePath)
        if (!stat.isFile()) {
            throw new Error('Cannot delete directory');
        }

        await fs.promises.access(filePath);
    }

    async execute(app, args) {
        const filePath = path.join(app.getCurrentPath(), args.getIndexArg(0));
        await fs.promises.unlink(filePath);
    }

}
