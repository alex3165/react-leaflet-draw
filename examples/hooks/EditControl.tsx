import * as React from 'react';
import * as L from 'leaflet';
import { FeatureGroup } from 'react-leaflet';
import { EditControl } from '../../src';
import type { FeatureCollection } from 'geojson';

interface Props {
  geojson: FeatureCollection;
  setGeojson: (geojson: FeatureCollection) => void;
}

export default function EditControlFC({ geojson, setGeojson }: Props) {
  const [ref, setRef] = React.useState<L.FeatureGroup | null>(null);

  const onFeatureGroupReady = (reactFGref: L.FeatureGroup | null) => {
    new L.GeoJSON(geojson).eachLayer((layer) => {
      if (reactFGref) reactFGref.addLayer(layer);
    });
    if (reactFGref) setRef(reactFGref);
  };

  const handleChange = () => {
    console.log('handleChange ref', ref);
    const geo = ref?.toGeoJSON();
    if (geo?.type === 'FeatureCollection') {
      setGeojson(geo);
    }
  };
  console.log('ref', ref);

  return (
    <FeatureGroup
      ref={(newRef) => {
        console.log('newRef', newRef);
        onFeatureGroupReady(newRef);
      }}
    >
      <EditControl
        position="topright"
        onEdited={handleChange}
        onCreated={handleChange}
        onDeleted={handleChange}
        onDrawStart={() => console.log('start', ref)}
        onDrawVertex={() => console.log('vertex', ref)}
        onMounted={() => console.log('mounted', ref)}
        draw={{
          rectangle: false,
          circle: true,
          polyline: true,
          polygon: true,
          marker: false,
          circlemarker: false,
        }}
      />
    </FeatureGroup>
  );
}
