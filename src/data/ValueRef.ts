export class ValueRef<T> {
    private getter: () => T;
    private setter: (t: T) => void
    private onchange: ((t: T) => void) | null
    constructor(getter: () => T, setter: (t: T) => void, onchange: ((t: T) => void) | null = null) {
        this.getter = getter;
        this.setter = setter;
        this.onchange = onchange
    }

    get value(): T {
        return this.getter();
    }

    set value(value: T) {
        this.setter(value);
        if (this.onchange)
            this.onchange(value);
    }
}