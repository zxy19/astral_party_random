
import { Filter } from "./Filter";
import { Character } from "../types/game";
import { autoDeserialize } from "../helper/serializerManager";
import { Packed } from "./Packed";

export class CharPlan {
    private filters: Filter<any>[];
    constructor(filters: Filter<any>[]) {
        this.filters = filters;
    }

    public isCharacterBanned(character: Character): boolean {
        return this.filters.some(filter => !filter.isCharValid(character));
    }
    public isCharacterAllowed(character: Character): boolean {
        return !this.isCharacterBanned(character);
    }

    public serialize(packed: Packed) {
        packed.add(this.filters.length.toString());
        this.filters.forEach(filter => filter.serialize(packed));
    }
    public static deserialize(packed: Packed): CharPlan {
        const filters = [];
        const len = parseInt(packed.pick());
        for (let i = 0; i < len; i++) {
            filters.push(autoDeserialize(packed));
        }
        return new CharPlan(filters);
    }
    public describe(): string[] {
        return this.filters.map(filter => filter.describe()).filter(s => s != "");
    }
}