import { CharPlan } from "../data/CharPlan";
import { FilterConfig, GenerateCharConfig, GenerateConfig, RandomizedFilterConfig } from "../types/game";
import { Filter } from "../data/Filter";
import { difficultyLabels, mapLabels } from "../data";
import { Plan } from "../data/Plan";
import { FILTER_SERIALIZER_CHARS, FILTER_SERIALIZER_COLOR, FILTER_SERIALIZER_TAG } from "./serializerManager";

export function generatePlan(config: GenerateConfig): Plan {
    const isSingle = config.groups.length == 0;
    const groups = (!isSingle) ? config.groups : [config.globalConfig];
    return new Plan(
        randomFromListWithFilter(<any[]>Object.keys(mapLabels), config.map),
        randomFromListWithFilter(<any[]>Object.keys(difficultyLabels), config.difficulty),
        groups.map(group => {
            return generateGroupPlan(group, config.globalConfig, isSingle);
        })
    );
}
function generateGroupPlan(group: GenerateCharConfig, globalConfig: GenerateCharConfig, isSingle: boolean): CharPlan {
    const filters: Filter<any>[] = [];
    addAllFiltersFor(group, filters);
    if (!isSingle)
        addAllFiltersFor(globalConfig, filters);
    return new CharPlan(filters);
}
function addAllFiltersFor(group: GenerateCharConfig, filters: Filter<any>[]) {
    filters.push(new Filter(randomize(group.colorFilter), char => char.color, FILTER_SERIALIZER_COLOR));
    for (const tagFilter of group.tagFilters) {
        filters.push(new Filter(randomize(tagFilter), char => char.related, FILTER_SERIALIZER_TAG));
    }
    for (const charFilter of group.charFilters) {
        filters.push(new Filter(randomize(charFilter), char => char, FILTER_SERIALIZER_CHARS));
    }
}

function randomize<T>(group: FilterConfig<T>): RandomizedFilterConfig<T> {
    if (group.select > 0) {
        return {
            whitelist: group.whitelist,
            picked: randomFromList(group.values, group.select)
        }
    } else {
        return {
            whitelist: false,
            picked: []
        }
    }
}

function randomFromList<T>(list: T[], count: number): T[] {
    return list.sort(() => Math.random() - 0.5).slice(0, count);
}
function randomFromListWithFilter<T extends keyof any>(list: T[], filter: Record<T, boolean>) {
    return list.filter(item => filter[item]).sort(() => Math.random() - 0.5)[0];
}