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
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, EditControl);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(EditControl)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.updateDrawControls = function () {
      var layerContainer = _this.context.layerContainer;
      var _this$props = _this.props;
      var draw = _this$props.draw;
      var position = _this$props.position;

      var options = {
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

      _this.leafletElement = new L.Control.Draw(options); // eslint-disable-line
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(EditControl, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props;
      var onCreated = _props.onCreated;
      var onDeleted = _props.onDeleted;
      var onDeleteStart = _props.onDeleteStart;
      var onDeleteStop = _props.onDeleteStop;
      var onMounted = _props.onMounted;
      var onEdited = _props.onEdited;
      var onEditStart = _props.onEditStart;
      var onEditStop = _props.onEditStop;


      this.updateDrawControls();

      var _context = this.context;
      var map = _context.map;
      var layerContainer = _context.layerContainer;


      if (typeof onMounted === 'function') {
        onMounted(this.leafletElement);
      }

      map.on('draw:created', function (e) {
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
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      // super updates positions if thats all that changed so call this first
      _get(Object.getPrototypeOf(EditControl.prototype), 'componentDidUpdate', this).call(this, prevProps);

      if ((0, _lodash2.default)(this.props.draw, prevProps.draw) || this.props.position !== prevProps.position) {
        return false;
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
  onEditStart: _react.PropTypes.func,
  onEditStop: _react.PropTypes.func,
  onDeleted: _react.PropTypes.func,
  onDeleteStart: _react.PropTypes.func,
  onDeleteStop: _react.PropTypes.func,
  onMounted: _react.PropTypes.func,
  draw: _react.PropTypes.object,
  position: _react.PropTypes.oneOf(['topright', 'topleft', 'bottomright', 'bottomleft'])
};
exports.default = EditControl;