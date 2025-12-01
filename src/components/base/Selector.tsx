import m, { ClassComponent, Vnode } from 'mithril';
import { mapLabels } from '../../data';
import { v4 as uuidv4 } from 'uuid';
import { ValueRef } from '../../data/ValueRef';

interface SelectorAttr {
    options: Record<string, string>,
    inline: boolean,
    value: ValueRef<string>,
    className: string,
    title:string
}

export class Selector implements ClassComponent<SelectorAttr> {
    private selectorId: string = uuidv4().slice(0, 8);
    view({ attrs }: Vnode<SelectorAttr>) {
        return (
            <div id={"selector_" + this.selectorId} className={attrs.className||""}>
                {attrs.title}
                {Object.entries(attrs.options).map(([id, name]) => (
                    <div className="form-check mb-2" key={id}>
                        <input
                            className="form-check-input"
                            type="radio"
                            name={`selector_${this.selectorId}`}
                            id={`option-${id}-${this.selectorId}`}
                            value={id}
                            checked={attrs.value.value == id}
                            onchange={() => { attrs.value.value = id; m.redraw() }}
                        />
                        <label className="form-check-label" for={`option-${id}-${this.selectorId}`}>
                            {name}
                        </label>
                    </div>
                ))}
            </div>
        );
    }
}