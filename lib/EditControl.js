'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _leafletDraw = require('leaflet-draw');

var _leafletDraw2 = _interopRequireDefault(_leafletDraw);

var _reactLeaflet = require('react-leaflet');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // eslint-disable-line

var EditControl = (function (_MapControl) {
  _inherits(EditControl, _MapControl);

  function EditControl() {
    _classCallCheck(this, EditControl);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(EditControl).apply(this, arguments));
  }

  _createClass(EditControl, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props;
      var onCreate = _props.onCreate;
      var layerGroup = _props.layerGroup;
      var onEdit = _props.onEdit;
      var map = _props.map;

      this.leafletElement = new L.Control.Draw(Object.assign({}, {
        edit: {
          featureGroup: layerGroup
        }
      }, this.props));

      map.on('draw:created', function (e) {
        layerGroup.addLayer(e.layer);
        onCreate && onCreate.call(null, e);
      });

      map.on('draw:edited', onEdit);
    }
  }]);

  return EditControl;
})(_reactLeaflet.MapControl);

EditControl.propTypes = {
  onCreate: _react.PropTypes.func,
  onEdit: _react.PropTypes.func
};
exports.default = EditControl;