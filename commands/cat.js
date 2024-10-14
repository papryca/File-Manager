import {Command} from "./command.js";
import path from "path";
import fs from "fs/promises";
import {createReadStream} from "fs";

export class Cat extends Command {
    async validate(app, args) {
        if (args.getArgs().length !== 1) {
            throw new Error('Invalid argument count');
        }

        const fileName = args.getIndexArg(0);

        const filePath = path.join(app.getCurrentPath(), fileName);
        const stat  = await fs.stat(filePath)
        if (!stat.isFile()) {
            throw new Error('Cannot read directory');
        }
    }
    async execute(app, args) {
        const fileToReadPath= app.getCurrentPath();
        const fullPath = path.join(fileToReadPath, args.getIndexArg(0));
        const readStream = createReadStream(fullPath, 'utf-8');
        readStream.on('data', (chunk) => {
            process.stdout.write(chunk + '\n');
        });
    }
}
