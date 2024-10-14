import {Command} from "./command.js";
import path from "path";
import fs from "fs/promises";
import {createHash} from "crypto";
import {createReadStream} from "fs";

export class Hash extends Command {
    async validate(app, args) {
        if (args.getArgs().length !== 1) {
            throw new Error('Invalid argument count');
        }
        const filePath = path.resolve(app.getCurrentPath(), args.getIndexArg(0));

        const stat  = await fs.stat(filePath)
        if (!stat.isFile()) {
            throw new Error('Cannot count hash for directory');
        }

        await fs.access(filePath);

    }
    async execute(app, args) {
        const filePath = path.resolve(app.getCurrentPath(), args.getIndexArg(0));
        const hashSum = createHash('SHA256');
        const readStream = createReadStream(filePath);
        readStream.on('data', (chunk) => {
            hashSum.update(chunk);
        });
        readStream.on('end', () => {
            console.log(hashSum.digest('hex'));
        });

    }
}
