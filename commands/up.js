import {Command} from "./command.js";
import path from "path";
import os from "os";

export class Up extends Command {
    async execute(app, args) {
        const pathFile = app.getCurrentPath();
        app.setCurrentPath(path.resolve(pathFile, '..'))
    }
}
