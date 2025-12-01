export class Packed {
    data: string[]
    idx: number
    constructor(data?: string) {
        this.data = data ? data.split("|") : [];
        this.idx = 0;
    }
    add(value: string) {
        this.data.push(value);
    }
    to(idx: number) {
        this.idx = idx;
    }
    pick() {
        return this.data[this.idx++];
    }
    toString(){
        return this.data.join("|");
    }
}