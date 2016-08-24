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

  updateDrawControls(props = this.props) {
    const { layerContainer } = this.context;
    const { draw, position } = props;
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

    const { map } = this.context;

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

  componentWillReceiveProps(nextProps) {
    const drawsEqual = isEqual(this.props.draw, nextProps.draw);
    const positionsEqual = isEqual(this.props.position, nextProps.position);

    if(drawsEqual && positionsEqual) { return; }

    this.updateDrawControls(nextProps);
  }
}
