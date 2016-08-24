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

  function EditControl(props, context) {
    _classCallCheck(this, EditControl);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(EditControl).call(this, props, context));

    _this.updateDrawControls = _this.updateDrawControls.bind(_this);
    return _this;
  }

  _createClass(EditControl, [{
    key: 'updateDrawControls',
    value: function updateDrawControls() {
      var layerContainer = this.context.layerContainer;
      var _props = this.props;
      var draw = _props.draw;
      var position = _props.position;

      var options = {
        edit: {
          featureGroup: layerContainer
        }
      };

      if (draw) options.draw = draw;
      if (position) options.position = position;

      this.leafletElement = new L.Control.Draw(options);
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props2 = this.props;
      var onCreated = _props2.onCreated;
      var onDeleted = _props2.onDeleted;
      var onMounted = _props2.onMounted;
      var onEdited = _props2.onEdited;


      this.updateDrawControls();

      var _context = this.context;
      var map = _context.map;
      var layerContainer = _context.layerContainer;


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
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      // super updates positions if thats all that changed so call this first
      _get(Object.getPrototypeOf(EditControl.prototype), 'componentDidUpdate', this).call(this, prevProps);

      if ((0, _lodash2.default)(this.props.draw, prevProps.draw)) {
        return;
      }

      var map = this.context.map;


      this.leafletElement.removeFrom(map);
      this.updateDrawControls();
      this.leafletElement.addTo(map);
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