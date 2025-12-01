import { Serializer } from "../helper/serializerManager";
import { Character, FilterConfig, RandomizedFilterConfig } from "../types/game";
import { Packed } from "./Packed";

export class Filter<T> {
    private config: RandomizedFilterConfig<T>;
    private valueGetter: (char: Character) => T | T[];
    private serializer: Serializer<Filter<T>>;
    constructor(config: RandomizedFilterConfig<T>, valueGetter: (char: Character) => T | T[], serializer: Serializer<Filter<T>>) {
        this.config = config;
        this.valueGetter = valueGetter;
        this.serializer = serializer;
    }
    isValid(value: T): boolean {
        return this.config.whitelist ? this.config.picked.includes(value) : !this.config.picked.includes(value);
    }
    isCharValid(char: Character) {
        let value: T[] | T = this.valueGetter(char);
        if (!Array.isArray(value)) {
            value = [value];
        }
        if (this.config.whitelist) {
            return value.some(v => this.isValid(v));
        } else {
            return value.every(v => this.isValid(v));
        }
    }
    getConfig(): RandomizedFilterConfig<T> {
        return this.config;
    }
    serialize(packed: Packed) {
        packed.add(this.serializer.id);
        this.serializer.serialize(this, packed);
    }
    describe(): string {
        return this.serializer.describe(this);
    }
}