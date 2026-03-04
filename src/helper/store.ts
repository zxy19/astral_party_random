import { chars, Color, difficultyLabels, mapLabels, Tags } from "../data";
import { Plan } from "../data/Plan";
import { Difficulty, GenerateCharConfig, GenerateConfig, Map, Preset } from "../types/game";
import { checkPlanIsValid, generatePlan } from "./planGenerator";
import { getStoredGenerateConfig, getStoredGlobalSetting, getStoredGraphSetting, getStoredSavedConfigs, storeGenerateConfig, storeGlobalSetting, storeGraphSetting, storeSavedConfig } from "./settings";
import { Base64 } from "js-base64";
import m from 'mithril';
import { GenerateSettings, GraphSettings } from "../types/data";

export const GLOBAL: {
    currentPlan?: Plan,
    currentConfig: GenerateConfig,
    savedPresets: Preset[],
    graphSetting: GraphSettings,
    tries: number
} = <any>{
    tries: -1
}

export function initGlobals() {
    GLOBAL.currentConfig = getStoredGenerateConfig() || getDefaultConfig();
    GLOBAL.graphSetting = getStoredGraphSetting() || {
        showAvailable: false,
        showBanned: true,
        showDescription: true,
        showAvailableOrBannedByCount: false,
        large: false,
        slim: true
    };
    GLOBAL.savedPresets = getStoredSavedConfigs() || [];
    if (!GLOBAL.currentConfig.settings) {
        GLOBAL.currentConfig.settings = {
            calculateGlobalFilterOnceOnly: false,
            ensureAvailable: true
        }
    }
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
    storeSavedConfig(GLOBAL.savedPresets);
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
        groups: [],
        settings: {
            calculateGlobalFilterOnceOnly: false,
            ensureAvailable: true
        }
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


export function generatePlanFromGlobalConfigAndShow(tries: number = 0) {
    if (tries != 0 && GLOBAL.tries == -1) {
        return;
    }
    if (tries > 2000) {
        alert("当前配置无法找到可以进行游戏的配置（已尝试2000次）");
        m.route.set("/", {}, { replace: true });
        return;
    }
    GLOBAL.currentPlan = generatePlan(GLOBAL.currentConfig);
    if (GLOBAL.currentConfig.settings.ensureAvailable) {
        if (!checkPlanIsValid(GLOBAL.currentPlan)) {
            setTimeout(() => {
                generatePlanFromGlobalConfigAndShow((tries || 0) + 1);
            }, 1);
            GLOBAL.tries = tries;
            m.redraw();
            if (tries == 0) {
                m.route.set("/trying");
            }
            return;
        }
    }
    if (GLOBAL.currentPlan) {
        try {
            const serializedPlan = GLOBAL.currentPlan.serialize();
            const encodedPlan = Base64.encode(serializedPlan);
            m.route.set(`/result/${encodedPlan}`, {}, { replace: tries != 0 });
        } catch (e) {
            console.error("Failed to serialize and encode plan", e);
        }
    }
}

export function savePreset(config: Preset) {
    GLOBAL.savedPresets.push(config);
    saveGlobals();
}
export function removeSavedPreset(idx: number) {
    GLOBAL.savedPresets.splice(idx, 1);
    saveGlobals();
}