import path from 'path';
import {Command} from "./command.js";
import fs from "fs/promises";

export class List extends Command {
    async validate(app, args) {
        if (args.getArgs().length !== 0) {
            throw new Error('Invalid arguments for "ls" command. No arguments expected.');
        }
    }
    async execute(app, args) {
        const files = await fs.readdir(app.getCurrentPath());
        const data = [];

        for (const file of files) {
            const filePath = path.resolve(app.getCurrentPath(),file);
            const stats =  await fs.lstat(filePath);
            data.push({
                Name: file,
                Type: stats.isFile() ? 'File' : 'Directory'
            })
        }
        data.sort((a, b) => {
            if (a.Type === b.Type) {
                return a.Name.localeCompare(b.Name);
            }
            return a.Type === 'Directory' ? -1 : 1;
        });
        console.table(data);
    }
}
