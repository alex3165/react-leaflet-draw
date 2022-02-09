(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("leaflet"), require("leaflet-draw"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "leaflet", "leaflet-draw"], factory);
	else if(typeof exports === 'object')
		exports["ReactLeaflet"] = factory(require("react"), require("leaflet"), require("leaflet-draw"));
	else
		root["ReactLeaflet"] = factory(root["React"], root["L"], root["L"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__1__, __WEBPACK_EXTERNAL_MODULE__2__, __WEBPACK_EXTERNAL_MODULE__4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
if (false) { var throwOnDirectAccess, ReactIs; } else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(5)();
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var isArray = Array.isArray;
var keyList = Object.keys;
var hasProp = Object.prototype.hasOwnProperty;

module.exports = function equal(a, b) {
  if (a === b) return true;

  if (a && b && _typeof(a) == 'object' && _typeof(b) == 'object') {
    var arrA = isArray(a),
        arrB = isArray(b),
        i,
        length,
        key;

    if (arrA && arrB) {
      length = a.length;
      if (length != b.length) return false;

      for (i = length; i-- !== 0;) {
        if (!equal(a[i], b[i])) return false;
      }

      return true;
    }

    if (arrA != arrB) return false;
    var dateA = a instanceof Date,
        dateB = b instanceof Date;
    if (dateA != dateB) return false;
    if (dateA && dateB) return a.getTime() == b.getTime();
    var regexpA = a instanceof RegExp,
        regexpB = b instanceof RegExp;
    if (regexpA != regexpB) return false;
    if (regexpA && regexpB) return a.toString() == b.toString();
    var keys = keyList(a);
    length = keys.length;
    if (length !== keyList(b).length) return false;

    for (i = length; i-- !== 0;) {
      if (!hasProp.call(b, keys[i])) return false;
    }

    for (i = length; i-- !== 0;) {
      key = keys[i];
      if (!equal(a[key], b[key])) return false;
    }

    return true;
  }

  return a !== a && b !== b;
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__4__;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var ReactPropTypesSecret = __webpack_require__(6);

function emptyFunction() {}

function emptyFunctionWithReset() {}

emptyFunctionWithReset.resetWarningCache = emptyFunction;

module.exports = function () {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }

    var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
    err.name = 'Invariant Violation';
    throw err;
  }

  ;
  shim.isRequired = shim;

  function getShim() {
    return shim;
  }

  ; // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.

  var ReactPropTypes = {
    array: shim,
    bigint: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,
    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,
    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };
  ReactPropTypes.PropTypes = ReactPropTypes;
  return ReactPropTypes;
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
module.exports = ReactPropTypesSecret;

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "EditControl", function() { return /* reexport */ src_EditControl; });

// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(0);

// EXTERNAL MODULE: external {"amd":"leaflet-draw","commonjs":"leaflet-draw","commonjs2":"leaflet-draw","root":"L"}
var external_amd_leaflet_draw_commonjs_leaflet_draw_commonjs2_leaflet_draw_root_L_ = __webpack_require__(4);

// EXTERNAL MODULE: ./node_modules/fast-deep-equal/index.js
var fast_deep_equal = __webpack_require__(3);
var fast_deep_equal_default = /*#__PURE__*/__webpack_require__.n(fast_deep_equal);

// EXTERNAL MODULE: external {"amd":"react","commonjs":"react","commonjs2":"react","root":"React"}
var external_amd_react_commonjs_react_commonjs2_react_root_React_ = __webpack_require__(1);
var external_amd_react_commonjs_react_commonjs2_react_root_React_default = /*#__PURE__*/__webpack_require__.n(external_amd_react_commonjs_react_commonjs2_react_root_React_);

// CONCATENATED MODULE: ./node_modules/@react-leaflet/core/esm/context.js

var CONTEXT_VERSION = 1;
var LeafletContext = /*#__PURE__*/Object(external_amd_react_commonjs_react_commonjs2_react_root_React_["createContext"])(null);
var LeafletProvider = LeafletContext.Provider;
function useLeafletContext() {
  var context = Object(external_amd_react_commonjs_react_commonjs2_react_root_React_["useContext"])(LeafletContext);

  if (context == null) {
    throw new Error('No context provided: useLeafletContext() can only be used in a descendant of <MapContainer>');
  }

  return context;
}
// EXTERNAL MODULE: external {"amd":"leaflet","commonjs":"leaflet","commonjs2":"leaflet","root":"L"}
var external_amd_leaflet_commonjs_leaflet_commonjs2_leaflet_root_L_ = __webpack_require__(2);
var external_amd_leaflet_commonjs_leaflet_commonjs2_leaflet_root_L_default = /*#__PURE__*/__webpack_require__.n(external_amd_leaflet_commonjs_leaflet_commonjs2_leaflet_root_L_);

// CONCATENATED MODULE: ./src/EditControl.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


 // eslint-disable-line





var eventHandlers = {
  onEdited: 'draw:edited',
  onDrawStart: 'draw:drawstart',
  onDrawStop: 'draw:drawstop',
  onDrawVertex: 'draw:drawvertex',
  onEditStart: 'draw:editstart',
  onEditMove: 'draw:editmove',
  onEditResize: 'draw:editresize',
  onEditVertex: 'draw:editvertex',
  onEditStop: 'draw:editstop',
  onDeleted: 'draw:deleted',
  onDeleteStart: 'draw:deletestart',
  onDeleteStop: 'draw:deletestop'
};

function EditControl(props) {
  var context = useLeafletContext();
  var drawRef = Object(external_amd_react_commonjs_react_commonjs2_react_root_React_["useRef"])();
  var propsRef = Object(external_amd_react_commonjs_react_commonjs2_react_root_React_["useRef"])(props);

  if (props.onInit) {
    props.onInit();
  }

  var onDrawCreate = function onDrawCreate(e) {
    var onCreated = props.onCreated;
    var container = context.layerContainer || context.map;
    container.addLayer(e.layer);
    onCreated && onCreated(e);
  };

  function createDrawElement(props, context) {
    var layerContainer = context.layerContainer;
    var draw = props.draw,
        edit = props.edit,
        position = props.position;
    console.log(props);
    var options = {
      edit: _objectSpread(_objectSpread({}, edit), {}, {
        featureGroup: layerContainer
      })
    };

    if (draw) {
      options.draw = _objectSpread({}, draw);
    }

    if (position) {
      options.position = position;
    }

    return new external_amd_leaflet_commonjs_leaflet_commonjs2_leaflet_root_L_["Control"].Draw(options);
  }

  external_amd_react_commonjs_react_commonjs2_react_root_React_default.a.useEffect(function () {
    var map = context.map;
    var onMounted = props.onMounted;

    for (var key in eventHandlers) {
      map.on(eventHandlers[key], function (evt) {
        var handlers = Object.keys(eventHandlers).filter(function (handler) {
          return eventHandlers[handler] === evt.type;
        });

        if (handlers.length === 1) {
          var handler = handlers[0];
          props[handler] && props[handler](evt);
        }
      });
    }

    map.on(external_amd_leaflet_commonjs_leaflet_commonjs2_leaflet_root_L_default.a.Draw.Event.CREATED, onDrawCreate);
    drawRef.current = createDrawElement(props, context);
    map.addControl(drawRef.current);
    onMounted && onMounted(drawRef.current);
    return function () {
      map.off(external_amd_leaflet_commonjs_leaflet_commonjs2_leaflet_root_L_default.a.Draw.Event.CREATED, onDrawCreate);

      for (var _key in eventHandlers) {
        if (props[_key]) {
          map.off(eventHandlers[_key], props[_key]);
        }
      }
    };
  }, []);
  external_amd_react_commonjs_react_commonjs2_react_root_React_default.a.useEffect(function () {
    if (fast_deep_equal_default()(props.draw, propsRef.current.draw) && fast_deep_equal_default()(props.edit, propsRef.current.edit) && props.position === propsRef.current.position) {
      return false;
    }

    var map = context.map;
    drawRef.current.remove(map);
    drawRef.current = createDrawElement(props, context);
    drawRef.current.addTo(map);
    var onMounted = props.onMounted;
    onMounted && onMounted(drawRef.current);
    return null;
  }, [props.draw, props.edit, props.position]);
  return null;
}

EditControl.propTypes = _objectSpread(_objectSpread({}, Object.keys(eventHandlers).reduce(function (acc, val) {
  acc[val] = prop_types["PropTypes"].func;
  return acc;
}, {})), {}, {
  onCreated: prop_types["PropTypes"].func,
  onInit: prop_types["PropTypes"].func,
  onMounted: prop_types["PropTypes"].func,
  draw: prop_types["PropTypes"].shape({
    polyline: prop_types["PropTypes"].oneOfType([prop_types["PropTypes"].object, prop_types["PropTypes"].bool]),
    polygon: prop_types["PropTypes"].oneOfType([prop_types["PropTypes"].object, prop_types["PropTypes"].bool]),
    rectangle: prop_types["PropTypes"].oneOfType([prop_types["PropTypes"].object, prop_types["PropTypes"].bool]),
    circle: prop_types["PropTypes"].oneOfType([prop_types["PropTypes"].object, prop_types["PropTypes"].bool]),
    marker: prop_types["PropTypes"].oneOfType([prop_types["PropTypes"].object, prop_types["PropTypes"].bool])
  }),
  edit: prop_types["PropTypes"].shape({
    edit: prop_types["PropTypes"].oneOfType([prop_types["PropTypes"].object, prop_types["PropTypes"].bool]),
    remove: prop_types["PropTypes"].oneOfType([prop_types["PropTypes"].object, prop_types["PropTypes"].bool]),
    poly: prop_types["PropTypes"].oneOfType([prop_types["PropTypes"].object, prop_types["PropTypes"].bool]),
    allowIntersection: prop_types["PropTypes"].bool
  }),
  position: prop_types["PropTypes"].oneOf(['topright', 'topleft', 'bottomright', 'bottomleft']),
  leaflet: prop_types["PropTypes"].shape({
    map: prop_types["PropTypes"].instanceOf(external_amd_leaflet_commonjs_leaflet_commonjs2_leaflet_root_L_["Map"]),
    layerContainer: prop_types["PropTypes"].shape({
      addLayer: prop_types["PropTypes"].func.isRequired,
      removeLayer: prop_types["PropTypes"].func.isRequired
    })
  })
});
/* harmony default export */ var src_EditControl = (EditControl);
// CONCATENATED MODULE: ./src/index.js


/***/ })
/******/ ]);
});