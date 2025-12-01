import m, { ClassComponent, Vnode } from 'mithril';
import { Character, Tag } from '../../types/game';
import { TagState } from '../../types/data';
import { CharacterBox } from './CharacterBox';


export type CharacterPanelAttrs = {
  characters: Character[];
  showTags?: boolean;
  tagStateProvider?: (t: Tag) => TagState
};

export class CharacterPanel implements ClassComponent<CharacterPanelAttrs> {
  view({ attrs }: Vnode<CharacterPanelAttrs>) {
    return (
      <div class="d-flex flex-wrap justify-content-center">
        {attrs.characters.map(char => (
          <CharacterBox character={char} showTags={attrs.showTags} tagStateProvider={attrs.tagStateProvider} />
        ))}
      </div>
    );
  }
}