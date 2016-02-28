'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _leafletDraw = require('leaflet-draw');

var _leafletDraw2 = _interopRequireDefault(_leafletDraw);

var _reactLeaflet = require('react-leaflet');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // eslint-disable-line

var EditControl = function (_MapControl) {
  _inherits(EditControl, _MapControl);

  function EditControl() {
    _classCallCheck(this, EditControl);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(EditControl).apply(this, arguments));
  }

  _createClass(EditControl, [{
    key: '_checkDeprecated',
    value: function _checkDeprecated() {
      if (typeof this.props.onEdit === 'function') {
        console.error('onEdit is not a props anymore, use onEdited instead');
      }
      if (typeof this.props.onCreate === 'function') {
        console.error('onCreate is not a props anymore, use onEdited instead');
      }
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props;
      var onCreated = _props.onCreated;
      var onDeleted = _props.onDeleted;
      var onMounted = _props.onMounted;
      var onEdited = _props.onEdited;
      var layerGroup = _props.layerGroup;
      var map = _props.map;
      var draw = _props.draw;
      var position = _props.position;


      var options = {
        edit: {
          featureGroup: layerGroup
        }
      };

      this._checkDeprecated();

      if (draw) options.draw = draw;
      if (position) options.position = position;

      this.leafletElement = new L.Control.Draw(options);

      if (typeof onMounted === "function") {
        onMounted(this.leafletElement);
      }

      map.on('draw:created', function (e) {
        layerGroup.addLayer(e.layer);
        onCreated && onCreated.call(null, e);
      });

      map.on('draw:edited', onEdited);
      map.on('draw:deleted', onDeleted);
    }
  }]);

  return EditControl;
}(_reactLeaflet.MapControl);

EditControl.propTypes = {
  onCreated: _react.PropTypes.func,
  onEdited: _react.PropTypes.func,
  onDeleted: _react.PropTypes.func,
  draw: _react.PropTypes.object,
  position: _react.PropTypes.string
};
exports.default = EditControl;