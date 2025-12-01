import { Tags } from "../data";
import { Tag } from "../types/game";

const tags2id: Record<Tag, number> = <any>{};
const id2tags: Record<number, Tag> = <any>{};
{
    let i = 0;
    for (const tag in Tags) {
        tags2id[<Tag>tag] = i;
        id2tags[i] = <Tag>tag;
        i++;
    }
}

export function tags2idList(tags: Tag[]): number[] {
    return tags.map(tag => tags2id[tag]);
}
export function idList2tags(ids: number[]): Tag[] {
    return ids.map(id => id2tags[id]);
}