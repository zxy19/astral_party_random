import m, { ClassComponent, Vnode } from 'mithril';
import { mapLabels } from '../../data';
import { v4 as uuidv4 } from 'uuid';
import { ValueRef } from '../../data/ValueRef';
import { MultiSelector } from './MultiSelector';
import { Stringify } from '../../types/data';
import { Emitter } from '../../data/Emitter';

interface SelectorAttr<T> {
    options: Record<string, string>,
    inline: boolean,
    value: T[],
    className: string,
    valueConverter: Stringify<T>,
    onchange?: (v: T[]) => void,
    reverseEmitter?: Emitter
}

export class ListedMultiSelector<T> implements ClassComponent<SelectorAttr<T>> {
    private tValue: Record<string, boolean> = {};
    private valueConverter: Stringify<T> = {
        deserialize(s) {
            return s as any;
        },
        serialize(v) {
            return v as string;
        }
    }
    oninit(vn: Vnode<SelectorAttr<T>>) {
        if (vn.attrs.valueConverter)
            this.valueConverter = vn.attrs.valueConverter;
        this.updateKeys(vn.attrs)
    }
    updateKeys(attrs: SelectorAttr<T>) {
        Object.keys(this.tValue).forEach(t => delete this.tValue[t]);
        Object.keys(attrs.options).forEach(t => this.tValue[t] = false);
        attrs.value.forEach(v => this.tValue[this.valueConverter.serialize(v)] = true);
    }
    view({ attrs }: Vnode<SelectorAttr<T>>) {
        return (
            <MultiSelector options={attrs.options} inline={attrs.inline} value={this.tValue} className={attrs.className} onchange={this.makeChangedCb(attrs)} reverseEmitter={attrs.reverseEmitter} />
        )
    }
    makeChangedCb(attrs: SelectorAttr<T>) {
        return (v: typeof this.tValue) => {
            const seen: typeof this.tValue = {};
            for (let i = attrs.value.length - 1; i >= 0; i--) {
                const k = this.valueConverter.serialize(attrs.value[i])
                seen[k] = true;
                if (!v[k]) {
                    attrs.value.splice(i, 1);
                }
            }
            Object.keys(v)
                .filter(t => !seen[t] && v[t])
                .forEach(t => attrs.value.push(this.valueConverter.deserialize(t)))
            if (attrs.onchange)
                attrs.onchange(attrs.value);
        }
    }
}
