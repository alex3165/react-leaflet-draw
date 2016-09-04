import { PropTypes } from 'react';
import Draw from 'leaflet-draw'; // eslint-disable-line
import isEqual from 'lodash.isequal';

import { LayersControl } from 'react-leaflet';

export default class EditControl extends LayersControl {
  static propTypes = {
    onCreated: PropTypes.func,
    onEdited: PropTypes.func,
    onEditStart: PropTypes.func,
    onEditStop: PropTypes.func,
    onDeleted: PropTypes.func,
    onDeleteStart: PropTypes.func,
    onDeleteStop: PropTypes.func,
    onMounted: PropTypes.func,
    draw: PropTypes.object,
    position: PropTypes.oneOf([
      'topright',
      'topleft',
      'bottomright',
      'bottomleft'
    ])
  };

  componentWillMount() {
    const {
      onCreated,
      onDeleted,
      onDeleteStart,
      onDeleteStop,
      onMounted,
      onEdited,
      onEditStart,
      onEditStop
    } = this.props;

    this.updateDrawControls();

    const { map, layerContainer } = this.context;

    if (typeof onMounted === 'function') {
      onMounted(this.leafletElement);
    }

    map.on('draw:created', (e) => {
      layerContainer.addLayer(e.layer);
      onCreated && onCreated.call(null, e);
    });

    map.on('draw:edited', onEdited);
    if (typeof onEditStart === 'function') {
      map.on('draw:editstart', onEditStart);
    }
    if (typeof onEditStop === 'function') {
      map.on('draw:editstop', onEditStop);
    }

    map.on('draw:deleted', onDeleted);
    if (typeof onDeleteStart === 'function') {
      map.on('draw:deletestart', onDeleteStart);
    }
    if (typeof onDeleteStop === 'function') {
      map.on('draw:deletestop', onDeleteStop);
    }
  }

  componentDidUpdate(prevProps) {
    // super updates positions if thats all that changed so call this first
    super.componentDidUpdate(prevProps);

    if (isEqual(this.props.draw, prevProps.draw) || this.props.position !== prevProps.position) {
      return false;
    }

    const { map } = this.context;

    this.leafletElement.removeFrom(map);
    this.updateDrawControls();
    this.leafletElement.addTo(map);

  }

  updateDrawControls = () => {
    const { layerContainer } = this.context;
    const { draw, position } = this.props;
    const options = {
      edit: {
        featureGroup: layerContainer
      }
    };

    if (draw) {
      options.draw = draw;
    }

    if (position) {
      options.position = position;
    }

    this.leafletElement = new L.Control.Draw(options); // eslint-disable-line
  };
}
