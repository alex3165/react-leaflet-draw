# React-Leaflet-Draw

React component build on top of [React-Leaflet](https://github.com/PaulLeCam/react-leaflet) that integrate [leaflet-draw](https://github.com/Leaflet/Leaflet.draw) feature.

## Install

```
npm install react-leaflet-draw
```

## Getting started

First you need to add this css style to your project:
```js
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/leaflet.draw/0.4.2/leaflet.draw.css"/>
```

You might need to add one more rule missing in the current css:
```css
  .sr-only {
    display: none;
  }
```

It's important to wrap EditControl component into FeatureGroup component from `react-leaflet`.
The elements you draw will be added to this FeatureGroup layer, when you hit edit button only items in this layer will be edited.

```js
import { Map, TileLayer, FeatureGroup } from 'react-leaflet';
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
