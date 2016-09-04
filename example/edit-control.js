import React, { Component } from 'react';
import { Map, TileLayer, Circle, FeatureGroup } from 'react-leaflet';
import { EditControl } from '../src';

let polyline;
const subs = [ 'a', 'b', 'c', 'd' ];

export default class EditControlExample extends Component {

  _onEditPath(e) {
    console.log('Path edited !');
  }

  _onCreate(e) {
    polyline = e.layer;
    // To edit this polyline call : polyline.handler.enable()
    console.log('Path created !');
  }

  _onDeleted(e) {
    console.log('Path deleted !');
  }

  _mounted(drawControl) {
    console.log('Component mounted !');
  }

  _onEditStart() {
    console.log('Edit is starting !');
  }

  _onEditStop() {
    console.log('Edit is stopping !');
  }

  _onDeleteStart() {
    console.log('Delete is starting !');
  }

  _onDeleteStop() {
    console.log('Delete is stopping !');
  }

  render() {
    return (
      <Map center={[51.505, -0.09]} zoom={13} zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tiles.mapbox.com/v4/{mapId}/{z}/{x}/{y}.png?access_token={token}"
          mapId="mapbox.edf947b8"
          token="pk.eyJ1IjoiYWxleDMxNjUiLCJhIjoiYWZ2b0ctdyJ9.8hDqOD5GlLfBfIxjHaa0qQ"
          subdomains={subs}
        />
        <FeatureGroup>
            <EditControl
              position='topright'
              onEdited={this._onEditPath}
              onCreated={this._onCreate}
              onDeleted={this._onDeleted}
              onMounted={this._mounted}
              onEditStart={this._onEditStart}
              onEditStop={this._onEditStop}
              onDeleteStart={this._onDeleteStart}
              onDeleteStop={this._onDeleteStop}
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
