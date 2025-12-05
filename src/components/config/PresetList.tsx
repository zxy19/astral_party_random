import m, { ClassComponent, Vnode } from 'mithril';
import { Character, Preset, Tag } from '../../types/game';
import { TagState } from '../../types/data';
import { Color, colorData, Tags, chars } from '../../data';
import { getCharConfig, GLOBAL, removeCharConfig, removePanel, removeSavedPreset, saveGlobals } from '../../helper/store';
import { ListedMultiSelector } from '../base/ListedMultiSelector';
import { FilterSelectorPanel } from '../filter/FilterSelector';
import { addPanel } from '../../helper/store';
import { CharStringify } from '../../helper/charHelper';
import { copyConfig } from '../../helper/configHelper';


export type PresetListAttr = {
    presets: Preset[]
    canDelete: boolean
};

export class PresetList implements ClassComponent<PresetListAttr> {
    view(vnode: m.Vnode<PresetListAttr, this>): m.Children | null | void {
        return <div class="preset-list d-flex">
            {this.makeList(vnode.attrs.presets, vnode.attrs.canDelete)}
        </div>
    }
    makeList(presets: Preset[], del: boolean) {
        return presets.map((preset, idx) => {
            return (
                <div class="btn-group me-2" role="group">
                    <button type="button" class="btn btn-secondary" onclick={() => this.loadPreset(preset)}>{preset.name}</button>
                    {del ?
                        <button type="button" class="btn btn-secondary" onclick={() => this.deletePreset(idx)} >X</button>
                        :
                        ""
                    }
                </div>)
        })
    }
    loadPreset(preset: Preset) {
        if (!confirm("确定要加载预设吗？这将覆盖已有的配置"))
            return;
        GLOBAL.currentConfig = copyConfig(preset.config);
        m.redraw();
        saveGlobals();
    }
    deletePreset(idx: number) {
        if (!confirm("确定要删除预设吗？"))
            return;
        removeSavedPreset(idx);
    }
}