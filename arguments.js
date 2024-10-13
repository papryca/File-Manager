export class Arguments {
    constructor(data) {
        this.named = {};
        this.args = [];

        this.parse(data)
    }

    parse(data) {
        data.forEach((element) => {
            if (element.startsWith('--')) {
                const parsed = element.slice(2).split('=', 2);
                if (parsed.length === 2) {
                    this.named[parsed[0]] = parsed[1];
                } else {
                    this.named[parsed[0]] = true;
                }

            } else {
                this.args.push(element);
            }
        })
    }

    exists(name) {
        return name in this.named;
    }

    getNamed(name) {
        return this.named[name];
    }

    getArgs() {
        return this.args;
    }

    getIndexArg(index) {
        return this.args[index];
    }
}
