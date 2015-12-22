import { PropTypes } from 'react';
import Draw from 'leaflet-draw'; // eslint-disable-line

import { MapControl } from 'react-leaflet';

export default class EditControl extends MapControl {
  static propTypes = {
    onCreate: PropTypes.func,
    onEdit: PropTypes.func,
  };

  componentWillMount() {
    const {onCreate, layerGroup, onEdit, map} = this.props;

    this.leafletElement = new L.Control.Draw(Object.assign({}, {
        edit: {
            featureGroup: layerGroup,
        },
    }, this.props));

    map.on('draw:created', (e) => {
        layerGroup.addLayer(e.layer);
        onCreate && onCreate.call(null, e);
    });

    map.on('draw:edited', onEdit);
  }
}
