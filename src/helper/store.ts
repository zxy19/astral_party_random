import { chars, Color, difficultyLabels, mapLabels, Tags } from "../data";
import { Plan } from "../data/Plan";
import { Difficulty, GenerateCharConfig, GenerateConfig, Map } from "../types/game";
import { generatePlan } from "./planGenerator";
import { getStoredGenerateConfig, getStoredGraphSetting, getStoredPlan, storeGenerateConfig, storeGraphSetting, storePlan } from "./settings";
import { v4 as uuidv4 } from "uuid"
import { Base64 } from "js-base64";
import m from 'mithril';
import { GraphSettings } from "../types/data";

export const GLOBAL: {
    currentPlan?: Plan,
    currentConfig: GenerateConfig,
    graphSetting: GraphSettings
} = <any>{}

export function initGlobals() {
    GLOBAL.currentConfig = getStoredGenerateConfig() || getDefaultConfig();
    GLOBAL.graphSetting = getStoredGraphSetting() || {
        showAvailable: false,
        showBanned: true,
        showDescription: true,
        large: false,
        slim: true
    };
}
export function loadPlan() {
    const planParam = m.route.param('plan');

    if (planParam) {
        try {
            const decodedPlan = Base64.decode(planParam);
            GLOBAL.currentPlan = Plan.deserialize(decodedPlan);
        } catch (e) {
            console.error("Failed to parse plan from route parameter", e);
        }
    }

}
export function saveGlobals() {
    storeGenerateConfig(GLOBAL.currentConfig);
    storeGraphSetting(GLOBAL.graphSetting);
}

function getDefaultConfig(): GenerateConfig {
    const map: Record<Map, boolean> = {};
    Object.keys(mapLabels).forEach((t: any) => map[t] = true);
    const difficulty: Record<Difficulty, boolean> = {};
    Object.keys(difficultyLabels).forEach((t: any) => difficulty[t] = false);
    difficulty[4] = true;
    return {
        map,
        difficulty,
        globalConfig: getNewGenerateCharConfig(2),
        groups: []
    }
}
function getNewGenerateCharConfig(dColor = 0): GenerateCharConfig {
    return {
        tagFilters: [],
        charFilters: [],
        colorFilter: {
            whitelist: false,
            values: [Color.BLACK, Color.BLUE, Color.GREEN, Color.RED, Color.WHITE, Color.YELLOW],
            select: dColor
        }
    }
}
export function addCharConfig() {
    GLOBAL.currentConfig.groups.push(getNewGenerateCharConfig());
    saveGlobals();
}
export function removeCharConfig(idx: number) {
    if (idx == -1) return;
    GLOBAL.currentConfig.groups.splice(idx, 1);
    saveGlobals();
}
export function getCharConfig(idx: number) {
    return idx == -1 ? GLOBAL.currentConfig.globalConfig : GLOBAL.currentConfig.groups[idx];
}

export function addPanel(idx: number, type: "tag" | "char") {
    const group = getCharConfig(idx);
    const v = type == "tag" ? group.tagFilters : group.charFilters;
    const defVal = type == "tag" ? Object.keys(Tags) : Object.assign([], chars)
    v.push({
        whitelist: false,
        values: defVal as any,
        select: 0
    });
    saveGlobals();
    m.redraw()
}
export function removePanel(idx: number, type: "tag" | "char", panelIdx: number) {
    const group = getCharConfig(idx);
    const v = type == "tag" ? group.tagFilters : group.charFilters;
    v.splice(panelIdx, 1);
    saveGlobals();
    m.redraw()
}


export function generatePlanFromGlobalConfigAndShow() {
    GLOBAL.currentPlan = generatePlan(GLOBAL.currentConfig);
    if (GLOBAL.currentPlan) {
        try {
            const serializedPlan = GLOBAL.currentPlan.serialize();
            const encodedPlan = Base64.encode(serializedPlan);
            m.route.set(`/result/${encodedPlan}`);
        } catch (e) {
            console.error("Failed to serialize and encode plan", e);
        }
    }
}