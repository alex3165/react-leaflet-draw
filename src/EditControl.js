import { PropTypes } from 'react';
import Draw from 'leaflet-draw'; // eslint-disable-line

import { MapControl } from 'react-leaflet';

export default class EditControl extends MapControl {
  static propTypes = {
    onCreate: PropTypes.func,
    onEdit: PropTypes.func,
    draw: PropTypes.object,
    position: PropTypes.string
  };

  componentWillMount() {
    const {onCreate, layerGroup, onEdit, map, draw, position} = this.props;

    let options = {
      edit: {
          featureGroup: layerGroup,
      },
    };

    if(draw) options.draw = draw;
    if(position) options.position = position;

    this.leafletElement = new L.Control.Draw(options);

    map.on('draw:created', (e) => {
        layerGroup.addLayer(e.layer);
        onCreate && onCreate.call(null, e);
    });

    map.on('draw:edited', onEdit);
  }
}
