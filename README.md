# React-Leaflet-Draw

React component build on top of [React-Leaflet](https://github.com/PaulLeCam/react-leaflet) that integrate [leaflet-draw](https://github.com/Leaflet/Leaflet.draw) functionality.

## Install

```
npm install react-leaflet-draw
```

## Getting started

It's important to wrap EditControl component into FeatureGroup component from react-leaflet. The drawed elements will be append in this FeatureGroup layer and edit button will edit only items in this layer.

```
import { Map, TileLayer, FeatureGroup } from 'react-leaflet';
import { EditControl } from "react-leaflet-draw"

...

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
```

For more details on how to use this plugin check the example.

You can pass more options on draw object, this informations can be found [here](https://github.com/Leaflet/Leaflet.draw#user-content-example-leafletdraw-config)
