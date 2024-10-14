import {Command} from "./command.js";
import path from "path";
import fs from "fs/promises";
import {createReadStream, createWriteStream} from "fs";
import {createBrotliDecompress} from "zlib";

export class Decompress extends Command {
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
        const fileDecompressPath = path.join(app.getCurrentPath(), args.getIndexArg(0));
        const outputFile = path.join(app.getCurrentPath(), args.getIndexArg(1));

        const readStream = createReadStream(fileDecompressPath);
        const writeStream = createWriteStream(outputFile);
        const brotliStream = createBrotliDecompress();
        readStream.pipe(brotliStream).pipe(writeStream).on('finish', () => {
            console.log(`File decompressed successfully to ${outputFile}`);
        });


    }
}
