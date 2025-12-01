import m, { ClassComponent, Vnode } from 'mithril';
import { mapLabels } from '../../data';
import { v4 as uuidv4 } from 'uuid';
import { ValueRef } from '../../data/ValueRef';
import { Emitter } from '../../data/Emitter';

interface SelectorAttr {
    options: Record<string, string>,
    inline: boolean,
    value: Record<string, boolean>,
    className: string,
    onchange: (v: Record<string, boolean>) => void,
    reverseEmitter?: Emitter
}

export class MultiSelector implements ClassComponent<SelectorAttr> {
    private selectorId: string = uuidv4().slice(0, 8);
    oninit(vnode: m.Vnode<SelectorAttr, this>) {
        vnode.attrs.reverseEmitter?.on(() => this.reverse(vnode.attrs));
    }
    view({ attrs }: Vnode<SelectorAttr>) {
        return (
            <div id={"selector_" + this.selectorId} className={attrs.className || ""}>
                {Object.entries(attrs.options).map(([id, name]) => (
                    <div className={"form-check" + (attrs.inline ? " form-check-inline" : "")} key={id}>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            name={`selector_${this.selectorId}`}
                            id={`option-${id}-${this.selectorId}`}
                            value={id}
                            checked={attrs.value[id]}
                            onchange={() => {
                                attrs.value[id] = !attrs.value[id];
                                if (attrs.onchange)
                                    attrs.onchange(attrs.value);
                                m.redraw();
                            }}
                        />
                        <label className="form-check-label" for={`option-${id}-${this.selectorId}`}>
                            {name}
                        </label>
                    </div>
                ))}
            </div>
        );
    }
    reverse(attrs: SelectorAttr) {
        Object.keys(attrs.options).forEach(id => {
            attrs.value[id] = !attrs.value[id];
        })
        if (attrs.onchange)
            attrs.onchange(attrs.value);
        m.redraw();
    }
}