import * as React from 'react';
import type {
  DrawOptions,
  EditOptions,
  ControlPosition,
  EditPolyOptions,
} from 'leaflet';

interface EditControlProps {
  onEdited?: Function;
  onDrawStart?: Function;
  onDrawStop?: Function;
  onDrawVertex?: Function;
  onEditStart?: Function;
  onEditMove?: Function;
  onEditResize?: Function;
  onEditVertex?: Function;
  onEditStop?: Function;
  onDeleted?: Function;
  onDeleteStart?: Function;
  onDeleteStop?: Function;

  onCreated?: Function;
  onMounted?: Function;
  draw: {
    polyline?: DrawOptions.PolylineOptions | boolean;
    polygon?: DrawOptions.PolygonOptions | boolean;
    rectangle?: DrawOptions.RectangleOptions | boolean;
    circle?: DrawOptions.CircleOptions | boolean;
    marker?: DrawOptions.MarkerOptions | boolean;
    circlemarker?: DrawOptions.CircleOptions | boolean;
  };
  edit: {
    edit: EditPolyOptions.EditHandlerOptions | boolean;
    remove?: EditPolyOptions.DeleteHandlerOptions | boolean;
  };

  position: ControlPosition;
}

export class EditControl extends React.Component<EditControlProps> {}
