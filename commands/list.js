import path from 'path';
import {Command} from "./command.js";
import fs from "fs/promises";

export class List extends Command {

    async execute(app, args) {
        const files = await fs.readdir(app.getCurrentPath());
        const data = [];
        for (const file of files) {
            const filePath = path.join(app.getCurrentPath(),file);
            const stats =  await fs.lstat(filePath);
            data.push({
                Name: file,
                Type: stats.isFile() ? 'File' : 'Directory'
            })
        }
        console.table(data);
    }
}
