import { chars } from "../data";
import { Stringify } from "../types/data";
import { Character } from "../types/game";

const name2char: Record<string, Character> = {};
const name2name: Record<string, string> = {};
const name2id: Record<string, number> = {};
{
    chars.forEach(t => name2char[t.name] = t);
    chars.forEach(t => name2name[t.name] = t.name);
    chars.forEach((t, i) => name2id[t.name] = i);
}

export function getCharByName(name: string): Character {
    return name2char[name];
}

export function getCharOpt() {
    return name2name;
}

export function getCharId(name: string) {
    return name2id[name];
}

export function getCharName(id: number) {
    return chars[id].name;
}

export function getCharById(id: number) {
    return chars[id];
}

export const CharStringify: Stringify<Character> = {
    deserialize(s) {
        return getCharByName(s)
    },
    serialize(c) {
        return c.name;
    }
}