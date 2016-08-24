import { PropTypes } from 'react';
import Draw from 'leaflet-draw'; // eslint-disable-line
import isEqual from 'lodash.isequal';

import { LayersControl } from 'react-leaflet';

export default class EditControl extends LayersControl {
  static propTypes = {
    onCreated: PropTypes.func,
    onEdited: PropTypes.func,
    onDeleted: PropTypes.func,
    onMounted: PropTypes.func,
    draw: PropTypes.object,
    position: PropTypes.string
  };

  constructor(props, context) {
    super(props, context);
    this.updateDrawControls = this.updateDrawControls.bind(this);
  }

  updateDrawControls() {
    const { layerContainer } = this.context;
    const { draw, position } = this.props;
    const options = {
      edit: {
        featureGroup: layerContainer
      }
    };

    if(draw) options.draw = draw;
    if(position) options.position = position;

    this.leafletElement = new L.Control.Draw(options);
  }

  componentWillMount() {
    const {
      onCreated,
      onDeleted,
      onMounted,
      onEdited,
    } = this.props;

    this.updateDrawControls();

    const { map, layerContainer } = this.context;

    if(typeof onMounted === "function") {
      onMounted(this.leafletElement);
    }

    map.on('draw:created', (e) => {
      layerContainer.addLayer(e.layer);
      onCreated && onCreated.call(null, e);
    });

    map.on('draw:edited', onEdited);
    map.on('draw:deleted', onDeleted);
  }

  componentDidUpdate(prevProps) {
    super.componentDidUpdate(prevProps);

    const drawsEqual = isEqual(this.props.draw, prevProps.draw);
    const positionsEqual = isEqual(this.props.position, prevProps.position);

    if(drawsEqual && positionsEqual) { return; }

    const { map } = this.context;

    this.leafletElement.removeFrom(map);
    this.updateDrawControls();
    this.leafletElement.addTo(map);

  }
}
