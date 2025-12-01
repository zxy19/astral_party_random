import { chars, Color } from "../data";
import { CharPlan } from "../data/CharPlan";
import { Filter } from "../data/Filter";
import { Plan } from "../data/Plan";
import { GraphSettings } from "../types/data";
import { FilterConfig, GenerateCharConfig, GenerateConfig } from "../types/game";
import { GLOBAL } from "./store";

export function storeGenerateConfig(config: GenerateConfig) {
    const toStore: any = {};
    toStore.map = config.map;
    toStore.difficulty = config.difficulty;
    toStore.groups = config.groups.map(group => storeCharConfig(group))
    toStore.globalConfig = storeCharConfig(config.globalConfig);
    localStorage.setItem("generateConfig", JSON.stringify(toStore));
}

export function getStoredGenerateConfig(): GenerateConfig | null {
    const storedTxt = localStorage.getItem("generateConfig");
    if (!storedTxt) return null;
    const stored = <any>JSON.parse(storedTxt);
    return {
        map: stored.map,
        difficulty: stored.difficulty,
        globalConfig: {
            charFilters: stored.globalConfig.charFilters.map((t: any) => recoverFilter(t, tt => chars.find(c => c.name === tt))),
            tagFilters: stored.globalConfig.tagFilters.map((t: any) => recoverFilter(t, tt => tt)),
            colorFilter: recoverFilter(stored.globalConfig.colorFilter, tt => <Color>parseInt(tt))
        },
        groups: stored.groups.map((g: any) => {
            return {
                charFilters: g.charFilters.map((t: any) => recoverFilter(t, tt => chars.find(c => c.name === tt))),
                tagFilters: g.tagFilters.map((t: any) => recoverFilter(t, tt => tt)),
                colorFilter: recoverFilter(g.colorFilter, tt => <Color>parseInt(tt))
            };
        })
    }
}
function storeCharConfig(group: GenerateCharConfig) {
    const toStoreGrp: any = {};
    toStoreGrp.tagFilters = group.tagFilters.map(t => storeFilter(t, tt => tt));
    toStoreGrp.charFilters = group.charFilters.map(t => storeFilter(t, tt => tt.name));
    toStoreGrp.colorFilter = storeFilter(group.colorFilter, tt => tt.valueOf() + "");
    return toStoreGrp;
}

function storeFilter<T>(filter: FilterConfig<T>, nameConverter: (data: T) => string) {
    return {
        whitelist: filter.whitelist,
        values: filter.values.map(nameConverter),
        select: filter.select
    }
}
function recoverFilter<T>(stored: any, nameLookUp: (name: string) => T): FilterConfig<T> {
    return {
        whitelist: stored.whitelist,
        values: stored.values.map(nameLookUp),
        select: stored.select
    }
}


export function storePlan(plan: Plan) {
    localStorage.setItem("plan", plan.serialize());
}
export function getStoredPlan(): Plan | null {
    const d = localStorage.getItem("plan");
    if (!d) return null;
    return Plan.deserialize(d);
}

export function storeGraphSetting(setting: GraphSettings) {
    localStorage.setItem("graph", JSON.stringify(setting));
}
export function getStoredGraphSetting(): GraphSettings | null {
    const d = localStorage.getItem("graph");
    if (!d) return null;
    return JSON.parse(d);
}

export function clearAllStoredData(){
    localStorage.removeItem("plan");
    localStorage.removeItem("generateConfig");
    location.reload();
}