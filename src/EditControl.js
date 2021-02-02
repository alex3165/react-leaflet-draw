import { PropTypes } from "prop-types";
import Draw from "leaflet-draw"; // eslint-disable-line
import isEqual from "lodash-es/isEqual";
import React, { useRef } from "react";
import { useLeafletContext } from "@react-leaflet/core";

import leaflet, { Map, Control } from "leaflet";

const eventHandlers = {
  onEdited: "draw:edited",
  onDrawStart: "draw:drawstart",
  onDrawStop: "draw:drawstop",
  onDrawVertex: "draw:drawvertex",
  onEditStart: "draw:editstart",
  onEditMove: "draw:editmove",
  onEditResize: "draw:editresize",
  onEditVertex: "draw:editvertex",
  onEditStop: "draw:editstop",
  onDeleted: "draw:deleted",
  onDeleteStart: "draw:deletestart",
  onDeleteStop: "draw:deletestop",
};

// const useDrawElement = createElementHook(createDrawElement, updateDrawElement);
// 1. Change this to functional component as 'function EditControl = (props) => {}'
function EditControl(props) {
  // 2. Define this static props outside as EditControl.PropTypes

  // 3. const context = useLeafletContext() use context i think this is equivalent to const { map } = this.props.leaflet ?
  const context = useLeafletContext();
  const drawRef = useRef();
  const propsRef = useRef(props);

  drawRef.current = createDrawElement(props, context);
  // console.log(context);
  // createLeafletElement(props) {
  //   // console.log(createDrawElement(props));
  //   return createDrawElement(props);
  // }
  // 6. const elementRef = useSquareElement(props, context)
  //   const elementRef = useDrawElement(props, context);

  // console.log({ elementRef });

  const onDrawCreate = (e) => {
    console.log(e.layer);
    const { onCreated } = props;
    const container = context.layerContainer || context.map;
    // console.log({ layerContainer });
    container.addLayer(e.layer);
    onCreated && onCreated(e);
  };

  React.useEffect(() => {
    const { map } = context;
    const { onMounted } = props;

    for (const key in eventHandlers) {
      map.on(eventHandlers[key], (evt) => {
        let handlers = Object.keys(eventHandlers).filter(
          (handler) => eventHandlers[handler] === evt.type
        );
        if (handlers.length === 1) {
          let handler = handlers[0];
          props[handler] && props[handler](evt);
        }
      });
    }
    map.on(leaflet.Draw.Event.CREATED, onDrawCreate);

    console.log({ drawRef });

    onMounted && onMounted(drawRef.current); //? Is this context ? What is leafletElement here ?

    return () => {
      const { map } = props.leaflet;

      map.off(leaflet.Draw.Event.CREATED, onDrawCreate);

      for (const key in eventHandlers) {
        if (props[key]) {
          map.off(eventHandlers[key], props[key]);
        }
      }
    };
  }, []);

  React.useEffect(() => {
    if (
      isEqual(props.draw, propsRef.draw) &&
      isEqual(props.edit, propsRef.edit) &&
      props.position === propsRef.position
    ) {
      return false;
    }
    const { map } = context;

    drawRef.current.remove(map);
    drawRef.current = createDrawElement(props, context);
    drawRef.current.addTo(map);

    // Remount the new draw control
    const { onMounted } = props;
    onMounted && onMounted(drawRef.current);

    return null;
  }, [props.draw, props.edit, props.position]);

  // onDrawCreate = (e) => {
  //   const { onCreated } = this.props;
  //   const { layerContainer } = this.props.leaflet;
  //   // console.log({ layerContainer });
  //   layerContainer.addLayer(e.layer);
  //   onCreated && onCreated(e);
  // };

  // componentDidMount() {
  //   // console.log(this.props);

  //   super.componentDidMount();
  //   const { map } = this.props.leaflet;
  //   const { onMounted } = this.props;

  //   // console.log({ leaflet: this.props.leaflet });
  //   // console.log({ mountfind: this.props });

  //   for (const key in eventHandlers) {
  //     map.on(eventHandlers[key], (evt) => {
  //       let handlers = Object.keys(eventHandlers).filter(
  //         (handler) => eventHandlers[handler] === evt.type
  //       );
  //       if (handlers.length === 1) {
  //         let handler = handlers[0];
  //         this.props[handler] && this.props[handler](evt);
  //       }
  //     });
  //   }

  //   map.on(leaflet.Draw.Event.CREATED, this.onDrawCreate);
  //   // console.log({ leafel: this.leafletElement });
  //   onMounted && onMounted(this.leafletElement);
  // }

  // componentWillUnmount() {
  //   super.componentWillUnmount();
  //   const { map } = this.props.leaflet;

  //   map.off(leaflet.Draw.Event.CREATED, this.onDrawCreate);

  //   for (const key in eventHandlers) {
  //     if (this.props[key]) {
  //       map.off(eventHandlers[key], this.props[key]);
  //     }
  //   }
  // }

  // componentDidUpdate(prevProps) {
  //   // super updates positions if thats all that changed so call this first
  //   super.componentDidUpdate(prevProps);

  //   // If the props haven't changed, don't update
  //   if (
  //     isEqual(this.props.draw, prevProps.draw) &&
  //     isEqual(this.props.edit, prevProps.edit) &&
  //     this.props.position === prevProps.position
  //   ) {
  //     return false;
  //   }

  //   const { map } = this.props.leaflet;

  //   this.leafletElement.remove(map);
  //   this.leafletElement = createDrawElement(this.props);
  //   this.leafletElement.addTo(map);
  //   console.log(this.leafletElement);
  //   // Remount the new draw control
  //   const { onMounted } = this.props;
  //   onMounted && onMounted(this.leafletElement);

  //   return null;
  // }
  return null;
}

// 3. Modify this function as createDrawElement(props,context)
function createDrawElement(props, context) {
  // console.log({ props });
  const { layerContainer } = context;
  const { draw, edit, position } = props;
  const options = {
    edit: {
      ...edit,
      featureGroup: layerContainer,
    },
  };

  if (draw) {
    options.draw = { ...draw };
  }

  if (position) {
    options.position = position;
  }

  return new Control.Draw(options);
  // return new Control.Draw(options);
}

function updateDrawElement(instance, props, prevProps) {
  console.log("Hi");
  if (
    isEqual(props.draw, prevProps.draw) &&
    isEqual(props.edit, prevProps.edit) &&
    props.position === prevProps.position
  ) {
    return false;
  }
  const { map } = props.leaflet;

  leafletElement.remove(map);
  leafletElement = createDrawElement(props);
  leafletElement.addTo(map);

  // Remount the new draw control
  const { onMounted } = props;
  onMounted && onMounted(leafletElement);

  return null;
}

// 5. const useDrawElement = createElementHook(createDrawElement, updateDrawElement)
EditControl.propTypes = {
  ...Object.keys(eventHandlers).reduce((acc, val) => {
    acc[val] = PropTypes.func;
    return acc;
  }, {}),
  onCreated: PropTypes.func,
  onMounted: PropTypes.func,
  draw: PropTypes.shape({
    polyline: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    polygon: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    rectangle: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    circle: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    marker: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  }),
  edit: PropTypes.shape({
    edit: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    remove: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    poly: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    allowIntersection: PropTypes.bool,
  }),
  position: PropTypes.oneOf([
    "topright",
    "topleft",
    "bottomright",
    "bottomleft",
  ]),
  leaflet: PropTypes.shape({
    map: PropTypes.instanceOf(Map),
    layerContainer: PropTypes.shape({
      addLayer: PropTypes.func.isRequired,
      removeLayer: PropTypes.func.isRequired,
    }),
  }),
};

export default EditControl;
