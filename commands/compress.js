import {Command} from "./command.js";
import path from "path";
import fs from "fs/promises";
import {createHash} from "crypto";
import {createReadStream, createWriteStream} from "fs";
import { createBrotliCompress } from 'zlib';

export class Compress extends Command {
    async validate(app, args) {
        if (args.getArgs().length !== 2) {
            throw new Error('Invalid argument count');
        }
        const filePath = path.join(app.getCurrentPath(), args.getIndexArg(0));

        const stat  = await fs.stat(filePath)
        if (!stat.isFile()) {
            throw new Error('Cannot count hash for directory');
        }

        await fs.access(filePath);

    }
    async execute(app, args) {
        const fileToCompressPath = path.join(app.getCurrentPath(), args.getIndexArg(0));
        const outputFile = path.join(app.getCurrentPath(), args.getIndexArg(1));

        const readStream = createReadStream(fileToCompressPath);
        const writeStream = createWriteStream(outputFile);
        const brotliStream = createBrotliCompress();
        readStream.pipe(brotliStream).pipe(writeStream);

    }
}
