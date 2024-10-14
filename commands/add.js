import {Command} from "./command.js";
import path from "path";
import fs from "fs/promises";

export class Add extends Command {
    async validate(app, args) {
        if (args.getArgs().length !== 1) {
            throw new Error('Invalid argument count');
        }
        const filePath = path.resolve(app.getCurrentPath(), args.getIndexArg(0));
        try {
            await fs.access(filePath);
        } catch (e){
            return;
        }
        throw new Error('File already exists')
    }
    async execute(app, args) {
        const filePath = path.resolve(app.getCurrentPath(), args.getIndexArg(0));
        const fileContent = '';
        await fs.writeFile(filePath, fileContent, 'utf8');

    }
}
