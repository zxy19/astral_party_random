import m, { ClassComponent, Vnode } from 'mithril';
import { mapLabels } from '../../data';

interface MapSelectorAttrs {
  selectedMaps: number[];
  onMapToggle: (mapId: number) => void;
}

export class MapSelector implements ClassComponent<MapSelectorAttrs> {
  view({ attrs }: Vnode<MapSelectorAttrs>) {
    const { selectedMaps, onMapToggle } = attrs;
    
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title section-title">选择地图</h5>
          <div id="mapSelection" className="form-check">
            {Object.entries(mapLabels).map(([id, name]) => (
              <div className="form-check mb-2" key={id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`map${id}`}
                  value={id}
                  checked={selectedMaps.includes(parseInt(id))}
                  onchange={() => onMapToggle(parseInt(id))}
                />
                <label className="form-check-label" for={`map${id}`}>
                  {name}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}