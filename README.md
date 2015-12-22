# React-Leaflet-Draw

React component build on top of [React-Leaflet](https://github.com/PaulLeCam/react-leaflet) that integrate [leaflet-draw](https://github.com/Leaflet/Leaflet.draw) functionality.

## Install

```
npm install react-leaflet-draw
```

## Getting started

It's important to wrap EditControl component into FeatureGroup component from react-leaflet.

```
import { Map, TileLayer, FeatureGroup } from 'react-leaflet';
import { EditControl } from "react-leaflet-draw"

...

<FeatureGroup>
    <EditControl position='topright' onEdit={this._onEditPath} onCreate={this._onCreate} />
</FeatureGroup>
```

For more details how to use this plugin check the example
