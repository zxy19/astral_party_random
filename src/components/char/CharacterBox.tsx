import m, { ClassComponent, Vnode } from 'mithril';
import { Character, Tag } from '../../types/game';
import { TagState } from '../../types/data';
import { colorData } from '../../data';


export type CharacterBoxAttrs = {
    character: Character;
    showTags?: boolean;
    tagStateProvider?: (t: Tag) => TagState
};

export class CharacterBox implements ClassComponent<CharacterBoxAttrs> {
    view({ attrs }: Vnode<CharacterBoxAttrs>) {
        return (
            <div className='character-card'>
                <img src={attrs.character.icon} alt={attrs.character.name} className={"character-icon color-" + colorData[attrs.character.color[0]].code} />
                <h6>{attrs.character.name}</h6>
                <small class="text-muted">颜色: {attrs.character.color.map(c => colorData[c].name).join("，")}</small>
                {attrs.showTags ? <div class="character-tags">{this.buildTags(attrs)}</div> : ""}
            </div>
        );
    }
    buildTags(attrs: CharacterBoxAttrs): Vnode<CharacterBoxAttrs>[] {
        const tagResults: Vnode<any>[] = [];
        for (const tag of attrs.character.related) {
            const tagState = attrs.tagStateProvider ? attrs.tagStateProvider(tag) : TagState.NORMAL;
            switch (tagState) {
                case TagState.BANNED:
                    tagResults.push(
                        <span className="badge bg-danger">{tag}</span>
                    );
                    break;
                case TagState.HIDE:
                    break;
                case TagState.NORMAL:
                    tagResults.push(
                        <span className="badge bg-secondary">{tag}</span>
                    );
                    break;
                case TagState.REQUIRED:
                    tagResults.push(
                        <span className="badge bg-success">{tag}</span>
                    );
                    break;
            }
        }
        return tagResults;
    }
}