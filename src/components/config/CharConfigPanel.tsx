import m, { ClassComponent, Vnode } from 'mithril';
import { Character, Tag } from '../../types/game';
import { TagState } from '../../types/data';
import { Color, colorData, Tags, chars } from '../../data';
import { getCharConfig, GLOBAL, removeCharConfig, removePanel } from '../../helper/store';
import { ListedMultiSelector } from '../base/ListedMultiSelector';
import { FilterSelectorPanel } from '../filter/FilterSelector';
import { addPanel } from '../../helper/store';
import { CharStringify } from '../../helper/charHelper';


export type CharConfigPanelAttrs = {
    idx: number
};

export class CharConfigPanel implements ClassComponent<CharConfigPanelAttrs> {
    static COLOR_OPT: Record<Color, string>;
    static TAG_OPT: Record<string, string>;
    static CHAR_OPT: Record<string, string>;

    static {
        CharConfigPanel.COLOR_OPT = {} as any;
        Object.keys(colorData)
            .map(c => c as unknown as Color)
            .forEach(c => CharConfigPanel.COLOR_OPT[c] = colorData[c].name)

        CharConfigPanel.TAG_OPT = {} as any;
        Object.keys(Tags).forEach(t => CharConfigPanel.TAG_OPT[t] = t);

        CharConfigPanel.CHAR_OPT = {} as any;
        chars.forEach(c => CharConfigPanel.CHAR_OPT[c.name] = c.name);
    }

    view(vnode: m.Vnode<CharConfigPanelAttrs, this>): m.Children | null | void {
        const attrs = vnode.attrs;
        const config = getCharConfig(attrs.idx);
        const elems = [];
        elems.push(
            <FilterSelectorPanel options={CharConfigPanel.COLOR_OPT} filter={config.colorFilter} title="禁用颜色" />
        )

        // 添加标签筛选器面板
        config.tagFilters.forEach((filter, index) => {
            elems.push(
                <FilterSelectorPanel options={CharConfigPanel.TAG_OPT} filter={filter} title={`标签筛选 ${index + 1}`} ondelete={() => removePanel(attrs.idx, "tag", index)} />
            )
        })

        // 添加角色筛选器面板
        config.charFilters.forEach((filter, index) => {
            elems.push(
                <FilterSelectorPanel options={CharConfigPanel.CHAR_OPT} filter={filter} title={`角色筛选 ${index + 1}`} valueConverter={CharStringify}  ondelete={() => removePanel(attrs.idx, "char", index)} />
            )
        })

        // 添加底部按钮行
        elems.push(
            <div class="d-flex gap-2 mt-3">
                <button class="btn btn-sm btn-outline-primary" onclick={() => addPanel(attrs.idx, "tag")}>
                    添加标签筛选
                </button>
                <button class="btn btn-sm btn-outline-success" onclick={() => addPanel(attrs.idx, "char")}>
                    添加角色筛选
                </button>
                {attrs.idx !== -1 && (
                    <button class="btn btn-sm btn-outline-danger" onclick={() => {
                        removeCharConfig(attrs.idx);
                        m.redraw();
                    }}>
                        删除组
                    </button>
                )}
            </div>
        )

        return elems;
    }
}