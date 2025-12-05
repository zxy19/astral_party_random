import { Color, difficultyLabels, mapLabels, Tags } from "../data";
import { CharPlan } from "../data/CharPlan";
import { _Character } from "./data";

export type Character = _Character<Color, typeof Tags>;
export type Tag = keyof typeof Tags;
export type Map = keyof typeof mapLabels;
export type Difficulty = keyof typeof difficultyLabels;

export type GenerateConfig = {
    map: Record<keyof typeof mapLabels, boolean>;
    difficulty: Record<keyof typeof difficultyLabels, boolean>;
    globalConfig: GenerateCharConfig,
    groups: GenerateCharConfig[];
}
export type GenerateCharConfig = {
    tagFilters: FilterConfig<Tag>[]
    charFilters: FilterConfig<Character>[]
    colorFilter: FilterConfig<Color>
}

export interface FilterConfig<T> {
    whitelist: boolean
    values: T[]
    select: number
}
export interface RandomizedFilterConfig<T> {
    whitelist: boolean
    picked: T[]
}
export type Preset = {
    name: string;
    config: GenerateConfig;
}