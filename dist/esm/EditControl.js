function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { PropTypes } from 'prop-types';
import Draw from 'leaflet-draw'; // eslint-disable-line

import isEqual from 'fast-deep-equal';
import React, { useRef } from 'react';
import { useLeafletContext } from '@react-leaflet/core';
import leaflet, { Map, Control } from 'leaflet';
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
  var drawRef = useRef();
  var propsRef = useRef(props);

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

    return new Control.Draw(options);
  }

  React.useEffect(function () {
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

    map.on(leaflet.Draw.Event.CREATED, onDrawCreate);
    drawRef.current = createDrawElement(props, context);
    map.addControl(drawRef.current);
    onMounted && onMounted(drawRef.current);
    return function () {
      map.off(leaflet.Draw.Event.CREATED, onDrawCreate);

      for (var _key in eventHandlers) {
        if (props[_key]) {
          map.off(eventHandlers[_key], props[_key]);
        }
      }
    };
  }, []);
  React.useEffect(function () {
    if (isEqual(props.draw, propsRef.current.draw) && isEqual(props.edit, propsRef.current.edit) && props.position === propsRef.current.position) {
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
  acc[val] = PropTypes.func;
  return acc;
}, {})), {}, {
  onCreated: PropTypes.func,
  onInit: PropTypes.func,
  onMounted: PropTypes.func,
  draw: PropTypes.shape({
    polyline: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    polygon: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    rectangle: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    circle: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    marker: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
  }),
  edit: PropTypes.shape({
    edit: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    remove: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    poly: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    allowIntersection: PropTypes.bool
  }),
  position: PropTypes.oneOf(['topright', 'topleft', 'bottomright', 'bottomleft']),
  leaflet: PropTypes.shape({
    map: PropTypes.instanceOf(Map),
    layerContainer: PropTypes.shape({
      addLayer: PropTypes.func.isRequired,
      removeLayer: PropTypes.func.isRequired
    })
  })
});
export default EditControl;