import {Command} from "./command.js";
import path from "path";
import fs from "fs/promises";

export class Rn extends Command {
    async validate(app, args) {
        if (args.getArgs().length !== 2) {
            throw new Error('Invalid argument count');
        }
        const filePath = path.join(app.getCurrentPath(), args.getIndexArg(0));
        const newFilePath = path.join(app.getCurrentPath(), args.getIndexArg(1));

        const stat  = await fs.stat(filePath)
        if (!stat.isFile()) {
            throw new Error('Cannot read directory');
        }

        await fs.access(filePath);

        try {
            await fs.access(newFilePath);
        } catch (e) {
            return;
        }

        throw new Error('File already exists')
    }
    async execute(app, args) {
        const filePath = path.join(app.getCurrentPath(), args.getIndexArg(0));
        const newFilePath = path.join(app.getCurrentPath(), args.getIndexArg(1));

        await fs.rename(filePath, newFilePath);

    }
}
