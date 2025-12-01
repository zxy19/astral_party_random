import { Difficulty, Map } from "../types/game";
import { CharPlan } from "./CharPlan";
import { Packed } from "./Packed";

export class Plan {
    private map: Map;
    private difficulty: Difficulty;
    private groups: CharPlan[];

    constructor(map: Map, difficulty: Difficulty, groups: CharPlan[]) {
        this.map = map;
        this.difficulty = difficulty;
        this.groups = groups;
    }

    // 添加getter方法
    public getMap(): Map {
        return this.map;
    }

    public getDifficulty(): Difficulty {
        return this.difficulty;
    }

    public getGroups(): CharPlan[] {
        return this.groups;
    }

    public serialize() {
        const packed = new Packed();
        packed.add(this.map.toString());
        packed.add(this.difficulty.toString());
        packed.add(this.groups.length.toString());
        this.groups.forEach(group => group.serialize(packed));
        return packed.toString();
    }
    public static deserialize(_data: string): Plan {
        const data = new Packed(_data);
        const map = parseInt(data.pick());
        const difficulty = parseInt(data.pick());
        const len = parseInt(data.pick());
        const grps = [];
        for (let i = 0; i < len; i++) {
            grps.push(CharPlan.deserialize(data));
        }
        return new Plan(map, difficulty, grps);
    }
}