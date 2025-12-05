import { chars, Color } from "../data";
import { FilterConfig, GenerateCharConfig, GenerateConfig } from "../types/game";

export function serializeGenerateConfig(config: GenerateConfig): Object {
    const toStore: any = {};
    toStore.map = config.map;
    toStore.difficulty = config.difficulty;
    toStore.groups = config.groups.map(group => storeCharConfig(group))
    toStore.globalConfig = storeCharConfig(config.globalConfig);
    return toStore;
}
export function deserializeGenerateConfig(stored: any): GenerateConfig {
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
export function copyConfig(config: GenerateConfig) { 
    return deserializeGenerateConfig(serializeGenerateConfig(config));
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

