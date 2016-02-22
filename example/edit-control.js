import React, { Component } from 'react';
import { Map, TileLayer, Circle, FeatureGroup } from 'react-leaflet';
import { EditControl } from "../src"

export default class EditControlExample extends Component {

  _onEditPath(e) {
    console.log("Path edited !");
  }

  _onCreate(e) {
    console.log("Path created !");
  }

  _onDeleted(e) {
    console.log('Path deleted !')
  }

  render() {
    return (
      <Map center={[51.505, -0.09]} zoom={13} zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tiles.mapbox.com/v4/{mapId}/{z}/{x}/{y}.png?access_token={token}"
          mapId="mapbox.edf947b8"
          token="pk.eyJ1IjoiYWxleDMxNjUiLCJhIjoiYWZ2b0ctdyJ9.8hDqOD5GlLfBfIxjHaa0qQ"
          subdomains={["a", "b", "c", "d"]}
        />
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
      </Map>
    );
  }
}
