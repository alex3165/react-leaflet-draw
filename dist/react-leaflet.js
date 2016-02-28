(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("leaflet-draw"), require("react-leaflet"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "leaflet-draw", "react-leaflet"], factory);
	else if(typeof exports === 'object')
		exports["ReactLeaflet"] = factory(require("react"), require("leaflet-draw"), require("react-leaflet"));
	else
		root["ReactLeaflet"] = factory(root["React"], root["L"], root[undefined]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.EditControl = undefined;

	var _EditControl2 = __webpack_require__(1);

	var _EditControl3 = _interopRequireDefault(_EditControl2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.EditControl = _EditControl3.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _leafletDraw = __webpack_require__(3);

	var _leafletDraw2 = _interopRequireDefault(_leafletDraw);

	var _reactLeaflet = __webpack_require__(4);

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

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }
/******/ ])
});
;