import {Command} from "./command.js";
import path from "path";
import fs from "fs";

export class Cp extends Command {
    async validate(app, args) {
        if (args.getArgs().length !== 2) {
            throw new Error('Invalid argument count');
        }
        const filePath = path.join(app.getCurrentPath(), args.getIndexArg(0));
        const newFileDirectory = path.join(app.getCurrentPath(), args.getIndexArg(1));
        const targetFilePath = path.join(newFileDirectory,args.getIndexArg(0));

        const stat  = await fs.promises.stat(filePath)
        if (!stat.isFile()) {
            throw new Error('Cannot read directory');
        }

        await fs.promises.access(filePath);
        await fs.promises.access(newFileDirectory);

        try {
            await fs.promises.access(targetFilePath);
        } catch (e) {
            return;
        }

        throw new Error('File already exists')
    }
    async execute(app, args) {
        const filePath = path.join(app.getCurrentPath(), args.getIndexArg(0));
        const newFileDirectory = path.join(app.getCurrentPath(), args.getIndexArg(1));
        const targetFilePath = path.join(newFileDirectory, args.getIndexArg(0));

        const readStream = fs.createReadStream(filePath);
        const writeStream = fs.createWriteStream(targetFilePath);
        readStream.pipe(writeStream);

    }
}
