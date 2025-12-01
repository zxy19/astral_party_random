import m, { ClassComponent, Vnode } from 'mithril';
import { FilterConfig } from '../../types/game';
import { Card } from '../base/Card';
import { CountSelector } from '../base/CountSelector';
import { ValueRef } from '../../data/ValueRef';
import { ListedMultiSelector } from '../base/ListedMultiSelector';
import { Emitter } from '../../data/Emitter';
import { saveGlobals } from '../../helper/store';


export type FilterSelectorPanelAttrs<T> = {
    title: string,
    options: Record<string, string>,
    filter: FilterConfig<T>,
    ondelete?: ()=> void
    valueConverter: (s: string) => T
};

export class FilterSelectorPanel<T> implements ClassComponent<FilterSelectorPanelAttrs<T>> {
    reverse: Emitter = new Emitter();
    view(vnode: m.Vnode<FilterSelectorPanelAttrs<T>, this>): m.Children | null | void {
        const { options, filter, title, valueConverter, ondelete = null } = vnode.attrs;
        return (<Card title={title}>
            <CountSelector min={0} max={Object.keys(options).length} value={new ValueRef(() => filter.select, t => filter.select = t)} title="数量" onchange={saveGlobals}/>
            <hr />
            <div class="d-flex justify-content-between align-items-center mb-2">
                <div>
                    <span class={"badge bg-" + (filter.whitelist ? "success" : "danger")}>{filter.whitelist ? '白名单模式(要求)' : '黑名单模式(禁用)'}</span>

                    <button class="btn btn-sm btn-outline-secondary me-1 ms-2" onclick={() => { filter.whitelist = !filter.whitelist; m.redraw(); }}>
                        切换模式
                    </button>
                </div>
                {
                    ondelete ?
                        (<button class="btn btn-sm btn-outline-danger" onclick={() => ondelete!()}>删除</button>)
                        : ""
                }
                <button class="btn btn-sm btn-outline-secondary" onclick={() => this.reverse.emit()}>
                    反选
                </button>
            </div>
            <ListedMultiSelector options={options} value={filter.values} inline={true} valueConverter={valueConverter} reverseEmitter={this.reverse} onchange={saveGlobals}/>
        </Card>)
    }

}