export type _Character<Color, Tag> = {
    icon: string;
    name: string;
    color: Color[];
    related: (keyof Tag)[];
}
export enum TagState {
    NORMAL,
    HIDE,
    BANNED,
    REQUIRED
}
export type GraphSettings = {
    showAvailable: boolean,
    showBanned: boolean,
    showDescription: boolean,
    large: boolean,
    slim: boolean
}
export interface Stringify<T> {
    serialize(value: T): string;
    deserialize(value: string): T;
}