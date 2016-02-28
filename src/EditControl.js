import { PropTypes } from 'react';
import Draw from 'leaflet-draw'; // eslint-disable-line

import { MapControl } from 'react-leaflet';

export default class EditControl extends MapControl {
  static propTypes = {
    onCreated: PropTypes.func,
    onEdited: PropTypes.func,
    onDeleted: PropTypes.func,
    draw: PropTypes.object,
    position: PropTypes.string
  };

  _checkDeprecated() {
    if(typeof this.props.onEdit === 'function') {
      console.error('onEdit is not a props anymore, use onEdited instead');
    }
    if(typeof this.props.onCreate === 'function') {
      console.error('onCreate is not a props anymore, use onEdited instead');
    }
  }

  componentWillMount() {
    const {onCreated, onDeleted, onMounted, onEdited, layerGroup, map, draw, position} = this.props;

    let options = {
      edit: {
          featureGroup: layerGroup,
      },
    };

    this._checkDeprecated();

    if(draw) options.draw = draw;
    if(position) options.position = position;

    this.leafletElement = new L.Control.Draw(options);

    if(typeof onMounted === "function") {
      onMounted(this.leafletElement);
    }

    map.on('draw:created', (e) => {
        layerGroup.addLayer(e.layer);
        onCreated && onCreated.call(null, e);
    });

    map.on('draw:edited', onEdited);
    map.on('draw:deleted', onDeleted);
  }
}
