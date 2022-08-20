import * as React from 'react';
import { createRoot } from 'react-dom/client';

import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import type { FeatureCollection } from 'geojson';

import EditControlFC from './EditControl';

function App() {
  const [geojson, setGeojson] = React.useState<FeatureCollection>({
    type: 'FeatureCollection',
    features: [],
  });

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '33%', textAlign: 'center', overflow: 'auto' }}>
        <p>{JSON.stringify(geojson, null, 2)}</p>
      </div>
      <div style={{ width: '67%' }}>
        <MapContainer
          center={[42.354329, -71.065494]}
          zoom={16}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
          <EditControlFC geojson={geojson} setGeojson={setGeojson} />
          <GeoJSON key={JSON.stringify(geojson)} data={geojson} />
        </MapContainer>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
