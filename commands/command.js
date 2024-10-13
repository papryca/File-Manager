export class Command {
    constructor() {}

    async validate(app, args){}

    async execute(app, args){
        throw new Error(`Implement [${this.constructor.named}] command!`);
    }
}
