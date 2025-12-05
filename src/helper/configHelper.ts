import { chars, Color, colorData, difficultyLabels, mapLabels, Tags } from "../data";
import { FilterConfig, GenerateCharConfig, GenerateConfig } from "../types/game";

export function serializeGenerateConfig(config: GenerateConfig): Object {
    const toStore: any = {};
    toStore.map = saveObjSelect(config.map, <any>Object.keys(mapLabels));
    toStore.difficulty = saveObjSelect(config.difficulty, <any>Object.keys(difficultyLabels));
    toStore.groups = config.groups.map(group => storeCharConfig(group))
    toStore.globalConfig = storeCharConfig(config.globalConfig);
    return toStore;
}
export function deserializeGenerateConfig(stored: any): GenerateConfig {
    return {
        map: restoreObjSelect(stored.map, Object.keys(mapLabels)),
        difficulty: restoreObjSelect(stored.difficulty, Object.keys(difficultyLabels)),
        globalConfig: {
            charFilters: stored.globalConfig.charFilters.map((t: any) => recoverFilter(t, tt => chars.find(c => c.name === tt), chars)),
            tagFilters: stored.globalConfig.tagFilters.map((t: any) => recoverFilter(t, tt => tt, Object.keys(Tags))),
            colorFilter: recoverFilter(stored.globalConfig.colorFilter, tt => <Color>parseInt(tt), <any>Object.keys(colorData))
        },
        groups: stored.groups.map((g: any) => {
            return {
                charFilters: g.charFilters.map((t: any) => recoverFilter(t, tt => chars.find(c => c.name === tt), chars)),
                tagFilters: g.tagFilters.map((t: any) => recoverFilter(t, tt => tt, Object.keys(Tags))),
                colorFilter: recoverFilter(g.colorFilter, tt => <Color>parseInt(tt), <any>Object.keys(colorData))
            };
        })
    }
}
export function copyConfig(config: GenerateConfig) {
    return deserializeGenerateConfig(serializeGenerateConfig(config));
}
function storeCharConfig(group: GenerateCharConfig) {
    const toStoreGrp: any = {};
    toStoreGrp.tagFilters = group.tagFilters.map(t => storeFilter(t, tt => tt, Object.keys(Tags)));
    toStoreGrp.charFilters = group.charFilters.map(t => storeFilter(t, tt => tt.name, chars));
    toStoreGrp.colorFilter = storeFilter(group.colorFilter, tt => tt.valueOf() + "", <any>Object.keys(colorData));
    return toStoreGrp;
}

function storeFilter<T>(filter: FilterConfig<T>, nameConverter: (data: T) => string, fullCollection: T[]) {
    const ks: Record<string, boolean> = {};
    let fullSelect = true;
    filter.values.forEach(v => ks[nameConverter(v)] = true);
    fullCollection.forEach(v => {
        if (!ks[nameConverter(v)])
            fullSelect = false;
    }); 
    return {
        whitelist: filter.whitelist,
        values: fullSelect ? "<FULL_SELECT>" : filter.values.map(nameConverter),
        select: filter.select
    }
}
function recoverFilter<T>(stored: any, nameLookUp: (name: string) => T, fullCollection: T[]): FilterConfig<T> {
    return {
        whitelist: stored.whitelist,
        values: (stored.values === "<FULL_SELECT>" ? Object.assign([], fullCollection) : stored.values.map(nameLookUp)),
        select: stored.select
    }
}

function saveObjSelect<K extends string | number | symbol = string>(obj: Record<K, any>, reference: K[]): Record<K, any> | "<FULL_SELECT>" {
    for (let k of reference) {
        if (!obj[k])
            return obj;
    }
    return "<FULL_SELECT>";
}
function restoreObjSelect<K extends string | number | symbol = string>(obj: Record<K, any> | "<FULL_SELECT>", reference: K[]): Record<K, any> {
    if (obj === "<FULL_SELECT>") {
        const ret: Record<K, boolean> = <any>{};
        reference.forEach(k => ret[k] = true);
        return ret;
    }
    return obj;
}