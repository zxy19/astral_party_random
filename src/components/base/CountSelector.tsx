import m, { ClassComponent, Vnode } from 'mithril';
import { mapLabels } from '../../data';
import { v4 as uuidv4 } from 'uuid';
import { ValueRef } from '../../data/ValueRef';

interface SelectorAttr {
    min: number,
    max: number,
    value: ValueRef<string>,
    className: string,
    title: string
}

export class CountSelector implements ClassComponent<SelectorAttr> {
    private selectorId: string = uuidv4().slice(0, 8);
    view({ attrs }: Vnode<SelectorAttr>) {
        return (
            <div id={"selector_" + this.selectorId} className={"row " + (attrs.className || "")}>
                <div className='col-lg-2 col-md-4 col-sm-6'>
                    <label for={this.selectorId} class="form-label">{attrs.title}</label>
                </div>
                <div className='col-lg-10 col-md-8 col-sm-6'>
                    <input type="number" class="form-control" min={attrs.min} max={attrs.max} id={this.selectorId} value={attrs.value.value} onchange={this.makeChangeCB(attrs)} oninput={this.makeChangeCB(attrs)} />
                </div>
            </div>
        );
    }
    makeChangeCB(attrs: SelectorAttr) {
        return (e: InputEvent) => {
            attrs.value.value = (e.currentTarget! as HTMLInputElement)!.value;
            m.redraw()
        }
    }
}