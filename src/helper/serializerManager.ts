import { Color, colorData } from "../data";
import { CharPlan } from "../data/CharPlan";
import { Filter } from "../data/Filter";
import { Packed } from "../data/Packed";
import { Plan } from "../data/Plan";
import { Character, RandomizedFilterConfig } from "../types/game";
import { getCharById, getCharByName, getCharId } from "./charHelper";

export interface Serializer<T> {
    id: string;
    serialize(value: T, pack: Packed): void;
    deserialize(pack: Packed): T;
    describe(value: T): string;
}

export const FILTER_SERIALIZER_TAG: Serializer<Filter<string>> = {
    id: "tags",
    serialize(value, pack) {
        pack.add(value.getConfig().whitelist ? "1" : "0");
        pack.add(value.getConfig().picked.length.toString());
        value.getConfig().picked.forEach(t => pack.add(t));
    },
    deserialize(pack) {
        const whitelist = pack.pick() == "1";
        const count = parseInt(pack.pick());
        const value: RandomizedFilterConfig<string> = { whitelist, picked: [] };
        for (let i = 0; i < count; i++) {
            value.picked.push(pack.pick());
        }
        return new Filter(value, (char) => char.related, FILTER_SERIALIZER_TAG);
    },
    describe(value: Filter<string>): string {
        if (value.getConfig().picked.length == 0)
            return "";
        let p = value.getConfig().picked;
        let append = "";
        if (p.length > 8) {
            append = " 等 共" + (p.length) + "个标签";
            p = p.slice(0, 8);
        }
        return (value.getConfig().whitelist ? "要求" : "禁止") + "标签: " + p.join(",") + append;
    }
}
export const FILTER_SERIALIZER_COLOR: Serializer<Filter<Color>> = {
    id: "color",
    serialize(value, pack) {
        pack.add(value.getConfig().whitelist ? "1" : "0")
        pack.add(value.getConfig().picked.length.toString())
        value.getConfig().picked.forEach(t => pack.add(t.toString()))
    },
    deserialize(pack) {
        const white = pack.pick() == "1"
        const valueCount = parseInt(pack.pick())
        const value: RandomizedFilterConfig<Color> = { picked: [], whitelist: white }
        for (let i = 0; i < valueCount; i++) {
            value.picked.push(<Color>parseInt(pack.pick()))
        }
        return new Filter<Color>(value, t => t.color, FILTER_SERIALIZER_COLOR)
    },
    describe(value: Filter<Color>): string {
        if (value.getConfig().picked.length == 0)
            return "";
        return (value.getConfig().whitelist ? "要求" : "禁止") + "颜色: " + value
            .getConfig()
            .picked
            .map(t => colorData[t].name).join(",");
    }
}
export const FILTER_SERIALIZER_CHARS: Serializer<Filter<Character>> = {
    id: "chars",
    serialize(value, pack) {
        pack.add(value.getConfig().whitelist ? "1" : "0")
        pack.add(value.getConfig().picked.length.toString());
        value.getConfig().picked.forEach(t => pack.add(getCharId(t.name).toString()))
    },
    deserialize(pack) {
        const whitelist = pack.pick() == "1";
        const count = parseInt(pack.pick());
        const value: RandomizedFilterConfig<Character> = { whitelist, picked: [] }
        for (let i = 0; i < count; i++) {
            value.picked.push(getCharById(parseInt(pack.pick())))
        }
        return new Filter(value, (char) => char, FILTER_SERIALIZER_CHARS)
    },
    describe(value: Filter<Character>): string {
        if (value.getConfig().picked.length == 0)
            return "";
        let p = value.getConfig().picked;
        let append = "";
        if (p.length > 4) {
            append = " 等 共" + (p.length) + "个角色";
            p = p.slice(0, 4);
        }
        let charStr = p.map(t => t.name).join(",") + append;
        return (value.getConfig().whitelist ? "要求" : "禁止") + "角色: " + charStr;
    }
}



const serializers: Record<string, Serializer<any>> = {};

serializers[FILTER_SERIALIZER_CHARS.id] = FILTER_SERIALIZER_CHARS;
serializers[FILTER_SERIALIZER_TAG.id] = FILTER_SERIALIZER_TAG;
serializers[FILTER_SERIALIZER_COLOR.id] = FILTER_SERIALIZER_COLOR;


export function autoDeserialize(pack: Packed) {
    const id = pack.pick();
    return serializers[id].deserialize(pack);
}