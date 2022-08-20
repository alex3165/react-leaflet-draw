import React from 'react';
import EditControlExample from './edit-control';
import { createRoot } from 'react-dom/client';

const example = (
  <div>
    <h1>React-Leaflet-Draw example</h1>
    <EditControlExample onChange={onChange} />
  </div>
);

function onChange(geojson) {
  console.log('geojson changed', geojson);
}

createRoot(document.getElementById('app')).render(
  example
);
