import { chars, Color, defaultPresets } from "./data";
import m from "mithril";
import { deserializeGenerateConfig } from "./helper/configHelper";

export function loadDefaultPresets() {
    const p = [

        {
            name: "禁2色",
            config: deserializeGenerateConfig({ "map": "<FULL_SELECT>", "difficulty": "<FULL_SELECT>", "groups": [], "globalConfig": { "tagFilters": [], "charFilters": [], "colorFilter": { "whitelist": false, "values": "<FULL_SELECT>", "select": 2 } } })
        },
        {
            name: "辅助输出分组",
            config: deserializeGenerateConfig({ "map":"<FULL_SELECT>", "difficulty": "<FULL_SELECT>", "groups": [{ "tagFilters": [{ "whitelist": true, "values": ["魔法", "物理"], "select": "2" }], "charFilters": [], "colorFilter": { "whitelist": false, "values": "<FULL_SELECT>", "select": 0 } }, { "tagFilters": [{ "whitelist": true, "values": ["辅助"], "select": "1" }], "charFilters": [], "colorFilter": { "whitelist": false, "values": "<FULL_SELECT>", "select": 0 } }], "globalConfig": { "tagFilters": [], "charFilters": [], "colorFilter": { "whitelist": false, "values": ["5", "4", "0", "2", "1", "3"], "select": "2" } } })
        },
        {
            name: "随机4人",
            config: deserializeGenerateConfig({ "map":"<FULL_SELECT>", "difficulty": "<FULL_SELECT>", "groups": [{ "tagFilters": [], "charFilters": [], "colorFilter": { "whitelist": false, "values": [], "select": 0 } }, { "tagFilters": [], "charFilters": [], "colorFilter": { "whitelist": false, "values": [], "select": 0 } }, { "tagFilters": [], "charFilters": [], "colorFilter": { "whitelist": false, "values": [], "select": 0 } }, { "tagFilters": [], "charFilters": [], "colorFilter": { "whitelist": false, "values": [], "select": 0 } }], "globalConfig": { "tagFilters": [], "charFilters": [{ "whitelist": true, "values": "<FULL_SELECT>", "select": "1" }], "colorFilter": { "whitelist": false, "values": [], "select": "0" } } })
        }
    ];

    p.forEach(p => defaultPresets.push(p));
}
