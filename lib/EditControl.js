'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require('react');

var _leafletDraw = require('leaflet-draw');

var _leafletDraw2 = _interopRequireDefault(_leafletDraw);

var _lodash = require('lodash.isequal');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactLeaflet = require('react-leaflet');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // eslint-disable-line


var EditControl = function (_LayersControl) {
  _inherits(EditControl, _LayersControl);

  function EditControl() {
    _classCallCheck(this, EditControl);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(EditControl).apply(this, arguments));
  }

  _createClass(EditControl, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props;
      var onCreated = _props.onCreated;
      var onDeleted = _props.onDeleted;
      var onMounted = _props.onMounted;
      var onEdited = _props.onEdited;
      var draw = _props.draw;
      var position = _props.position;
      var _context = this.context;
      var map = _context.map;
      var layerContainer = _context.layerContainer;


      var options = {
        edit: {
          featureGroup: layerContainer
        }
      };

      if (draw) options.draw = draw;
      if (position) options.position = position;

      this.leafletElement = new L.Control.Draw(options);

      if (typeof onMounted === "function") {
        onMounted(this.leafletElement);
      }

      map.on('draw:created', function (e) {
        layerContainer.addLayer(e.layer);
        onCreated && onCreated.call(null, e);
      });

      map.on('draw:edited', onEdited);
      map.on('draw:deleted', onDeleted);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      _get(Object.getPrototypeOf(EditControl.prototype), 'componentWillRecieveProps', this).call(this, nextProps);
      var lastDraw = this.props.draw;
      var nextDraw = nextProps.draw;

      if ((0, _lodash2.default)(lastDraw, nextDraw)) {
        return;
      }

      this.leafletElement.setDrawingOptions(nextDraw);
    }
  }]);

  return EditControl;
}(_reactLeaflet.LayersControl);

EditControl.propTypes = {
  onCreated: _react.PropTypes.func,
  onEdited: _react.PropTypes.func,
  onDeleted: _react.PropTypes.func,
  onMounted: _react.PropTypes.func,
  draw: _react.PropTypes.object,
  position: _react.PropTypes.string
};
exports.default = EditControl;