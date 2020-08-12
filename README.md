# React-Leaflet-Draw

React component build on top of [React-Leaflet](https://github.com/PaulLeCam/react-leaflet) that integrate [leaflet-draw](https://github.com/Leaflet/Leaflet.draw) feature.

## Install

```
npm install react-leaflet-draw
```

## Getting started

First, include leaflet-draw styles in your project
```html
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.css"/>
```
or by including
```
node_modules/leaflet-draw/dist/leaflet.draw.css
```

You might need to add one more rule missing in the current css:
```css
  .sr-only {
    display: none;
  }
```

It's important to wrap EditControl component into FeatureGroup component from `react-leaflet`.
The elements you draw will be added to this FeatureGroup layer, when you hit edit button only items in this layer will be edited.

```jsx
import { Map, TileLayer, FeatureGroup, Circle } from 'react-leaflet';
import { EditControl } from "react-leaflet-draw"

const Component = () => (
  <FeatureGroup>
    <EditControl
      position='topright'
      onEdited={this._onEditPath}
      onCreated={this._onCreate}
      onDeleted={this._onDeleted}
      draw={{
        rectangle: false
      }}
    />
    <Circle center={[51.51, -0.06]} radius={200} />
  </FeatureGroup>
);
```

For more details on how to use this plugin check the [example](example/edit-control.js).

You can pass more options on draw object, this informations can be found [here](https://github.com/Leaflet/Leaflet.draw#user-content-example-leafletdraw-config)

## EditControl API

#### Props

|name            |type                        |description                                           |
|----------------|----------------------------|------------------------------------------------------|
|position        |string                      |control group position                                |
|draw            |object <DrawOptions>        |enable/disable draw controls                          |
|edit            |object <EditPolyOptions>    |enable/disable edit controls                          |
|onEdited        |function                    |hook to leaflet-draw's `draw:edited` event            |
|onCreated       |function                    |hook to leaflet-draw's `draw:created` event           |
|onDeleted       |function                    |hook to leaflet-draw's `draw:deleted` event           |
|onMounted       |function                    |hook to leaflet-draw's `draw:mounted` event           |
|onEditStart     |function                    |hook to leaflet-draw's `draw:editstart` event         |
|onEditStop      |function                    |hook to leaflet-draw's `draw:editstop` event          |
|onDeleteStart   |function                    |hook to leaflet-draw's `draw:deletestart` event       |
|onDeleteStop    |function                    |hook to leaflet-draw's `draw:deletestop` event        |
|onDrawStart     |function                    |hook to leaflet-draw's `draw:drawstart` event         |
|onDrawStop      |function                    |hook to leaflet-draw's `draw:drawstop` event          |
|onDrawVertex    |function                    |hook to leaflet-draw's `draw:drawvertex` event        |
|onEditMove      |function                    |hook to leaflet-draw's `draw:editmove` event          |
|onEditResize    |function                    |hook to leaflet-draw's `draw:editresize` event          |
|onEditVertex    |function                    |hook to leaflet-draw's `draw:editvertex` event          |

#### Links to docs

* [Control position options](http://leafletjs.com/reference.html#control-positions)
* [DrawOptions](https://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html#drawoptions)
* [EditPolyOptions](https://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html#editpolyoptions)
* [Draw events](https://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html#l-draw-event)
