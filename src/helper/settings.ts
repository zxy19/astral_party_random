import { chars, Color } from "../data";
import { CharPlan } from "../data/CharPlan";
import { Filter } from "../data/Filter";
import { Plan } from "../data/Plan";
import { GraphSettings } from "../types/data";
import { FilterConfig, GenerateCharConfig, GenerateConfig, Preset } from "../types/game";
import { deserializeGenerateConfig, serializeGenerateConfig } from "./configHelper";
import { GLOBAL } from "./store";

export function storeGenerateConfig(config: GenerateConfig) {
    localStorage.setItem("generateConfig", JSON.stringify(serializeGenerateConfig(config)));
}

export function getStoredGenerateConfig(): GenerateConfig | null {
    const storedTxt = localStorage.getItem("generateConfig");
    if (!storedTxt) return null;
    const stored = <any>JSON.parse(storedTxt);
    return deserializeGenerateConfig(stored);
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

export function storeSavedConfig(configs: Preset[]) {
    localStorage.setItem("savedConfigs", JSON.stringify(
        configs.map(c => ({
            name: c.name,
            config: serializeGenerateConfig(c.config)
        }))
    ));
}
export function getStoredSavedConfigs(): Preset[] {
    const d = localStorage.getItem("savedConfigs");
    if (!d) return [];
    return JSON.parse(d).map((d: any) => ({
        name: d.name,
        config: deserializeGenerateConfig(d.config)
    }));
}

export function clearAllStoredData() {
    localStorage.removeItem("plan");
    localStorage.removeItem("generateConfig");
    location.reload();
}